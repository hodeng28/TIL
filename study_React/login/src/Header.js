/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import React from 'react';
import './Header.css';


const Header = ({ id, isLogin }) => {
  return (
    <div className="headerStyle">
      <span className="headerLogin">
        {isLogin === false ? (
          "하하하하.."
        ) : (
            <span className>
              {id}
              <a
                className="headerLogout"
                href="#"
                onClick={logout}
              >
                {'로그아웃'}
              </a>
            </span>
          )}
      </span>
    </div>
  );
};

export default Header;