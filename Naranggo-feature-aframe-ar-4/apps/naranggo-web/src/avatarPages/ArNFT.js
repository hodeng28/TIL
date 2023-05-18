// Image Tracking Sample Code from
// https://ar-js-org.github.io/AR.js-Docs/image-tracking/

import React from 'react';
import '@ar-js-org/ar.js/aframe/build/aframe-ar-nft';
// import * as AFRAME from 'aframe';

AFRAME.registerComponent('markerhandler', {
  init: function () {
    this.el.sceneEl.addEventListener('markerFound', () => {
      // redirect to custom URL
      window.location = 'https://www.google.com/';
      console.log('Found Trex Image');
    });
  }
});

const ArNFT = ({ imageSrc }) => {
  const imagePatternUrl = `./nfts/${imageSrc}`;
  return (
    <a-scene
      vr-mode-ui="enabled: false;"
      renderer="logarithmicDepthBuffer: true;"
      embedded
      arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: true;"
    >
      <a-nft markerhandler type="nft" url={imagePatternUrl}></a-nft>
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ArNFT;
