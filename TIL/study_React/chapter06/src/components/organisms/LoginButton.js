import React from 'react';
import LoginButton from '../molecules/Login.button';

const LoginId = ({ type, handleLogin }) => {
  return (
    <div>
      <LoginButton type={type} handleLogin={handleLogin} />
    </div>
  );
};

export default LoginId;