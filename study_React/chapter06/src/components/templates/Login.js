/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './style/Login.css';
import LoginButton from '../organisms/LoginButton';
import LoginId from '../organisms/LoginId';
import LoginPass from '../organisms/LoginPass';

const st = classNames.bind(style);

const Login = ({ handleLogin, handleUserAccount, userState }) => {
  return (
    <div className={st('wrap')}>
      <div className={st('login-form')}>
        <h1 className={st('login-header')}>로그인</h1>
        <div className={st('formStyle')}>
          <LoginId
            type={"text"}
            name={"id"}
            handleLogin={handleLogin}
            handleUserAccount={handleUserAccount}
            userState={userState}
          />
          <LoginPass
            type={"password"}
            name={"password"}
            handleLogin={handleLogin}
            handleUserAccount={handleUserAccount}
            userState={userState}
          />
          <br />
          <LoginButton handleLogin={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default Login;