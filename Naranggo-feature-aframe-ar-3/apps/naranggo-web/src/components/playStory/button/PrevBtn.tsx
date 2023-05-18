import { Button, styled, Typography } from '@mui/material';

interface PrevBtnProps {
  handleClickPrevBtn: () => void;
}

const PrevBtn = ({ handleClickPrevBtn }: PrevBtnProps) => {
  return (
    <>
      <StyledNextBtn variant="contained" onClick={handleClickPrevBtn}>
        <Typography>이전</Typography>
      </StyledNextBtn>
    </>
  );
};

export default PrevBtn;

const StyledNextBtn = styled(Button)(() => ({
  backgroundColor: '#9f9f9f',

  '&:hover': {
    backgroundColor: '#9f9f9f !important'
  }
}));
