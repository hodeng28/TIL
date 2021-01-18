import React, { Component } from 'react';
import Login from '../src/pages/Login';
import Header from '../src/components/templates/Header';

class AppRender extends Component {
  state = {
    isLogin: "로그인",
  };

  handleLogin = (e) => {
    e.preventDefault();
    console.log('클릭');
  };

  render() {
    const { isLogin } = this.state;
    return (
      <>
        <Header isLogin={isLogin} />
        <Login handleLogin={this.handleLogin} />
      </>
    )
  };
};

export default AppRender;