/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState, useRef } from 'react';
import Login from './pages/Login'
import Todo from './pages/Todo';
import Header from './components/templates/Header';

const App = () => {

  const [headerState, setHeaderState] = useState({
    isLogin: false,
    loginId: "",
  });
  const { isLogin, loginId } = headerState;

  const [state, setState] = useState([
    {
      _id: 0,
      id: "hodeng",
      password: "1234",
    },
  ]);

  const [userState, setUserState] = useState({
    id: "",
    password: "",
  });

  const handleLogin = () => {
    const { id, password } = userState;
    state.map((user) => {
      user.id === id && user.password === password
        ? changeHeader(user.id)
        : console.log('실패');
    });
  };

  const handleUserAccount = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUserState({
      ...userState,
      [name]: value,
    });
  };

  const changeHeader = (id) => {
    setHeaderState({
      isLogin: true,
      loginId: id,
    });
    setUserState({
      id: "",
      password: "",
    });
  };

  const logout = () => {
    setHeaderState({
      isLogin: false,
      loginId: "",
    });
  };

  return (
    <>
      <Header isLogin={isLogin} id={loginId} logout={logout} />
      {isLogin ? (
        <Todo />
      ) : (
          <Login
            handleLogin={handleLogin}
            handleUserAccount={handleUserAccount}
            userState={userState}
          />
        )
      }
    </>
  );
};

export default App;