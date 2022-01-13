import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import './style/TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState('');

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert(value);
      setValue('');

      e.preventDefault();
    },
    [onInsert, value],
  );

  return (
    <>
      <form className="todoInsert" onSubmit={onSubmit}>
        <input placeholder="what to do ?" value={value} onChange={onChange} />
        <button type="submit">
          <MdAdd />
        </button>
      </form>
    </>
  );
};

export default TodoInsert;
