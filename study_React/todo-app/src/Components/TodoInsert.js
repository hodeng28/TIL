import React from 'react';
import { MdAdd } from 'react-icons/md';
import './style/TodoInsert.scss';

const TodoInsert = () => {
  return (
    <>
      <form className="todoInsert">
        <input placeholder="what to do ?" />
        <button type="submit">
          <MdAdd />
        </button>
      </form>
    </>
  );
};

export default TodoInsert;
