import React, { useCallback } from "react";
import { connect } from "react-redux";
import Todos from "../components/Todos";
import { addTodo, toggleTodo } from "../modules/todos";

function TodosContainer({ todos, addTodo, toggleTodo }) {
  const onCreate = useCallback((text) => addTodo(text), [addTodo]);
  const onToggle = useCallback((id) => toggleTodo(id), [toggleTodo]);

  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />;
}

const mapStateToProps = (state) => ({ todos: state.todos }); //  객체 형태로 리턴
const mapDispatchProps = {
  addTodo,
  toggleTodo, // 객체로 만들게 된다면 bindActionCreateors 작동연결
};

export default connect(mapStateToProps, mapDispatchProps)(TodosContainer);
