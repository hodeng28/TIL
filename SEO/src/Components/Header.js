import React from "react";
import "./style/Header.scss"

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="headerWrap">
          <h1 className="logo">
            <img
              className="mainLogo"
              alt="starbuck logo"
              src="https://www.starbucks.co.kr/common/img/common/logo.png"
            />
          </h1>
          <div className="headerMenu">
            <ul className="subNav">
              <li>Sign In</li>
              <li>My StarBucks</li>
              <li>Customer Service Ideas</li>
              <li>Find a Store</li>
            </ul>
            <ul className="headerNav">
              <li>COFFEE</li>
              <li>MENU</li>
              <li>STORE</li>
              <li>RESPONSIBILITY</li>
              <li>MY STARBUCKS REWARDS</li>
              <li>WHAT'S NEW</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;
