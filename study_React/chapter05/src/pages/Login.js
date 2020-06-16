import React from "react";
import LoginTemplate from "../components/templates/Login";

import classNames from "classnames/bind";
import style from "./style/Login.css";

const st = classNames.bind(style);

const Login = ({ handleLogin, handleUserAccount, userState }) => {
  return (
    <LoginTemplate
      className={st("LoginPageStyle")}
      handleLogin={handleLogin}
      handleUserAccount={handleUserAccount}
      userState={userState}
    />
  );
};

export default Login;
