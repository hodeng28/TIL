import React from 'react';
import '@ar-js-org/ar.js/aframe/build/aframe-ar-nft';

AFRAME.registerComponent('markerhandler', {
  init: function () {
    this.el.sceneEl.addEventListener('markerFound', () => {
      // redirect to custom URL
      window.location = 'https://www.google.com/';
      console.log('Found Trex Image');
    });
  }
});

function ArNFT() {
  // const mySceneLoaded = () => {
  //   var cameraEntity = document.getElementById('camera');
  //   alert('dddqwdqwd');
  //   // Do something with the camera entity after it has loaded
  // };

  return (
    <a-scene
      vr-mode-ui="enabled: false;"
      renderer="logarithmicDepthBuffer: false;"
      embedded
      arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
    >
      <a-nft markerhandler type="nft" url="./nfts/trex"></a-nft>
      <a-entity camera></a-entity>
    </a-scene>
  );
}

export default ArNFT;
