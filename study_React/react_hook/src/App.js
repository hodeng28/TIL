import React, { useState } from 'react';
import ReactDom from 'react-dom';

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);
  const onChange = e => {
    console.log(e.target);
  }
  return { value };
}

const App = () => {
  const name = useInput("Mr.")
  return (
    <div className="App">
      <h1>study react hook</h1>
      <input placeholder="Name" {...name} />
    </div>
  );
}

export default App;
