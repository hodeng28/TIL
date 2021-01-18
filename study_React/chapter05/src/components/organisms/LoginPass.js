import React from 'react';
import PassText from '../atoms/PassText';
import LoginInput from '../molecules/LoginInput';


const LoginPass = ({ type, name, handleLogin, handleUserAccount, userState }) => {
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
  )
}

export default LoginPass;