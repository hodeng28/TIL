/* eslint-disable no-undef */
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './style/Board.css';

const st = classNames.bind(style);

const Board = ({ data, content, deleteBoard, addContent }) => {
  const [contentState, setContentState] = useState('내용을 입력해주세요');

  const changeContentState = (e) => {
    setContentState({
      contentState: e.target.value,
    });
  };

  const focusContent = (e) => {
    e.target.value = "";
  };
  const setContentInput = () => {
    setContentState({
      contentState: "",
    });
  };

  const { contentState: newContent } = contentState;

  return (
    <div className={st('board-wrap')}>
      <label className={st('Board-title')}>
        {data.title} <span onClick={() => deleteBoard(data.id)}>X</span>
      </label>
      {content.map((e) => {
        return (
          <p className={st('board-content')} key={e._id}>
            {e.content}
          </p>
        );
      })}

      <input
        className={st('board-input')}
        value={newContent}
        onFocus={focusContent}
        onChange={changeContentState}
        onKeyPress={(e) => {
          if (e.keycode === 13) {
            addContent(data.id, title);
            return setContentInput();
          }
        }}
      />
    </div>
  );
};

export default Board;