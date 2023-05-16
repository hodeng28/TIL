import React, { useEffect, useState, useRef } from "react";
//import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from "three";
import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';

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

  //-----------------------------------
  function init_arjs_lbs() {
    const canvas = _canvas.current = document.getElementById('canvas1');
    const scene = _scene.current = new THREE.Scene();
    const camera = _camera.current = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
    const renderer = _renderer.current = new THREE.WebGLRenderer({canvas: canvas});

    _deviceOrientationControls.current = new THREEx.DeviceOrientationControls(camera);
    const arjs = _arjs.current = new THREEx.LocationBased(scene, camera);
    _webcam.current = new THREEx.WebcamRenderer(renderer);
    
    _scene.current.add(new THREE.AmbientLight(0x404040));
    _scene.current.add(new THREE.DirectionalLight(0xa0a0a0, 0.5));

    const box = new THREE.Mesh(new THREE.BoxGeometry(350, 2000, 350), new THREE.MeshBasicMaterial({color: 0xff0000}));
    const spr = new THREE.Mesh(new THREE.SphereGeometry(500), new THREE.MeshBasicMaterial({color: 0x00ff00}));
    const obj3d = new THREE.Object3D();
    spr.position.set(0, -150, 0);
    obj3d.scale.setScalar(0.02);
    obj3d.add(box);
    obj3d.add(spr);

    //group.scale.setScalar(0.1);

    //! lat:NS, lon:EW
    //! fakegps(lon. lat, elev=nul, acc=0)
    //! add(obj, lon, lat, elev)
    arjs.add(obj3d, 127.1215, 37.4955, -5.5);
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
    if(_arjs.current) return;
    init_arjs_lbs();
    update_arjs_lbs();
    console.log('scene', _scene.current);
  }, []);
  return ( <></>);
}
//-----------------------------------------------------------------------------

function TestThree01() {

  return (
    <canvas id='canvas1' className='webcam'>
      <ArL3 />
    </canvas>
  )
}

export default TestThree01;