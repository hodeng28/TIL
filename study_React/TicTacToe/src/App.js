import React, { useState } from 'react';
import './App.css';

function App() {

  const container = () => {
    const [play, setPlay] = useState();
    const [state, setState] = useState({
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
  const result = () => {

  }


  const onClick = () => {
    return "x" ? "o" : "x";
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
