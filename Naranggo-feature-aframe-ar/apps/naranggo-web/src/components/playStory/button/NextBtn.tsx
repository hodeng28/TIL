import { Button, styled } from '@mui/material';

interface NextBtnProps {
  handleClickNextBtn: () => void;
  blockData: PagesBlock;
}

const NextBtn = ({ handleClickNextBtn, blockData }: NextBtnProps) => {
  return (
    <>
      <StyledNextBtn variant="contained" onClick={handleClickNextBtn}>
        {blockData.type !== 'FinishBlockData' ? '다음' : '종료'}
      </StyledNextBtn>
    </>
  );
};

export default NextBtn;

const StyledNextBtn = styled(Button)(() => ({
  backgroundColor: '#736dee',

  '&:hover': {
    backgroundColor: '#736dee !important'
  }
}));
