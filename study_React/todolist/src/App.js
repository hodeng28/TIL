import React, { useState, useMemo } from "react";
import Login from "./Login.js";
import Header from "./Header.js";
import Board from "./Board.js";
import "./App.css";

function App() {
  const [user, setUser] = useState({
    key: 1,
    userId: "hodeng",
    userPw: "1234",
    status: false,
  });

  const [category, setCategories] = useState({
    hodeng: [
      { key: 1, title: "study" },
      { key: 2, title: "play" },
    ],
  });

  const [todos, setTodos] = useState({
    hodeng: [
      { key: 1, parentId: 1, title: "study", content: "react" },
      { key: 2, parentId: 1, title: "study", content: "js" },
      { key: 3, parentId: 1, title: "study", content: "html/css" },
      { key: 4, parentId: 2, title: "play", content: "netflix" },
      { key: 5, parentId: 2, title: "play", content: "sleep" },
    ],
  });

  const [boardInputs, setBoardInputs] = useState("");

  const [inputs, setInputs] = useState({
    id: "",
    pw: "",
  });

  const inputLogin = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const clickLogin = (e) => {
    e.preventDefault();
    if (inputs.id === user.userId && inputs.pw === user.userPw) {
      setUser({
        ...user,
        status: true,
      });
      setInputs({
        id: "",
        pw: "",
      });
    } else {
      alert("Incorrect");
    }
  };

  const clickLogout = () => {
    setUser({
      ...user,
      status: false,
    });
  };

  const createTitle = (e) => {
    if (e.key !== "Enter" || e.target.value.trim() === "") return;

    setCategories({
      [user.userId]: [
        ...category[user.userId],
        { key: category[user.userId].length + 1, title: e.target.value },
      ],
    });
    setBoardInputs("");
  };

  const changeTitle = (e) => {
    setBoardInputs(e.target.value);
  };

  const createTodo = (e, parentId, inputValue) => {
    if (e.key !== "Enter" || e.target.value.trim() === "") return;

    setTodos({
      [user.userId]: [
        ...todos[user.userId],
        {
          key: Math.random(),
          parentId: parentId,
          title: e.target.parentNode.firstElementChild.textContent,
          content: inputValue,
        },
      ],
    });
  };

  const deleteTodos = (e) => {
    const id = user.userId;
    const target = e.target.parentNode.firstElementChild.textContent;
    const leftT = todos[id].filter(({ title }) => title !== target);
    const leftC = category[id].filter(({ title }) => title !== target);
    const isBlank = !todos[id].filter(({ title }) => title === target).length;

    if (isBlank) setCategories({ [id]: [...leftC] });
    setTodos({ [id]: [...leftT] });
  };

  const getCount = (category) => {
    console.log(category);
    return category[user.userId].length;
  };

  const count = useMemo(() => getCount(category), [category]);

  return (
    <>
      <Header
        userId={user.userId}
        status={user.status}
        clickLogout={clickLogout}
      />
      {!user.status ? (
        <Login
          inputs={inputs}
          status={user.status}
          inputLogin={inputLogin}
          clickLogin={clickLogin}
        />
      ) : (
          <Board
            status={user.status}
            categories={category}
            count={count}
            user={user.userId}
            category={category[user.userId]}
            todos={todos[user.userId]}
            createTitle={createTitle}
            changeTitle={changeTitle}
            boardInputs={boardInputs}
            createTodo={createTodo}
            deleteTodos={deleteTodos}
          />
        )}
    </>
  );
}

export default App;