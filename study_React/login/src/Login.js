import React from 'react';
import './Login.css';


function Login() {
  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="loginHeader">Log-in to your account</h1>
        <div className="loginLayout">
          <form className="LoginForm">
            <input
              className="input"
              placeholder="ID"
            />
            <input
              className="input"
              placeholder="Password"
            />
            <br />
            <button
              className="loginBtn"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
};

export default Login;