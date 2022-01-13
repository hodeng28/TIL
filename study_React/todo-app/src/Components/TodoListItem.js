import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
  MdCheckBox,
} from 'react-icons/md';
import cn from 'classnames';
import './style/TodoListItem.scss';

const TodoListItem = ({ todo }) => {
  const { text, checked } = todo;

  return (
    <>
      <div className="todoListItem">
        <div className={cn('checkBox', { checked })}>
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </div>
        <div className="remove">
          <MdRemoveCircleOutline />
        </div>
      </div>
    </>
  );
};

export default TodoListItem;
