import { AsyncLoader } from './AsyncLoader';
import { NrgShader } from '../../shader/nrgshader.glsl.js';
import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

//-----------------------------------

class CharLoader {
  static omodel = {};
  static load() {
    this.omodel = null;
    return [1, 'babo'];
  }
}

//let avatar;

function create_material(useSkinning, useAlpha, colSkin, colCloth, tex1, tex2) {
  // console.log('tx1 enc:', tex1.encoding);
  // tex1.encoding = THREE.LinearEncoding;
  // if(tex2) tex2.encoding = THREE.LinearEncoding;
  let material = null;
  //let useSkinning = useSkinning && !useAlpha && !ignoreBoneAni;
  const uniforms = {
    'colDLight': { value: new THREE.Color(0xdcdcdc) },
    'dirDLight': { value: new THREE.Vector3(-1, 3, -1).normalize() },
    'colALight': { value: new THREE.Color(0xededed) },
    'mapBase': { value: tex1 },
    'mapMask': { value: tex2 },
    'colSkin': { value: new THREE.Color(colSkin) },
    'colCloth': { value: new THREE.Color(colCloth) }
  };

  material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: useSkinning
      ? NrgShader.vrtxShdrSkinning
      : NrgShader.vrtxShdrBasic,
    fragmentShader: useAlpha ? NrgShader.fragShdrAlpha : NrgShader.fragShdrSkin
  });
  //material.lights = true;
  if (useAlpha) {
    material.depthWrite = false;
    material.transparent = true;
    material.alphaTest = 0.5;
  }
  //console.log('material:', material, 'tex1:', tex1, 'tex2:', tex2);
  return material;
}

//---------------------------------------------
// load fbx model & model material
function loadModel(data, useAlpha = false, ignoreBoneAni = false) {
  //console.log("CharacterModel REQ", data.fbx);

  const promises = [];
  promises.push(
    AsyncLoader.LoadFBX('../../char/character/fbx/' + data.fbx + '.fbx')
  );
  promises.push(
    AsyncLoader.LoadTexture(
      '../../char/character/textures/' + data.texMain + '.png'
    )
  );
  if (data.texMask) {
    promises.push(
      AsyncLoader.LoadTexture(
        '../../char/character/textures/' + data.texMask + '.png'
      )
    );
  } else {
    console.warn('empty mask texture:', data.fbx, data.texMask);
  }

  return Promise.all(promises).then((result) => {
    const fbx = result[0];
    fbx.traverse((child) => {
      if (!child.isMesh) return;
      const isSkinMesh = child.type === 'SkinnedMesh';
      child.castShadow = false;
      child.frustumCulled = false;
      child.receiveShadow = false;
      if (result.length > 2) {
        child.material = create_material(
          isSkinMesh && !ignoreBoneAni,
          useAlpha,
          data.colSkin,
          data.colCloth,
          result[1],
          result[2]
        );
      } else {
        child.material = create_material(
          isSkinMesh && !ignoreBoneAni,
          useAlpha,
          data.colSkin,
          data.colCloth,
          result[1],
          null
        );
      }
    });
    fbx.name = data.fbx;
    return fbx;
  });
}

//-----------------------------------

function set_head_parts_offset_single(objt, dmName, partsData, rotDegee) {
  const offsetY = partsData.yOffset;
  const scale = partsData.scale;

  let dm = null;
  objt.traverse((child) => {
    if (child.name.match(dmName)) {
      dm = child;
    }
  });
  if (dm === null) {
    console.error(dmName, 'not found!');
  } else {
    dm.scale.set(1, scale, scale);
  }
  objt.position.set(0, offsetY / 100, 0);
  objt.rotation.set(THREE.MathUtils.degToRad(rotDegee), 0, 0);
}

//-----------------------------------

function set_head_parts_offset_pair(
  root,
  lobj,
  robj,
  dmName,
  partsData,
  distOffset
) {
  const rotationX = partsData.rotation;
  const offsetY = partsData.yOffset;
  const scale = partsData.scale;
  const scaleY = partsData.scaleY;
  const distanceBetween = partsData.distanceFromOrigin - distOffset;

  root.position.set(0, offsetY / 100, 0);
  robj.scale.set(1, 1, -1);

  let lDm = null;
  let rDm = null;
  lobj.traverse((child) => {
    if (child.name.match(dmName)) {
      lDm = child;
    }
  });
  robj.traverse((child) => {
    if (child.name.match(dmName)) {
      rDm = child;
    }
  });

  if (lDm === null || rDm === null) {
    console.error(dmName, ' not found!');
  } else {
    lDm.scale.set(1, scale + scaleY, scale);
    rDm.scale.set(1, scale + scaleY, scale);

    lDm.rotation.set(rotationX, 0, 0);
    rDm.rotation.set(rotationX, 0, 0);
  }
  lobj.position.set(0, 0, -distanceBetween / 100);
  robj.position.set(0, 0, distanceBetween / 100);
  lobj.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
  robj.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);

  root.add(lobj);
  root.add(robj);
}

