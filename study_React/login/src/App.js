/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Header from './Header';

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
    <div>
      <Header isLogin={isLogin} id={loginId} logout={logout} />
      <Login
        handleUserAccount={handleUserAccount}
        handleLogin={handleLogin}
        userState={userState}
      />
    </div>
  );
}

export default App;
