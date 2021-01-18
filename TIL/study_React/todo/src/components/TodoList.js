import React from "react";
import Todos from "./Todos";

const TodoList = ({ todos, onToggle }) => {
  return (
    <ul>
      {todos && todos.length
        ? todos.map((todo) => (
            <Todos key={todo.id} todo={todo} onToggle={onToggle} />
          ))
        : "?"}
    </ul>
  );
};

export default TodoList;
