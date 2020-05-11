import React from 'react';
import classNames from 'classnames/bind';
import style from './App.css';

const st = classNames.bind(style);

const App = () => {
  const submit = (e) => {
    e.preventDefault();
    console.log('로그인 시도중');
  };

  const logID = () => {
    console.log('아이디 입력중');
  };

  const logPass = () => {
    console.log('비밀번호 입력중');
  };

  return (
    <div className={st('main')}>
      <div>
        <h1 className={st('header')}>로그인</h1>
      </div>
      <div className={st('App', 'blue')}>
        <form className={st('formStyle')} onSubmit={submit}>
          <h3>ID :</h3>
          <input
            type="text"
            className={st('input')}
            placeholder="아이디를 입력하세요"
            onChange={logID}
          />
          <h3>PASS :</h3>
          <input
            type="text"
            className={st('input')}
            placeholder="비밀번호를 입력하세요"
            onChange={logPass}
          />
          <button type="submit">로그인하기</button>
        </form>
      </div>
    </div>
  );
};

export default App;