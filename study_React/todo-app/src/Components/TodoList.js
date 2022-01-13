import React from 'react';
import './style/TodoList.scss';
import TodoListItem from './TodoListItem';

const TodoList = () => {
  return (
    <>
      <div className="todoList">
        <TodoListItem />
        <TodoListItem />
        <TodoListItem />
      </div>
    </>
  );
};

export default TodoList;
