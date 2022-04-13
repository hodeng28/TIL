import { useCallback, useRef, useState } from 'react';
import './Style/Todo.scss'
import TodoInsert from './Todo/TodoInsert'
import TodoList from './Todo/TodoList'
import TodoTemplate from './Todo/TodoTemplate'

const Todo = () => {

  const [todos, setTodos] = useState([
    // {
    //   id:1,
    //   text: '하이',
    //   checked: true,
    // },
    // {
  ]);

  const nextId = useRef(0);

  const addTodos = useCallback((text) => {
      const addTodo = {
        id: nextId.current,
        text,
        checked: false,
      };
      setTodos(todos.concat(addTodo));
      nextId.current += 1;
  }, [todos]);

  const removeTodo = useCallback((id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  });

  const handleCheckBox = useCallback((id) => {
    setTodos(
      todos.map(todo => todo.id === id ? { ...todo, checked: !todo.checked } : todo),
    )
  }, [todos]);

  return (
    <>
      <TodoTemplate>
        <TodoInsert addTodos={addTodos} />
        <TodoList
           todos={todos}
           removeTodo={removeTodo}
           handleCheckBox={handleCheckBox}
        />
      </TodoTemplate>
    </>
  );
};

export default Todo;