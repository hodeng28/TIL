import './Style/Header.scss'

const Header = ({ logout, id, isLogin }) => {
  return (
    <>
      <header>
        {isLogin === false ? (
            <h1>{"로그인"}</h1>) : (
            <h1>
              <button onClick={logout}>{"로그아웃"}</button>
            </h1>
        )}
      </header>
    </>
  );
};

export default Header;