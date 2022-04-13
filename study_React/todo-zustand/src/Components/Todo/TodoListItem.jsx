import { MdCheckBox, MdCheckBoxOutlineBlank, MdRemoveCircleOutline } from 'react-icons/md';
import './Style/TodoListItem.scss';
import cn from 'classnames';

const TodoListItem = ({ todo, removeTodo, handleCheckBox }) => {

  const { id, text, checked } = todo;

  return (
    <>
      <li className="todo-listItem">
          <span 
            className={cn('check-box', { checked })}
            onClick={() => handleCheckBox(id)}
          >
              {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
              <span>{text}</span>
          </span>
          <span 
            className="remove"
            onClick={() => removeTodo(id)}
          >
            <MdRemoveCircleOutline />
          </span>
      </li>
    </>
  );
};

export default React.memo(TodoListItem);