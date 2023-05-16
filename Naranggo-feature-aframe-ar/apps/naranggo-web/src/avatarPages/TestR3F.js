import React, { useEffect, useState, useRef } from "react";
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls }  from '@react-three/drei';
import Character4R3F from "../components/Character4R3F";

// 서버에서 받은 avatar data라 가정!!!
import modelAvatar from "../avatar/svravatar.json";

//-----------------------------------------------------------------------------

function TestR3F() {
  return (
    <div className='arview'>
    <Canvas>
      <OrbitControls />
      <Environment preset="sunset" background />
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <Character4R3F json_model = {modelAvatar}/>
    </Canvas>
    </div>
  )
}

export default TestR3F;