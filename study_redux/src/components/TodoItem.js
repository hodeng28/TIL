import React, { useState } from "react";

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <>
      <li
        style={{
          textDecoration: todo.done ? "line-through" : "none",
        }}
        onClick={() => onToggle(todo.id)}
      >
        {todo.text}
      </li>
      <button onClick={() => onDelete(todo.id)}>X</button>
    </>
  );
}

export default React.memo(TodoItem);
