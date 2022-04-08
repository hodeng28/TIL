import './Style/Login.scss'

const Login = () => {
  return (
    <>
      <div className="login-wrap">
        <h2>로그인</h2>
        <div className="login-input-wrap">
          <input 
            type="text" 
            placeholder="아이디를 입력해주세요"
          />
          <input
             type="text"
             placeholder="비밀번호를 입력해주세요"
          />
        </div>
      </div>
    </>
  );
};

export default Login;