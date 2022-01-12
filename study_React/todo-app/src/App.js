import React from 'react';
import TodoInsert from './Components/TodoInsert';
import TodoTemplate from './Components/TodoTemplate';

const App = () => {
  return (
    <>
      <TodoTemplate>
        <TodoInsert />
      </TodoTemplate>
    </>
  );
};

export default App;
