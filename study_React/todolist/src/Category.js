import React, { useState } from "react";
import classNames from "classnames/bind";
import style from "./App.css";
import Todos from "./Todos";

const st = classNames.bind(style);

const CategoryLists = ({ board, todos, createTodo, deleteTodos }) => {
  const [inputState, setInputState] = useState("");
  const changeInput = (e) => {
    setInputState(e.target.value);
  };

  return (
    <div className={st("todosWrapper")}>
      <h3 className={st("todosTitle")}>{board.title}</h3>
      <button className={st("deleteTodosBtn")} onClick={deleteTodos}>
        x
      </button>
      <ul className={st("todo")}>
        <Todos todos={todos.filter((todo) => todo.parentId === board.key)} />
      </ul>
      <input
        className={st("inputTodo")}
        type="text"
        onChange={changeInput}
        onKeyUp={(e) => {
          createTodo(e, board.key, inputState);
          if (e.key === "Enter") setInputState("");
        }}
        value={inputState}
      />
    </div>
  );
};

const Category = ({
  category,
  todos,
  boardInputs,
  changeTitle,
  changeTodo,
  createTodo,
  todoInputs,
  deleteTodos,
}) => {
  return (
    <div className={st("todosBox")}>
      {category.map((board) => (
        <CategoryLists
          key={board.key}
          board={board}
          todos={todos}
          boardInputs={boardInputs}
          changeInputs={changeTitle}
          changeTodo={changeTodo}
          createTodo={createTodo}
          todoInputs={todoInputs}
          deleteTodos={deleteTodos}
        />
      ))}
    </div>
  );
};

export default Category;
