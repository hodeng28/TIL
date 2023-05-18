import React from 'react';
//import * as AFRAME from 'aframe';
import '../components/avatar/a-character';

// 서버에서 받은 avatar data라 가정!!!A
import modelAvatar from '../avatar/svravatar.json';

function TestAFrame() {
  console.log('b4 pass', modelAvatar);
  return (
    <a-scene
      renderer="colorManagement: true;"
      arjs="sourceType: webcam; displayMode: clean;"
    >
      <a-entity
        id="character"
        character={JSON.stringify(modelAvatar)}
        position="200000, 0, 0"
        scale="1, 1, 1"
      ></a-entity>
      <a-plane
        position="200000, 0, 0"
        rotation="-90 0 0"
        width="10"
        height="4"
        color="#7BC8A4"
      ></a-plane>
      <a-sky color="#7C7C7C"></a-sky>
    </a-scene>
  );
}

export default TestAFrame;
