import theme from '@/utils/theme';
import PATH from '@/consts/paths';
import { styled, Stack } from '@mui/material';
import dynamic from 'next/dynamic';

const ImagePatternBlock = () => {
  const ArNFT = dynamic(() => import('../../../avatarPages/ArNFT'));
  return (
    <Wrapper>
      <ImagePatternWrapper>
        <ArNFT />
      </ImagePatternWrapper>
    </Wrapper>
  );
};

export default ImagePatternBlock;

const Wrapper = styled(Stack)(() => ({
  position: 'fixed',
  top: '3.5rem',
  left: '50%',
  transform: 'translateX(-50%)',
  maxWidth: '466px',
  width: '100%',
  height: '100%',
  padding: '2%'
}));

const ImagePatternWrapper = styled(Stack)(() => ({
  padding: '2rem'
}));
