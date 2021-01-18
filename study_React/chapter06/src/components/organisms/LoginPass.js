import React from 'react';
import LoginInput from '../molecules/Login.input';
import PassText from '../atoms/PassText';

const LoginPass = ({
  type,
  name,
  handleLogin,
  handleUserAccount,
  userState,
}) => {
  return (
    <div>
      <PassText />
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

export default LoginPass;
