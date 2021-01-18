/* eslint-disable no-unused-vars */
import React, { Component, useState, useRef } from 'react';
import Board from '../organisms/Board';
import classNames from 'classnames/bind';
import style from './style/Todo.css';

const st = classNames.bind(style);

const Todo = () => {
  const date = new Date();
  const [boardState, setBoardState] = useState([]);
  const [boardContentState, setBoardContentState] = useState([]);
  const [boardTitleState, setBoardTitleState] = useState("");
  const boardTitleRef = useRef();


  const addBoard = async () => {
    let { boardTitleState: title } = boardTitleState;
    if (!title) {
      return false;
    }

    await setBoardState([
      ...boardState,
      {
        _id: date.getTime(),
        title: title,
      },
    ]);
  };

  const changeTItle = (e) => {
    let title = e.target.value;
    setBoardTitleState({
      boardTitleState: title,
    });
  };

  const deleteBoard = (_id) => {
    setBoardState(boardState.filter((user) => user._id !== _id));
    setBoardContentState(boardContentState.filter((i) => i._parent !== _id));
  };

  const addContent = (_parent, content) => {
    setBoardContentState([
      ...boardContentState,
      {
        _id: date.getTime(),
        _parent: _parent,
        content: content,
      },
    ]);
  };

  return (
    <>
      <div className={st('todo-wrap')}>
        <button className={st('addButton')} onClick={addBoard} >
          할일   목록
        </button>
        <input
          className={st('board-title-input')}
          placeholder='제목을 입력하세요'
          onChange={changeTItle}
          value={boardTitleState.title}
          ref={boardTitleRef}
        />
        <div className={st('board-todo-wrap')}>
          {boardState.map((i) => {
            const content = boardContentState.filter(
              (item) => item._parent === i._id
            );

            return (
              <Board
                key={i._id}
                data={i}
                content={content}
                deleteBoard={deleteBoard}
                addContent={addContent}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todo;