import React from 'react';
import './style/TodoList.scss';
import TodoListItem from './TodoListItem';

const TodoList = ({ todos }) => {
  return (
    <>
      <div className="todoList">
        {todos.map((todo) => (
          <TodoListItem todo={todo} key={todo.id} />
        ))}
      </div>
    </>
  );
};

export default TodoList;
