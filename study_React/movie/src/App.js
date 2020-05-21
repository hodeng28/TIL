/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink } from 'react-router-dom';
import MainRouter from './Router/MainRouter';
import classNames from 'classnames/bind';
import style from './App.css';

const st = classNames.bind(style);

const App = () => {


  return (
    <div>
      <h1 className={st('headerStyle')}>Movie</h1>
      <ul className={st('menu')}>
        <li>
          <NavLink to="/NowPlaying" className={st('link')}>
            NowPlaying
          </NavLink>
        </li>
        <li>
          <NavLink to="/Upcoming" className={st('link')}>
            UpComing
          </NavLink>
        </li>
        <li>
          <NavLink to="/Popular" className={st('link')}>
            Popular
          </NavLink>
        </li>
      </ul>
      <hr />
      <MainRouter />
    </div>
  );
};

export default App;