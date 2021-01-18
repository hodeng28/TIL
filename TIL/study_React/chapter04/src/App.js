import React, { useState } from "React";

const InputElement = () => {
  const [inputText, setInputText] = useState("");

  return (
    <>
      <input
        onChange={(e) => {
          setInputText(e.target.value)
        }}
       />
    </>
    )
  };

  export  default InputElement;

  

