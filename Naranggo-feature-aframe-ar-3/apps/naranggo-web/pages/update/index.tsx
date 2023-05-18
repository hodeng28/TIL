import { sendMessageToDevice } from '@/utils/helpers';
import { Button, Stack, Typography, styled } from '@mui/material';
import Image from 'next/image';
import { WEBVIEW_MESSAGE_TYPE } from '@naranggo/shared';

const AppUpdate = () => {
  return (
    <Wrapper>
      <ContentsWrapper>
        <LogoBox>
          <Image
            src="/images/narango_logo.svg"
            alt="naranggo_logo"
            layout="fill"
            objectFit="contain"
          />
        </LogoBox>
        <ImageBox>
          <Image
            src="/images/appUpdate.svg"
            alt="appUpdate"
            layout="fill"
            objectFit="contain"
          />
        </ImageBox>
        <TitleWrapper>
          <Typography variant="h5">새 업데이트가 있습니다.</Typography>
          <Typography>
            {`더 편리해진 나랑고를 만나기 위해서
           최신 버전으로 앱을 업데이트 해주세요.`}
          </Typography>
        </TitleWrapper>
        <ButtonWrapper>
          <Button
            onClick={() => {
              if (window.platform === 'ios') {
                // 앱 스토어 열기
              } else {
                sendMessageToDevice(
                  WEBVIEW_MESSAGE_TYPE.APP_VERSION_UPDATE,
                  'https://play.google.com/store/apps/details?id=com.ndream.nrg2'
                );
              }
            }}
          >
            업데이트하기
          </Button>
          <Button
            onClick={() => {
              sendMessageToDevice(WEBVIEW_MESSAGE_TYPE.EXIT_APP, 'true');
            }}
          >
            앱 종료
          </Button>
        </ButtonWrapper>
      </ContentsWrapper>
    </Wrapper>
  );
};

export default AppUpdate;

const Wrapper = styled(Stack)(() => ({
  height: '100vh'
}));

const ContentsWrapper = styled(Stack)(() => ({
  padding: '10rem 1rem'
}));

const LogoBox = styled(Stack)(() => ({
  position: 'relative',
  margin: 'auto',
  width: '70%',
  height: '70px'
}));

const ImageBox = styled(Stack)(() => ({
  position: 'relative',
  margin: '3rem auto',
  marginTop: '5rem',
  width: '70%',
  height: '70px'
}));

const TitleWrapper = styled(Stack)(() => ({
  alignSelf: 'center',
  textAlign: 'center',
  gap: '10px',

  '& > h5': {
    fontWeight: 'bold',
    fontSize: '20px'
  },

  '& > p': {
    whiteSpace: 'pre-line',
    color: '#868686',
    fontSize: '14px'
  }
}));

const ButtonWrapper = styled(Stack)(() => ({
  margin: '3rem auto',
  width: '70%',
  gap: '1rem',

  'button': {
    width: '100%',
    height: '50px',
    borderRadius: '10px',
    backgroundColor: '#736dee !important',
    fontSize: '16px'
  },

  'button:nth-of-type(2)': {
    color: '#868686',
    backgroundColor: '#E9E9E9 !important'
  }
}));
