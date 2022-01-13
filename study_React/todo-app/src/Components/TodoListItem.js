import React from 'react';
import { MdCheckBoxOutlineBlank, MdCheckCircleOutline } from 'react-icons/md';
import './style/TodoListItem.scss';

const TodoListItem = () => {
  return (
    <>
      <div className="todoListItem">
        <div className="checkBox">
          <MdCheckBoxOutlineBlank />
          <div className="text">To do</div>
        </div>
        <div className="remove">
          <MdCheckCircleOutline />
        </div>
      </div>
    </>
  );
};

export default TodoListItem;
