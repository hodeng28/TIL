import React, { useCallback, useRef, useState } from 'react';
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
      id: 3,
      text: 'web study',
      checked: true,
    },
  ]);

  const nextId = useRef(4);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };

      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos],
  );

  const onRemove = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos],
  );

  return (
    <>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} />
      </TodoTemplate>
    </>
  );
};

export default App;
