import { useState } from "react";
import './Style/Board.scss'

const Board = ({ data, content, deleteBoard, addTodoContent, boardId }) => {

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

  const keyPress = (e) => {
    if (e.keycode === 13) {
      addTodoContent(data.id, title);
      return setContentInput();
    }
  }

  const { contentState: newContent } = contentState;

  return (
    <>
      <div className="board">
        <h3>
          {data.title} 
          <button 
            onClick={() => deleteBoard(data.id)}
          >X
          </button>
        </h3>
        {content.map((e) => {
          return (
            <p key={e.boardId}>
              {e.content}
            </p>
          );
        })}

        <input
          value={newContent}
          onFocus={focusContent}
          onChange={changeContentState}
          onKeyPress={keyPress}
        />
      </div>
    </>
  );
};

export default Board;