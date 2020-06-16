/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import Child from './Child';
import Parent from './Parent';
function App() {
  const [state, setState] = useState(0);
  const idRef = useRef();
  const passRef = useRef();
  console.log("%c%s", "color:red", "App 렌더링 시작");

  useEffect(() => {
    console.log("%c%s", "color:red", "App <리>렌더링 시작");
  });
  const AppClick = () => {
    setState((s) => s + 1);
  };
  const changeInput = () => {
    console.log(idRef.current.value);
    console.log(passRef.current.value);
  };

  return (
    <>
      <input type="text" ref={idRef} onChange={changeInput} />
      <input type="text" ref={passRef} onChange={changeInput} />
      <button onClick={AppClick}>App 버튼</button>
      <Parent>
        <Child />
      </Parent>
    </>
  )
}

export default App;
