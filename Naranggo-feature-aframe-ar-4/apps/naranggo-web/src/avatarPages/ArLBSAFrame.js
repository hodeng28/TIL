import React from "react";
import "@ar-js-org/ar.js/aframe/build/aframe-ar";
import "../components/avatar/a-character-gps";

// 서버에서 받은 avatar data라 가정!!!
import modelAvatar from "../avatar/svravatar.json";

// !test code. replace bellow character-gps
{/* <a-camera gps-new-camera='gpsMinDistance: 5; simulateLatitude: 51.049; simulateLongitude: -0.723'></a-camera>
<a-entity material='color: red' geometry='primitive: box' gps-new-entity-place="latitude: 51.05; longitude: -0.723" scale="10 10 10"></a-entity>
<a-entity material='color: yellow' geometry='primitive: box' gps-new-entity-place="latitude: 51.048; longitude: -0.723" scale="10 10 10"></a-entity>
<a-entity material='color: blue' geometry='primitive: box' gps-new-entity-place="latitude: 51.049; longitude: -0.724" scale="10 10 10"></a-entity>
<a-entity material='color: green' geometry='primitive: box' gps-new-entity-place="latitude: 51.049; longitude: -0.722" scale="10 10 10"></a-entity>
 */}

function ArLBSAFrame() {
  return (
    <a-scene vr-mode-ui="enabled: false;" renderer="antialias: true; alpha: true" arjs='sourceType: webcam; videoTexture: false; debugUIEnabled: false'>

    <a-entity id='character-gps' character-gps={JSON.stringify(modelAvatar)} gps-new-entity-place="latitude: 37.4950; longitude: 127.1224"></a-entity>
    <a-camera look-controls-enabled='false' arjs-device-orientation-controls='smoothingFactor:0.1' gps-new-camera='gpsMinDistance: 5; initialPositionAsOrigin: true'></a-camera>

    </a-scene>
  );
}

export default ArLBSAFrame;