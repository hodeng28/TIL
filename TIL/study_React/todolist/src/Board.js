import React from "react";
import classNames from "classnames/bind";
import style from "./App.css";
import Category from "./Category";

const st = classNames.bind(style);

const Board = ({
  count,
  category,
  todos,
  createTitle,
  boardInputs,
  changeTitle,
  createTodo,
  deleteTodos,
}) => {


  return (
    <div className={st("boardWrapper")}>
      <h2 className={st("boardTitle")}>New Board</h2>
      <input
        type="text"
        placeholder="보드 제목을 입력하세요"
        className={st("inputTitle")}
        onKeyUp={createTitle}
        value={boardInputs}
        onChange={changeTitle}
      />
      <div className={st("count")}>총{count}개</div>
      <Category
        category={category}
        todos={todos}
        boardInputs={boardInputs}
        changeTitle={changeTitle}
        createTodo={createTodo}
        deleteTodos={deleteTodos}
      />
    </div>
  );
};

export default React.memo(Board);