import { useRef, useState } from 'react';
import Board from './Board';
import './Style/Todo.scss'

const Todo = () => {

  const date = new Date();
  const [boardState, setBoardState] = useState([]);
  const [boardTitleState, setBoardTitleState] = useState("");
  const [boardContentState, setBoardContentState] = useState([]);

  // 할일 추가
  const addBoard = async () => {
    let { boardTitleState: title } = boardTitleState;
    if (!title) {
      return false;
    }

    await setBoardState([
      ...boardState,
      {
        boardId: date.getTime(),
        title: title,
      },
    ]);
  };

  const changeTitle = (e) => {
    let title = e.target.value;
    setBoardTitleState({
      boardTitleState: title,
    });
  };

  const addTodoContent = (_parent, content) => {
    setBoardContentState([
      ...boardContentState,
      {
        boardId: date.getTime(),
        _parent: _parent,
        content: content,
      },
    ]);
  };

  const deleteBoard = (boardId) => {
    setBoardState(boardState.filter((user) => user.boardId !== boardId));
    setBoardContentState(boardContentState.filter((item) => item._parent !== boardId));
  };

 

  return (
    <>
      <div className="todo-wrap">
        <h2>할 일</h2>
        <input
          placeholder='제목을 입력하세요'
          onChange={changeTitle}
          value={boardTitleState.title}
        />
        <button onClick={addBoard}>추가</button>
        <div className="board-wrap">
          {boardState.map((i) => {
            const content = boardContentState.filter(
              (item) => item._parent === i.boardId
            );

            return (
              <Board
                key={i.boardId}
                data={i}
                content={content}
                deleteBoard={deleteBoard}
                addTodoContent={addTodoContent}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todo;