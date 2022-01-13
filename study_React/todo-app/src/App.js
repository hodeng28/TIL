import React, { useState } from 'react';
import TodoInsert from './Components/TodoInsert';
import TodoList from './Components/TodoList';
import TodoTemplate from './Components/TodoTemplate';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: 'react study',
      checked: true,
    },
    {
      id: 2,
      text: 'typeScript study',
      checked: false,
    },
    {
      id: 1,
      text: 'web study',
      checked: true,
    },
  ]);

  return (
    <>
      <TodoTemplate>
        <TodoInsert />
        <TodoList todos={todos} />
      </TodoTemplate>
    </>
  );
};

export default App;
