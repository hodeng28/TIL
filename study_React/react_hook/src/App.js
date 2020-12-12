import React, { useState } from 'react';
import ReactDom from 'react-dom';


function App() {

  const [item, setItem] = useState(1);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);
  return (
    <div className="App">
      <h1>study react hook{item}</h1>
      <h2>hi useState</h2>
      <button onClick={incrementItem}>incrementItem</button>
      <button onClick={decrementItem}>decrementItem</button>
    </div>
  );
}

export default App;
