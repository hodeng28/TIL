import React from 'react';
import classNames from 'classnames/bind';
import style from './style/Header.css';

const st = classNames.bind(style);

const Header = ({ logout, id, isLogin }) => {
  return (
    <div className={st('headerStyle')}>
      <span className={st('headerText')}>
        {isLogin === false ? (
          "로그인 해주세요") : (<span>{id}
            <a className={st('headerLogout')}
              onClick={logout}
              href="#!">{"로그아웃"}</a>
          </span>
          )}
      </span>
    </div>
  );
};


export default Header;