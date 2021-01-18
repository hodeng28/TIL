import React, { useState } from "react";
import TodoList from "./TodoList";

function AddTodo({ todos, onChange, onCreate }) {
  const [text, setText] = useState("");

  const onChange = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    onCreate;
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={text} onChange={onChange} placeholder="^^" />
        <button type={submit}>등록이요</button>
      </form>
      <TodoList todos={todos} onToggle={onToggle} />
    </div>
  );
}

export default AddTodo;
