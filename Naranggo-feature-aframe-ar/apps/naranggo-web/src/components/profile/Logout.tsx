import { Button, styled, Box } from '@mui/material';
import Image from 'next/image';

interface LogoutProps {
  onClick?: () => void;
}

const Logout = ({ onClick }: LogoutProps) => (
  <Wrapper>
    <LogoutButton variant="outlined" onClick={onClick}>
      <Image
        src="/images/logout.svg"
        alt="logout"
        layout="fill"
        objectFit="contain"
        objectPosition="center"
      />
    </LogoutButton>
  </Wrapper>
);

export default Logout;

const Wrapper = styled(Box)(() => ({
  width: '100%'
}));

const LogoutButton = styled(Button)(() => ({
  marginTop: '7rem',
  width: '100%',
  height: '3rem'
}));
