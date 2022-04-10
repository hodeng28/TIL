import { useState } from 'react'
import Login from './Components/Login'
import Header from './Components/Header'
import Todo from './Components/Todo'
import './common.scss'

const App = () => {

  const [HeaderState, setHeaderState] = useState({
    isLogin: false,
    loginId: '',
  });

  const { isLogin, loginId } = HeaderState;

  const [userState, setUserState] = useState({
    id: '',
    password: '',
  });

  const [userInforstate, userInforSetState] = useState([
    {
      _id: 0,
      id: "hodeng",
      password: "1234",
    },
  ]);


  const handleLogin = () => {
    const { id, password } = userState;
    userInforstate.map((user) => {
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

  const handleUserAccount = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setUserState({
      ...userState,
      [name]: value,
    });
  };

  const logout = () => {
    setHeaderState({
      isLogin: false,
      loginId: '',
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
  )
}

export default App;
