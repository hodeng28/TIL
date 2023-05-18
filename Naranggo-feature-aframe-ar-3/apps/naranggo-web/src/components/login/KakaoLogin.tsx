import { Button } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';

const Login = () => {
  const { data: session, status } = useSession();

  const handleLogin = () => {
    signIn('kakao');
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
    <Button onClick={handleLogin}>카카오 로그인</Button>
  );
};

export default Login; 
