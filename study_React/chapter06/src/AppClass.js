import React, { Component } from "react";
import Login from "../src/p"

class AppClass extends Component {
  state = {
    isLogin: "로그인",
  };

  handleLogin = (e) => {
    e.preventDefault();
  };

  render() {
    const { isLogin } = this.state;
    return (
      <>
        <Header isLogin={isLogin} />
        <Login handleLogin={this.handleLogin} />
      </>
    );
  }
}

export default AppClass;