//-----------------------------------

function create_head_parts(result, ridx, loadata, avatar) {
  const head_parts = new THREE.Group();
  head_parts.name = 'Head Parts';

  if (loadata.face && ridx < result.length && result[ridx]) {
    result[ridx].name = 'Face';
    head_parts.add(result[ridx]);
    //console.log('head parts:', ridx, result[ridx]);
    ++ridx;
  }

  if (loadata.hair && ridx < result.length && result[ridx]) {
    result[ridx].name = 'Hair';
    head_parts.add(result[ridx]);
    //console.log('head parts:', ridx, result[ridx]);
    ++ridx;
  }

  if (loadata.mouth && ridx < result.length && result[ridx]) {
    const objt = result[ridx];
    objt.name = 'Mouth';
    head_parts.add(objt);
    set_head_parts_offset_single(objt, 'mouth_dm', avatar.avatarLipData, -90);
    //console.log('head parts:', ridx, objt);
    ++ridx;
  }

  if (loadata.hair_acc && ridx < result.length && result[ridx]) {
    result[ridx].name = 'Hair Acc';
    head_parts.add(result[ridx]);
    //console.log('head parts:', ridx, result[ridx]);
    ++ridx;
  }

  if (loadata.beard && ridx < result.length && result[ridx]) {
    const objt = result[ridx];
    objt.name = 'Beard';
    objt.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
    head_parts.add(objt);
    //console.log('head parts:', ridx, objt);
    ++ridx;
  }

  if (loadata.mustache && ridx < result.length && result[ridx]) {
    const objt = result[ridx];
    objt.name = 'Mustache';
    set_head_parts_offset_single(
      objt,
      'mus_dm',
      avatar.avatarMustacheData,
      -90
    );

    objt.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
    head_parts.add(objt);
    //console.log('head parts:', ridx, objt);
    ++ridx;
  }

  if (loadata.eye && ridx < result.length && result[ridx]) {
    const root = new THREE.Group();
    const lobj = result[ridx];
    const robj = result[ridx].clone();
    root.name = 'Eyes';
    lobj.name = 'Eye L';
    robj.name = 'Eye R';
    head_parts.add(root);

    set_head_parts_offset_pair(
      root,
      lobj,
      robj,
      'eye_dm',
      avatar.avatarEyeData,
      3
    );
    //console.log('head parts:', ridx, root);
    ++ridx;
  }

  if (loadata.eyebrow && ridx < result.length && result[ridx]) {
    const root = new THREE.Group();
    const lobj = result[ridx];
    const robj = result[ridx].clone();
    root.name = 'Eyes Brows';
    lobj.name = 'Eye Brow L';
    robj.name = 'Eye Brow R';
    head_parts.add(root);

    set_head_parts_offset_pair(
      root,
      lobj,
      robj,
      'eyebrow_dm',
      avatar.avatarEyeBrowData,
      1
    );
    //console.log('head parts:', ridx, root);
    ++ridx;
  }

  if (loadata.glass && ridx < result.length && result[ridx]) {
    const root = new THREE.Group();
    const lobj = result[ridx];
    const robj = result[ridx].clone();
    root.add(lobj);
    root.add(robj);
    head_parts.add(root);

    robj.scale.set(1, 1, -1);
    root.name = 'Glasses';
    lobj.name = 'Glass L';
    robj.name = 'Glass R';

    const offsetY = avatar.avatarGlassData.yOffset;
    const scale = avatar.avatarGlassData.scale;

    root.position.set(0, offsetY / 100, 0);

    let lDm = null;
    let rDm = null;
    lobj.traverse((child) => {
      if (child.name.match('glasses_dm')) {
        lDm = child;
      }
    });
    robj.traverse((child) => {
      if (child.name.match('glasses_dm')) {
        rDm = child;
      }
    });

    if (lDm === null || rDm === null) {
      console.error('galsses_dm not found!');
    } else {
      lDm.scale.set(1, scale, scale);
      rDm.scale.set(1, scale, scale);
    }
    lobj.rotation.set(THREE.MathUtils.degToRad(-90), 0, 0);
    robj.rotation.set(THREE.MathUtils.degToRad(90), 0, 0);
    //console.log('head parts:', ridx, root);
    ++ridx;
  }

  //console.log('3D Head Parts:', head_parts);
  return head_parts;
}

//-----------------------------------

