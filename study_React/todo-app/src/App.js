import React, { useCallback, useRef, useState, useReducer } from 'react';
import TodoInsert from './Components/TodoInsert';
import TodoList from './Components/TodoList';
import TodoTemplate from './Components/TodoTemplate';

function createBuckTodos() {
  const TodosArray = [];
  for (let i = 0; i <= 2500; i++) {
    TodosArray.push({
      id: i,
      text: `todo ${i}`,
      checked: false,
    });
  }
  return TodosArray;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter((todo) => todo.id !== action.id);
    case 'ONTOGGLE':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBuckTodos);
  // useReducer를 사용할 때, 원래 두번째 파라미터에 초기 상태를 넣어주어야 함.
  // 지금은 두번째에 undefined, 세번째에 초기 상태를 넣어줬는데, 이렇게 하면 컴포넌트가 맨 처음 렌더링될 때만 createBunkTodos를 호출한다.

  const nextId = useRef(2501);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };

    dispatch({ type: 'INSERT', todo });
    nextId.current += 1;
  }, []);

  const onRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  const onToggle = useCallback((id) => {
    dispatch({ type: 'ONTOGGLE', id });
  }, []);

  return (
    <>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      </TodoTemplate>
    </>
  );
};

export default App;
