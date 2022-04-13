import { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md'
import './Style/TodoInsert.scss'

const TodoInsert = ({ addTodos }) => {

  const [todoValue, setTodoValue] = useState('');

  const handleTodoInput = useCallback((e) => {
    setTodoValue(e.target.value);
  }, []);

  const handleSumit = useCallback((e) => {
    addTodos(todoValue);
    setTodoValue('');

    e.preventDefault();
  },[addTodos, todoValue]);

  return (
    <>
      <form className="todo-insert" onSubmit={handleSumit}>
        <input 
          type="text"
          placeholder="할 일~" 
          value={todoValue}
          onChange={handleTodoInput}
        />
        <button type="submit">
            <MdAdd />
        </button>
      </form>
    </>
  );
};

export default TodoInsert;