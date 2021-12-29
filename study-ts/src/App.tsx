import React from 'react';
import MyForm from './MyForm';
// import Greetings from './Greeting';

const App: React.FC =() => {
  const onSubmit = (form: { name: string, description: string}) => {
    console.log(form);
  }
  return (
      <MyForm onSubmit={onSubmit} />
  );
}

export default App;
