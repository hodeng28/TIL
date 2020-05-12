import React from 'react';
import LoginInput from '../molecules/Login.input';
import LoginText from '../atoms/LoginText';


const LoginId = ({ type, name, handleLogin, handleUserAccount, userState }) => {
  return (
    <div>
      <LoginText />
      <LoginInput
        type={type}
        name={name}
        handleLogin={handleLogin}
        handleUserAccount={handleUserAccount}
        userState={userState}
      />
    </div>
  );
};

export default LoginId;