import { MdCheckBox, MdCheckBoxOutlineBlank, MdRemoveCircleOutline } from 'react-icons/md'
import './Style/TodoListItem.scss'

const TodoListItem = () => {

  return (
    <>
      <li className="todo-listItem">
          <span className="check-box">
              <MdCheckBoxOutlineBlank />
              <span>할 일</span>
          </span>
          <span className="remove">
              <MdRemoveCircleOutline />
          </span>
      </li>
    </>
  );
};

export default TodoListItem;