import { styled, Button, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { shouldNotForwardProp } from '@/utils/helpers';

interface RoundCheckBtnProps {
  text: string;
  isCheck: number;
  onClickBtn?: () => void;
}

const RoundCheckBtn = ({ text, isCheck, onClickBtn }: RoundCheckBtnProps) => (
  <Wrapper onClick={onClickBtn} isCheck={isCheck}>
    {isCheck === 1 ? <AddOutlinedIcon /> : <CheckIcon />}
    <Typography>{text}</Typography>
  </Wrapper>
);

export default RoundCheckBtn;

const Wrapper = styled(
  Button,
  shouldNotForwardProp('isCheck')
)<{ isCheck?: number }>(({ isCheck, theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.1rem',
  padding: '0.1rem 0.8rem',
  color: '#fff',
  borderRadius: '1rem',
  backgroundColor: isCheck
    ? theme.palette.custom.blue
    : theme.palette.custom.green,
  '&:hover': {
    backgroundColor: isCheck
      ? theme.palette.custom.blue
      : theme.palette.custom.green
  },
  cursor: 'pointer',
  '& > p': {
    fontSize: '0.8rem'
  },
  '& > svg': {
    width: '1rem'
  }
}));
