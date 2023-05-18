// Image Tracking Sample Code from
// https://ar-js-org.github.io/AR.js-Docs/image-tracking/

import { Stack, styled } from '@mui/material';
import React from 'react';
// import '@ar-js-org/ar.js/aframe/build/aframe-ar-nft';
// import * as AFRAME from 'aframe';

window.onload = () => {
  console.log('window onload');
};

console.log(AFRAME);

AFRAME.registerComponent('markerhandler', {
  init: function () {
    this.el.sceneEl.addEventListener('markerFound', () => {
      // redirect to custom URL
      window.location = 'https://www.google.com/';
      console.log('Found Trex Image');
    });
  }
});

const ArNFT = () => {
  return (
    <>
      <TextWrapper>sadf</TextWrapper>
      <a-scene
        vr-mode-ui="enabled: false;"
        renderer="logarithmicDepthBuffer: true;"
        embedded
        arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;"
      >
        <a-nft markerhandler type="nft" url="./nfts/trex"></a-nft>
        <a-entity camera></a-entity>
        <a-plane
          position="0, 0, 0"
          rotation="0 0 0"
          width="10"
          height="4"
          color="#000000"
        ></a-plane>
        <a-sky color="#f34"></a-sky>
      </a-scene>
    </>
  );
};

export default ArNFT;

const TextWrapper = styled(Stack)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));
