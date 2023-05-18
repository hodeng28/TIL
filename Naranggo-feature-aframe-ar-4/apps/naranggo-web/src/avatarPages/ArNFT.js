// Image Tracking Sample Code from
// https://ar-js-org.github.io/AR.js-Docs/image-tracking/

import React, { Suspense, useEffect, useState } from "react";
import "@ar-js-org/ar.js/aframe/build/aframe-ar-nft";
//import * as AFRAME from "aframe";

window.onload = () => {
  console.log('window onload');
}

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
  return (
    <a-scene vr-mode-ui="enabled: false;" renderer="logarithmicDepthBuffer: true;" embedded arjs="trackingMethod: best; sourceType: webcam;debugUIEnabled: false;">
      <a-nft markerhandler type="nft" url = "./nfts/trex">
      </a-nft>
      <a-entity camera></a-entity>
    </a-scene>
  );
}

export default ArNFT;