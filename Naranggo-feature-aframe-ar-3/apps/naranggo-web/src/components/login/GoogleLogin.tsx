import { Button } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';

const Login = () => {
  const { data: session, status } = useSession();

  const handleLogin = () => {
    signIn('google');
  };

  const handleLogout = () => {
    signOut();
  };

  if (!session && status === 'loading') {
    return <>로딩중 ...</>;
  }

  return session ? (
    <Button onClick={handleLogout}>로그아웃</Button>
  ) : (
    <Button onClick={handleLogin}>구글 로그인</Button>
  );
};

export default Login;
