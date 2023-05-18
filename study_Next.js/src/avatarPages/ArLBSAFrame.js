import React from "react";
import * as THREEx from "@ar-js-org/ar.js/three.js/build/ar-threex-location-only";
import "@ar-js-org/ar.js/aframe/build/aframe-ar";
import "../components/avatar/a-character-gps";

// 서버에서 받은 avatar data라 가정!!!
import modelAvatar from "../avatar/svravatar.json";

function ArLBSAFrame() {
  return (
    <a-scene vr-mode-ui="enabled: false;" renderer="antialias: true; alpha: true" arjs='sourceType: webcam; videoTexture: false; debugUIEnabled: false'>
    <a-camera gps-new-camera='gpsMinDistance: 5'></a-camera>
    <a-entity id='character-gps' character-gps={JSON.stringify(modelAvatar)}  gps-new-entity-place="longitude: 127.1220, latitude: 37.4950"></a-entity>
    </a-scene>
  );
}

export default ArLBSAFrame;