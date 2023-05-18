import { styled, Stack } from '@mui/material';
import PATH from '@/consts/paths';

interface PictureContentsProps {
  block: PictureBlockData;
  wrapperRefHeight?: number;
}

const PictureBlock = ({ block, wrapperRefHeight }: PictureContentsProps) => {
  return (
    <>
      <ImageWrapper height={`calc(100% - ${wrapperRefHeight}px - 56px)`}>
        <ImageContent
          src={PATH.STORY_CONTENT_IMAGE + block.src}
          alt="picture"
        />
      </ImageWrapper>
      <PlayStoryText>{block.pictureTitle}</PlayStoryText>
    </>
  );
};

export default PictureBlock;

const ImageWrapper = styled(Stack)(() => ({
  position: 'fixed',
  top: '3.5rem',
  left: '50%',
  transform: 'translateX(-50%)',
  maxWidth: '466px',
  width: '100%',
  padding: '2%'
}));

const ImageContent = styled('img')(() => ({
  width: '100%',
  maxHeight: '22rem',
  margin: 'auto 0',
  borderRadius: '.625rem'
}));

const PlayStoryText = styled(Stack)(() => ({
  height: '10rem',
  maxHeight: '10rem',
  padding: '.5rem',
  fontSize: '.875rem',
  fontWeight: 'bold'
}));
