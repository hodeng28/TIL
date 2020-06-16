import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import Todos from '../components/Todos';
import { addTodo, toggleTodo } from '../modules/todos';

function TodosContainer({ todos, addTodo, toggleTodo }) {
  const onCreate = text => addTodo(text);
  const onToggle = useCallback(id => toggleTodo(id), [toggleTodo]);


  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />;
}

export default connect(
  state => ({ todos: state.todos }),
  {
    addTodo,
    toggleTodo
  }
)(TodosContainer);


// useSelector, useDispatch 사용

// import React, { useCallback } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import Todos from '../components/Todos';
// import { addTodo, toggleTodo } from '../modules/todos';

// function TodosContainer() {
//   const todos = useSelector(state => state.todos);
//   const dispatch = useDispatch();
//   // useDispatch는 context에 포함된 dispatch를 가져올 수 있다.
//   // 이 dispatch를 이용해 action을 발생시킨다.

//   // useSelector는 selector function을 전달하여,
//   // context에 포함된 state를 가져올 수 있다.

//   const onCreate = text => dispatch(addTodo(text));
//   const onToggle = useCallback(id => dispatch(toggleTodo(id))
//     , [dispatch])

//   return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />;
// }

// export default TodosContainer;