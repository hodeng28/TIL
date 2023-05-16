import Ar from '@/components/ar/Ar';
import theme from '@/utils/theme';
import PATH from '@/consts/paths';
import { styled, Stack } from '@mui/material';

interface ImagePatternBlockProps {
  block: ImagePatternBlockData;
}

const ImagePatternBlock = ({ block }: ImagePatternBlockProps) => {
  return (
    <Wrapper>
      <ImagePatternWrapper>
        <ImageContent
          src={PATH.STORY_CONTENT_IMAGE + block.src}
          alt="picture"
        />
        {/* <Ar /> */}
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
  padding: '2%',
  backgroundColor: theme.palette.custom.light
}));

const ImagePatternWrapper = styled(Stack)(() => ({
  padding: '2rem'
}));

const ImageContent = styled('img')(() => ({
  position: 'absolute',
  width: '100%',
  maxHeight: '22rem',
  margin: 'auto 0',
  borderRadius: '.625rem',
  zIndex: 9999
}));
