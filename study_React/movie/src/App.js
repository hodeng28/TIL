/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink } from 'react-router-dom';
import MainRouter from './Router/MainRouter';
import classNames from 'classnames/bind';
import style from './App.css';
import header from './Component/header'

const st = classNames.bind(style);

const App = () => {
  return (
    <div>
      <header />
    </div>
  );
};

export default App;