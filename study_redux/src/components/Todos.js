import React, { useState } from "react";
import TodoList from "./TodoList";

function Todos({ todos, onCreate, onToggle, onDelete }) {
  const [text, setText] = useState("");
  const onChange = (e) => setText(e.target.value);
  const onSubmit = (e) => {
    e.preventDefault();
    onCreate(text);
    setText("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={text} onChange={onChange} placeholder="뭐 해?" />
        <button type="submit">등록</button>
      </form>
      <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} />
    </div>
  );
}

export default React.memo(Todos);
