/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import Header from './components/templates/Header';
import LoginForm from './components/templates/LoginForm'
import Todo from './pages/Todo.js'

const App = () => {

  const [HeaderState, setHeaderState] = useState({
    isLogin: false,
    loginId: '',
  });

  const { isLogin, loginId } = HeaderState;

  const [state, setState] = useState([
    {
      _id: 0,
      id: "hodeng",
      password: "1234",
    },
  ]);


  const [userState, setUserState] = useState({
    id: '',
    password: '',
  });

  const handleLogin = () => {
    const { id, password } = userState;
    state.map((user) => {
      user.id === id && user.password === password ?
        changeHeader(user.id) : alert('아이디와 비밀번호를 확인헤주세요');
    });
  };

  const changeHeader = (id) => {
    setHeaderState({
      isLogin: true,
      loginId: id,
    });
    setUserState({
      id: '',
      password: '',
    });
  };

  const logout = () => {
    setUserState({
      isLogin: false,
      loginId: '',
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

  return (
    <>
      <Header isLogin={isLogin} id={loginId} logout={logout} />
      {isLogin ? (
        <Todo />
      ) : (
          <LoginForm
            handleLogin={handleLogin}
            handleUserAccount={handleUserAccount}
            userState={userState}
          />
        )
      }
    </>
  );
}

export default App;