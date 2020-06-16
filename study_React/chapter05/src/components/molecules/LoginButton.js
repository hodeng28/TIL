import React from 'react';
import classNames from 'classnames/bind';
import style from './style/LoginButton.css'

const st = classNames.bind(style);

const LoginButton = ({ type, handleLogin }) => {


  return (
    <div>
      <button
        className={st('buttonStyle')}
        type={type}
        onClick={() => handleLogin()}
      >
        <span>로그인하기</span>
      </button>
    </div>
  )
}

export default LoginButton;