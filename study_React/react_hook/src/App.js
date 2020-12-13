import React, { useState } from 'react';
import ReactDom from 'react-dom';

const content = [
  {
    tab: "Section 1",
    content: "the content of the Section1"
  },
  {
    tab: "Section 2",
    content: "the content of the Section2"
  }
]

const App = () => {
  
  return (
    <div className="App">
      <h1>study react hook</h1>
        {content.map(section => (
          <button>{section.tab}</button>
        ))}
    </div>
  );
}

export default App;
