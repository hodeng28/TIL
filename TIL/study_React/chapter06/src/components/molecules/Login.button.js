import React from 'react';
import classNames from 'classnames/bind';
import style from './style/Login.button.css'

const st = classNames.bind(style);



const LoginButton = ({ type, handleLogin }) => {

  const LoginButtonLabel = () => {
    return <span>로그인 하기</span>;
  };

  return (
    <button
      className={st('buttonStyle')}
      type={type}
      onClick={() => handleLogin()}
    >
      <LoginButtonLabel />
    </button>
  );
};

export default LoginButton;




