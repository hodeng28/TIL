import { Button, Stack, styled, Typography } from '@mui/material';
import PATH from '@/consts/paths';
import useSound from 'use-sound';

interface TextContentsProps {
  block: TextBlockData;
  wrapperRefHeight?: number;
}

const TextBlock = ({ block, wrapperRefHeight }: TextContentsProps) => {
  const [play] = useSound(PATH.PlAY_STORY_AUDIO + block.audioPath, {
    autoplay: true,
    interrupt: true
  });
  return (
    <>
      {block.mode === 'Mode_PictureInclude' && (
        <ImageWrapper height={`calc(100% - ${wrapperRefHeight}px - 56px)`}>
          <ImageContent
            src={PATH.STORY_CONTENT_IMAGE + block.picturePath}
            alt="picture"
          />
        </ImageWrapper>
      )}
      <Button
        onClick={() => {
          play();
        }}
      ></Button>
      <PlayStoryText>{block.text}</PlayStoryText>
    </>
  );
};

export default TextBlock;

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

const PlayStoryText = styled(Typography)(() => ({
  height: '10rem',
  padding: '1rem',
  maxHeight: '10rem',
  fontSize: '.875rem',
  whiteSpace: 'pre-wrap',
  overflowY: 'auto'
}));
