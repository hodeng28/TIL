import { styled, Stack, Typography, Divider, Box, Button } from '@mui/material';
import theme from '@/utils/theme';
import Image from 'next/image';

const SkipBlock = () => {
  return (
    <>
      <Wrapper>
        <ImageWrapper>
          <ImageContent src="/images/ar_skip_01x3.png" alt="ar_skip" />
          <LinkButtonWrapper>
            <LinkButton>
              <Image
                src="/images/button_appstore.png"
                alt="App Store Button"
                width={130}
                height={39}
              />
            </LinkButton>
            <LinkButton
              onClick={() => {
                window.open(
                  'https://play.google.com/store/search?q=%EB%82%98%EB%9E%91%EA%B3%A0&c=apps&hl=ko'
                );
              }}
            >
              <Image
                src="/images/button_googleplay.png"
                alt="google play Button"
                width={130}
                height={39}
              />
            </LinkButton>
          </LinkButtonWrapper>
        </ImageWrapper>
        <Divider
          sx={{ height: '20px', backgroundColor: '#eeeeee', border: 'none' }}
        />
        <TextWrapper>
          <Typography>
            앱에서만 플레이 할 수 있는 부분에 진입하였습니다.
          </Typography>
          <Typography>
            [전문 성우가 연기하는 아바타], [구석구석 찾아보는 보물 찾기기능]은
            나랑고 앱에서 플레이 할 수 있습니다.
          </Typography>
        </TextWrapper>
      </Wrapper>
    </>
  );
};

export default SkipBlock;

const Wrapper = styled(Stack)(() => ({
  position: 'fixed',
  top: '3.5rem',
  maxWidth: '466px',
  width: '100%',
  height: '100%'
}));

const ImageContent = styled('img')(() => ({
  width: '100%',
  height: '100%'
}));

const ImageWrapper = styled(Box)(() => ({
  position: 'relative',
  width: '100%'
}));

const LinkButtonWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  position: 'absolute',
  bottom: '30px',
  width: '100%'
}));

const LinkButton = styled(Button)(() => ({
  padding: 0
}));

const TextWrapper = styled(Stack)(() => ({
  height: '100%',
  padding: '18px 30px 0px',
  background: '#ffffff',

  '& p': {
    color: '#726DE6'
  },

  '& p:first-of-type': {
    padding: '2rem 0 3rem'
  }
}));
