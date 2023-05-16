import { styled, Stack } from '@mui/material';

const BottomSheetHeader = () => {
  return (
    <Wrapper>
      <Handle />
    </Wrapper>
  );
};

export default BottomSheetHeader;

const Wrapper = styled(Stack)(() => ({
  position: 'relative',
  height: '1rem',
  borderTopLeftRadius: '.5rem',
  borderTopRightRadius: '.5rem'
}));

const Handle = styled(Stack)(() => ({
  width: '5rem',
  height: '.25rem',
  margin: '0 auto',
  borderRadius: '.25rem',
  backgroundColor: '#d0d0d0'
}));
