import { Stack, styled } from '@mui/material';

interface FooterProps {
  children: React.ReactNode;
}
const Footer = ({ children }: FooterProps) => {
  return <FooterStack>{children}</FooterStack>;
};

export default Footer;

const FooterStack = styled(Stack)(() => ({
  backgroundColor: '#fff',
  boxShadow: '1px 2px 5px rgba(0, 0, 0, 0.25)',
  borderTop: '1px solid #f5f5f5',
  zIndex: 999
}));
