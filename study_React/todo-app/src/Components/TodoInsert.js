import React from 'react';
import './style/TodoInsert.scss';

const TodoInsert = () => {
  return (
    <>
      <form className="todoInsert">
        <input placeholder="what to do ?" />
        <button type="submit">x</button>
      </form>
    </>
  );
};

export default TodoInsert;
