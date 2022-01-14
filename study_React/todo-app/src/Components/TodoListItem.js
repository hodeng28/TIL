import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
  MdCheckBox,
} from 'react-icons/md';
import cn from 'classnames';
import './style/TodoListItem.scss';

const TodoListItem = ({ todo, onRemove }) => {
  const { id, text, checked } = todo;

  return (
    <>
      <div className="todoListItem">
        <div className={cn('checkBox', { checked })}>
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </div>
    </>
  );
};

export default TodoListItem;
