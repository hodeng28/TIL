import React from 'react';
import Greetings from './Greeting';

const App: React.FC =() => {
  const onClick = (name: string) => {
    console.log('hi');  
  }
  return (
    <Greetings name="ho" onClick={onClick}/>
  );
}

export default App;
