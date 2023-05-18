import { Stack, styled } from '@mui/material';
import styles from 'styles/Keyframes.module.css';
import NavigationRoundedIcon from '@mui/icons-material/NavigationRounded';

interface MoveMarkProps extends MapCoordinate {
  children: React.ReactNode;
}

const MoveMark = ({ children }: MoveMarkProps) => {
  return (
    <Wrapper direction="row">
      <ArrowIcon />
      {children}
    </Wrapper>
  );
};

export default MoveMark;

const Wrapper = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: '0.5rem',
  position: 'relative',
  width: 'max-content',
  marginTop: '0.5rem',
  padding: '0.1rem 0.5rem',
  borderRadius: '0.5rem',
  border: '1px dashed black',
  backgroundColor: theme.palette.custom.light,
  transform: 'translateX(-50%)'
}));

const ArrowIcon = styled(NavigationRoundedIcon)(({ theme }) => ({
  color: theme.palette.custom.red,
  fontSize: '2rem',
  animation: `${styles.arrow_move} 0.7s infinite linear alternate`
}));
