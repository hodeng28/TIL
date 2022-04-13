import './Style/TodoList.scss'
import TodoListItem from './TodoListItem';

const TodoList = ({ todos, removeTodo, handleCheckBox }) => {

  return (
    <>
      <ul className="todo-list">
          {todos.map(todo => (
            <TodoListItem  
              key={todo.id}  
              todo={todo}
              removeTodo={removeTodo}
              handleCheckBox={handleCheckBox}
            />
          ))}
      </ul>
      
    </>
  );
};

export default TodoList;