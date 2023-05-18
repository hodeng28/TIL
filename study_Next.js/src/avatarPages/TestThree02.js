import React, { useEffect, useState, useRef } from "react";
//import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from "three";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';

import { ModelData } from "../components/avatar/ModelData";
//import { LoadCharacter } from "../components/avatar/CharacterLoader";
import { AsyncLoader } from "../components/avatar/AsyncLoader";

// 서버에서 받은 avatar data라 가정!!!
import modelAvatar from "../avatar/svravatar.json";

function ArL3()
{
  //-----------------------------------
  const animMixers = useRef([]);

  const _deviceOrientationControls = useRef(null);
  const _canvas = useRef(null);
  const _scene = useRef(null);
  const _camera = useRef(null);
  const _webcam = useRef(null);
  const _renderer = useRef(null);
  const _arjs = useRef(null);
  const previousTimeRef = useRef();

  const [avatar, setAvatar] = useState(); // avatar json data
  const [cmodel, setCModel] = useState(); // class avatar data model
  const [char3d, setChar3D] = useState(); // avatar 3d char

  function LoadCharacter() {
    const promises = [];
    promises.push(AsyncLoader.LoadFBX("char/character/fbx/mixamo_xbot_bx.fbx"));
    promises.push(AsyncLoader.LoadFBX("char/character/fbx/@standing_greeting_bx.fbx"));

    return Promise.all(promises).then(result => {
        const o3d = result[0];
        o3d.name = 'Character';
        //o3d.scale.set(0.05, 0.05, 0.05);
        console.log('color space:', THREE.ColorManagement.workingColorSpace, 'legacy:', THREE.ColorManagement.legacyMode, 'enabled:', THREE.WebGLRenderer.enabled);
        //o3d.animations = result[0].animations;
    
        return {o3d: o3d, ani: result[1]};
      });
  }

  //-----------------------------------
  function post_load_proc(r) {
    const obj3d = new THREE.Object3D();
    console.log('xbot o3d:', r.o3d);

    obj3d.add(r.o3d); // skinnedMeshs & bone
    const animixer = new THREE.AnimationMixer(r.ani);
    animixer.clipAction(r.ani.animations[0]).play();
    animMixers.current.push(animixer);

    //! cm => meter
    //obj3d.scale.set(0.1, 0.1, 0.1);
    //obj3d.scale.setScalar(0.1);
    //obj3d.scale.multiplyScalar(0.1);

    console.log("Character Object:", obj3d);
    return obj3d;
  }
  //-----------------------------------
  function init_arjs_lbs(obj3d) {
    const canvas = _canvas.current = document.getElementById('canvas1');
    const scene = _scene.current = new THREE.Scene();
    const camera = _camera.current = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
    const renderer = _renderer.current = new THREE.WebGLRenderer({canvas: canvas});
    const arjs = _arjs.current = new THREEx.LocationBased(scene, camera);

    _deviceOrientationControls.current = new THREEx.DeviceOrientationControls(camera);
    _webcam.current = new THREEx.WebcamRenderer(renderer);
   
    _scene.current.add(new THREE.AmbientLight(0x404040));
    _scene.current.add(new THREE.DirectionalLight(0xa0a0a0, 0.5));

    //! lat:NS, lon:EW
    //! fakegps(lon. lat, elev=nul, acc=0)
    //! add(obj, lon, lat, elev)
    arjs.add(obj3d, 127.12185, 37.49505, -0.5);
    arjs.fakeGps(127.1222, 37.4950);
    //arjs.startGps();
    console.log('init arjs scene:', scene);
  }
  //-----------------------------------
  function update_arjs_lbs(currentTime) {
    const canvas = _canvas.current;
    const renderer = _renderer.current;
    const camera = _camera.current;
    const webcam = _webcam.current;

    if(canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
      console.log('canvas client:', canvas.clientWidth, canvas.clientHeight, 'wh:', canvas.width, canvas.height);
      renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
      const aspect = canvas.clientWidth/canvas.clientHeight;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      console.log('reset render aspect:', aspect);
    }
    _deviceOrientationControls.current.update();
    webcam.update();
    renderer.render(_scene.current, camera);
    const deltaTime = 0.001 * (currentTime - previousTimeRef.current);
    //console.log('update dt:', deltaTime, ' = ', currentTime, ' - ', previousTimeRef.current);
    previousTimeRef.current = currentTime;
    animMixers.current.forEach(element => { ; element.update(deltaTime); });
    //console.log('update dt:', deltaTime);
    requestAnimationFrame(update_arjs_lbs);
  }

  //-----------------------------------
  useEffect(() => {
    if(!cmodel) {
      setAvatar(modelAvatar);
      const cm = new ModelData(modelAvatar);
      //init_dbg_gui(cm);
      setCModel(cm);
    } else {
        LoadCharacter().then(r => {
            const obj3d = post_load_proc(r);
            init_arjs_lbs(obj3d);
            setChar3D(obj3d);
            update_arjs_lbs();
        });
        console.log('scene', _scene.current);
    }
  }, [avatar]);
  return ( <></>);
}
//-----------------------------------------------------------------------------

function TestThree02() {

  return (
    <canvas id='canvas1' className='webcam'>
      <ArL3 />
    </canvas>
  )
}

export default TestThree02;