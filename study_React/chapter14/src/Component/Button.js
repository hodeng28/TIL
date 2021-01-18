import React from "react";
import style from "./Button.scss";
import classNames from "classnames/bind";

const st = classNames.bind(style);

const Button = ({ children }) => {
  return <button className={st("CustomButton")}>{children}</button>;
};

export default Button;