import React from 'react';
import { ExProvider } from './ContextEx';
import ReducerEx from './ReducerEx';
// import Counter from './Counter';
// import MyForm from './MyForm';
// import Greetings from './Greeting';

const App: React.FC =() => {
  // const onSubmit = (form: { name: string, description: string}) => {
  //   console.log(form);
  // }
  // return (
  //     <MyForm onSubmit={onSubmit} />
  // );

  return (
    <ExProvider>
      <ReducerEx />
    </ExProvider>
  )
  
}

export default App;
