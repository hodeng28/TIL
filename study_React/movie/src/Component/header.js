import React from 'react';
import { NavLink } from 'react-router-dom';
import MainRouter from '../Router/MainRouter';

const header = () => {
  return (
    <div>
      <div>
        <ul>
          <li>
            <NavLink to="/getNowPlaying">
              NowPlaying
          </NavLink>
          </li>
          <li>
            <NavLink to="/getUpcoming" >
              UpComing
          </NavLink>
          </li>
          <li>
            <NavLink to="/getPopular" >
              Popular
          </NavLink>
          </li>
        </ul>
      </div>
      <MainRouter />
    </div>
  );
};

export default header;


