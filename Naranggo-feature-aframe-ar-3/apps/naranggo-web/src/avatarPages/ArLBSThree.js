import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';

import { ModelData } from "../components/avatar/ModelData";
import { LoadCharacter } from "../components/avatar/CharacterLoader";

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

  //-----------------------------------
  function post_load_proc(r) {
    const o3d = new THREE.Object3D();
    o3d.add(r.o3d); // skinnedMeshs & bone
    o3d.add(r.skl); // skeleton
    //const animixer = new THREE.AnimationMixer(r.o3d);
    const animixer = new THREE.AnimationMixer(o3d);
    animixer.clipAction(r.o3d.animations[0]).play();
    animMixers.current.push(animixer);
    
    //! cm => meter
    //o3d.scale.set(0.1, 0.1, 0.1);
    //group.scale.setScalar(0.1);
    //o3d.scale.multiplyScalar(0.1);

    console.log("Character Object:", o3d);
    return o3d;
  }
  //-----------------------------------
  function init_arjs_lbs(obj3d) {
    const canvas = _canvas.current = document.getElementById('canvas1');
    const scene = _scene.current = new THREE.Scene();
    const camera = _camera.current = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
    const renderer = _renderer.current = new THREE.WebGLRenderer({canvas: canvas, antialias: true, logarithmicDepthBuffer: true});

    _deviceOrientationControls.current = new THREEx.DeviceOrientationControls(camera);
    const arjs = _arjs.current = new THREEx.LocationBased(scene, camera);
    _webcam.current = new THREEx.WebcamRenderer(renderer);

    //obj3d.scale.setScalar(0.1);
    arjs.add(obj3d, 127.1216, 37.4955, -15.5);
    arjs.fakeGps(127.1222, 37.4950);
    //arjs.startGps();

    console.log('init arjs:\n', canvas, scene, camera, renderer, arjs);
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
    previousTimeRef.current = currentTime;
    animMixers.current.forEach(element => { element.update(deltaTime); });
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
      const loadata = cmodel.create_load_data();
      LoadCharacter(modelAvatar, cmodel).then(r => {
        const obj3d = post_load_proc(r);
        init_arjs_lbs(obj3d);
        setChar3D(obj3d);
        update_arjs_lbs();
      });
    }
  }, [avatar]);
  return ( <></>);
}
//-----------------------------------------------------------------------------

function ArLBSThree() {

  return (
    <canvas id='canvas1' className='webcam'>
      <ArL3 />
    </canvas>
  )
}

export default ArLBSThree;