function loadHeadParts(loadata, avatar) {
  const promises = [];
  console.log(loadata, 'loadata');
  // 반드시 있어야 하는 오브젝트들
  if (loadata.face) promises.push(loadModel(loadata.face, false, true));
  if (loadata.hair) promises.push(loadModel(loadata.hair, false, true));
  if (loadata.mouth) promises.push(loadModel(loadata.mouth, true, true));
  // 이하... 없을 수도 있는 파츠
  if (loadata.hair_acc) promises.push(loadModel(loadata.hair_acc, false, true));
  if (loadata.beard) promises.push(loadModel(loadata.beard, false, true));
  if (loadata.mustache) promises.push(loadModel(loadata.mustache, true, true));
  // 좌우 대칭 구성 파츠들
  if (loadata.eye) promises.push(loadModel(loadata.eye, true, true));
  if (loadata.eyebrow) promises.push(loadModel(loadata.eyebrow, true, true));
  if (loadata.glass) promises.push(loadModel(loadata.glass, true, true));

  return Promise.all(promises).then((result) => {
    //+! add head parts to head bone
    const o3d = new THREE.Object3D();
    o3d.name = 'head_point_root';
    o3d.add(create_head_parts(result, 0, loadata, avatar));
    return o3d;
  });
}

//-----------------------------------
// load body master bone fbx & head parts model
function loadBodyMaster(loadata, avatar) {
  const promises = [];

  // 반드시 있어야 하는 오브젝트들
  promises.push(
    AsyncLoader.LoadFBX('../../char/character/fbx/body_master/body_master.fbx')
  );
  promises.push(loadHeadParts(loadata, avatar));

  return Promise.all(promises).then((result) => {
    //+! add head parts to head bone
    const body = result[0];
    // const ani_body = result[1];
    // const ani_hair = result[2];
    let head_point = null;
    body.traverse((child) => {
      if (child.name.match('Head_Point')) {
        head_point = child;
      }
    });
    body.name = 'body';
    head_point.add(result[1]);
    return body;
  });
}

//-----------------------------------
function getBones(srcBones, sknBones) {
  const bones = [];
  for (let i = 0; i < sknBones.length; ++i) {
    for (let j = 0; j < srcBones.length; ++j) {
      if (sknBones[i].name === srcBones[j].name) {
        bones.push(srcBones[j]);
        break;
      }
    }
  }
  return bones;
}
//-----------------------------------
function retargetBones(srcBones, sknBones) {
  for (let i = 0; i < sknBones.length; ++i) {
    for (let j = 0; j < srcBones.length; ++j) {
      if (sknBones[i].name === srcBones[j].name) {
        sknBones[i] = srcBones[j];
        break;
      }
    }
  }
}

//-----------------------------------

function LoadCharacter(json_obj, cmodel) {
  THREE.ColorManagement.legacyMode = false;
  //avatar = json_obj;
  //const cmodel = new ModelData(json_obj);
  const loadata = cmodel.create_load_data();
  const promises = [];
  promises.push(AsyncLoader.LoadFBX('../../char/character/ani/@idle_01.t.fbx'));
  //+! 머리, 악세사리 애니메이션은 데이터 제작 전이라 나중에 처리...
  //if(loadata.hair) promises.push(ALoader.asyncLoadFBX("/char/character/ani/hairstyle_ani/@idle_01"));

  promises.push(loadBodyMaster(loadata, json_obj));
  //promises.push(loadHeadParts(loadata));
  if (loadata.top) {
    promises.push(loadModel(loadata.top));
  }
  if (loadata.bottom) {
    promises.push(loadModel(loadata.bottom));
  }
  if (loadata.shoes) {
    promises.push(loadModel(loadata.shoes));
  }

  return Promise.all(promises).then((result) => {
    const o3d = result[1];
    o3d.name = 'Character';
    //o3d.scale.set(0.01, 0.01, 0.01);

    console.log(
      'color space:',
      THREE.ColorManagement.workingColorSpace,
      'legacy:',
      THREE.ColorManagement.legacyMode,
      'enabled:',
      THREE.WebGLRenderer.enabled
    );

    o3d.animations = result[0].animations;
    const skl = new THREE.SkeletonHelper(o3d);
    skl.visible = cmodel.show_skeleton;

    for (let i = 2; i < result.length; ++i) {
      for (const child of result[i].children) {
        if (child.type === 'SkinnedMesh') {
          child.skeleton.bones = getBones(skl.bones, child.skeleton.bones);
          retargetBones(skl.bones, child.skeleton.bones);
          o3d.add(child);
        } else if (child.type === 'Mesh') {
          o3d.add(child);
        }
      }
    }

    return { o3d: o3d, skl: skl };
  });
}

export { LoadCharacter, create_material };
