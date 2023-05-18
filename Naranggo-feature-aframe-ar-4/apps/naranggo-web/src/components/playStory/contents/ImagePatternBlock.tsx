import { styled, Stack } from '@mui/material';
import dynamic from 'next/dynamic';

interface ImagePatternBlockProps {
  block: ImagePatternBlockData;
}

const ImagePatternBlock = ({ block }: ImagePatternBlockProps) => {
  const ArNFT = dynamic(() => import('../../../avatarPages/ArNFT'));

  const imageSrc = block.src;

  return (
    <Wrapper>
      <ArNFT imageSrc={imageSrc} />
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
