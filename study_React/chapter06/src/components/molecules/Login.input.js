import React from 'react';
import classNames from 'classnames/bind';
import style from './style/Login.input.css';

const st = classNames.bind(style);

const LoginInput = ({
  type,
  name,
  handleLogin,
  handleUserAccount,
  userState,
}) => {
  const handleKeyPress = (e) => {
    if (e.keycode === 13) {
      console.log(name);
      handleLogin();
    }
    return
  };

  return (
    <input
      type={type}
      className={st('inputStyle')}
      name={name}
      value={name === "id" ? userState.id : userState.password}
      onChange={handleUserAccount}
      onKeyPress={name === "password" ? handleKeyPress : null}
    />
  );
};

export default LoginInput;