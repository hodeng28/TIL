/* eslint-disable no-unused-vars */
import React from 'react';
import classNames from 'classnames/bind';
import style from './style/LoginInput.css'

const st = classNames.bind(style);

const LoginInput = ({ type, userState, name, handleLogin, handleUserAccount }) => {

  const keyPress = (e) => {
    if (e.target === 13) {
      handleLogin();
      console.log(e.target);
    }
  }

  return (
    <input
      type={type}
      className={st('inputStyle')}
      name={name}
      value={name === "id" ? userState.id : userState.password}
      onChange={handleUserAccount}
      onKeyPress={name === "password" ? keyPress : null}
    />
  )
}

export default LoginInput;