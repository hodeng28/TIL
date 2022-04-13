import './Style/Todo.scss'
import TodoInsert from './Todo/TodoInsert'
import TodoList from './Todo/TodoList'
import TodoTemplate from './Todo/TodoTemplate'

const Todo = () => {

  return (
    <>
      <TodoTemplate>
        <TodoInsert />
        <TodoList />
      </TodoTemplate>
    </>
  );
};

export default Todo;