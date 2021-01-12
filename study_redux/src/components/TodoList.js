import React, { useState } from "react";
import TodoItem from "./TodoItem";

function TodoList({ todos, onToggle }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
}

export default React.memo(TodoList);
