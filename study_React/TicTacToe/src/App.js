/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './App.css';

function App() {

  const container = () => {
    const [state, setState] = useState('X');
    const [xState, setXstate] = useState([]);
    const [OState, setOstate] = useState([]);
    const [initState, setInitState] = useState({
      a1: "",
      a2: "",
      a3: "",
      a4: "",
      a5: "",
      a6: "",
      a7: "",
      a8: "",
      a9: "",
    });
  };

  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];





  const onClick = (e) => {
    console.log(e.target.value);
    setState();
    return "x" ? "x" : "o";
  }
  return (

    <div className="container">
      <ul>
        <li className={"a1"} onClick={onClick}></li>
        <li className={"a2"} onClick={onClick}></li>
        <li className={"a3"} onClick={onClick}></li>
      </ul>
      <ul>
        <li className={"a4"} onClick={onClick}></li>
        <li className={"a5"} onClick={onClick}></li>
        <li className={"a6"} onClick={onClick}></li>
      </ul>
      <ul>
        <li className={"a7"} onClick={onClick}></li>
        <li className={"a8"} onClick={onClick}></li>
        <li className={"a9"} onClick={onClick}></li>
      </ul>
    </div>
  );
}

export default App;
