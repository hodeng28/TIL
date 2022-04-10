import './Style/Login.scss'

const Login = ({ userState, name, handleInputId ,handleInputPw, handleLogin, handleUserAccount }) => {

  return (
    <>
      <div className="login-wrap">
        <h2>로그인</h2>
        <form className="login-input-wrap">
          <input 
            type="text"
            name='id'
            defaultValue={userState.id}
            onChange={handleUserAccount}
            placeholder="아이디를 입력해주세요."
          />
          <input
             type="password"
             name='password'
             defaultValue={userState.password}
             onChange={handleUserAccount}
             placeholder="비밀번호를 입력해주세요."
          />
             <button
                onClick={() => handleLogin()}
              >
                <span>로그인</span>
              </button>
        </form>
      </div>
    </>
  );
};

export default Login;