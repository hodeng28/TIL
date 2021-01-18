import React from "react";

const Todos = ({ todo, onToggle }) => (
  <li
    style={{
      textDecoration: todo.done ? "line-through" : "none",
    }}
    onClick={() => onToggle(todo.id)}
  >
    {todo.text}
  </li>
);

export default Todos;
