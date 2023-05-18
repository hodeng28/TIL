import * as THREE from "three";
import { AsyncLoader } from "./AsyncLoader.js";
import { create_material } from "./CharacterLoader.js";

export function TestLoad()
{
  const promises = [];
  promises.push(AsyncLoader.LoadFBX("char/character/fbx/cloth_top/set_cloth_top_010.fbx"));
  promises.push(AsyncLoader.LoadTexture("char/character/textures/cloth_top/set_cloth_top_010.png"));
  promises.push(AsyncLoader.LoadTexture("char/character/textures/cloth_top/set_cloth_top_010_m.png"));
  return Promise.all(promises).then(result => {
    const fbx = result[0];
    //console.log('fbx', fbx);
    //console.log("Character Loaded", data.fbx);
    //const material = new THREE.MeshLambertMaterial( { map: result[1] } );
    const material = create_material(false, result[1], result[2], "#caacac", "#007f70", false, false);
    fbx.traverse(child => {
      if( !child.isMesh ) return;
      child.castShadow = false;
      child.receiveShadow = false;
      if(result.length > 2) {
        child.material = material;//create_material(child, result[1], result[2], data, useAlpha, ignoreBoneAni);
      } else {
        child.material = material;//create_material(child, result[1], null, data, useAlpha, ignoreBoneAni);
      }
    });
    //fbx.name = data.fbx;
    return fbx;
  });
}