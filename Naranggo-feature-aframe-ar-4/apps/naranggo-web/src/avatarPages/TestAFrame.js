import React from 'react';
import '../components/avatar/a-character';

// 서버에서 받은 avatar data라 가정!!!
import modelAvatar from '../avatar/test.json';

const TestAFrame = () => {
  // const avatar = JSON.parse(avatarData);

  return (
    <a-scene renderer="colorManagement: true;">
      <a-entity
        id="character"
        character={JSON.stringify(modelAvatar)}
        position="0, 0, 0"
        scale="1, 1, 1"
      ></a-entity>
      {/* <a-plane
        position="0, 0, 0"
        rotation="-90 0 0"
        width="10"
        height="4"
        color="#ffffff"
      ></a-plane> */}
      {/* <a-camera gps-new-camera="gpsMinDistance: 5"></a-camera> */}
      <a-sky color="#ffffff"></a-sky>
    </a-scene>
  );
};

export default TestAFrame;
