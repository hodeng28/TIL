import React, { useEffect } from "react";
import classNames from "classnames/bind";
import style from "./App.css";

const st = classNames.bind(style);

const Login = ({ inputs, inputLogin, clickLogin, status }) => {
  useEffect(() => {
    return () => {
      if (!status) alert("Welcome!");
    };
  }, [status]);

  return (
    <div className={st("loginWrapper")}>
      <h1 className={st("loginTitle")}>로그인</h1>
      <form className={st("loginForm")}>
        <span>ID: </span>
        <input
          name="id"
          className={st("loginInput")}
          type="text"
          value={inputs.id}
          onChange={inputLogin}
        />
        <span>PW: </span>
        <input
          name="pw"
          className={st("loginInput")}
          type="password"
          value={inputs.pw}
          onChange={inputLogin}
        />
        <button
          className={st("loginButton")}
          type="submit"
          onClick={clickLogin}
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;