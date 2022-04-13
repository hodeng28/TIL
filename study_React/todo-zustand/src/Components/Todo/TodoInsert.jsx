import { MdAdd } from 'react-icons/md'
import './Style/TodoInsert.scss'

const TodoInsert = () => {

  return (
    <>
      <form className="todo-insert">
        <input type="text" placeholder="할 일~" />
        <button type="submit">
            <MdAdd />
        </button>
      </form>
    </>
  );
};

export default TodoInsert;