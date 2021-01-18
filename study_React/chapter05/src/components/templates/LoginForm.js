/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import style from './style/LoginForm.css';
import LoginButton from '../molecules/LoginButton';
import LoginId from '../organisms/LoginId';
import LoginPass from '../organisms/LoginPass';

const st = classNames.bind(style);

const LoginForm = ({ userState, handleUserAccount, handleLogin }) => {
  return (
    <div className={st('wrapper')}>
      <div className={st('loginForm')}>
        <h1 className={st('loginHeader')}>로그인</h1>
        <div className={st('formStyle')}>
          <LoginId
            type={'text'}
            name={'id'}
            handleLogin={handleLogin}
            handleUserAccount={handleUserAccount}
            userState={userState}
          />
          <LoginPass
            type={'text'}
            name={'password'}
            handleLogin={handleLogin}
            handleUserAccount={handleUserAccount}
            userState={userState}
          />
          <br />
          <LoginButton />
        </div>
      </div>
    </div>
  )
}

export default LoginForm;