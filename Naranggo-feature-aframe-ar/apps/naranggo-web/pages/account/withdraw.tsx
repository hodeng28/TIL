import { Button, Dialog, Stack, Typography, styled } from '@mui/material';
import Image from 'next/image';
import { sendMessageToDevice } from '@/utils/helpers';
import { WEBVIEW_MESSAGE_TYPE } from '@naranggo/shared';
import router from 'next/router';

const WithDrawPage: NextPageWithLayout = () => {
  return (
    <Dialog fullScreen open={true}>
      <Wrapper>
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
            src="/images/withdrawImage.svg"
            alt="naranggo_maintop"
            layout="fill"
            objectFit="contain"
          />
        </ImageBox>
        <TitleWrapper>
          <Typography variant="h5">회원 탈퇴</Typography>
          <Typography>
            {`나랑고 회원 탈퇴가 완료되었습니다. 
            그 동안 나랑고를 이용해 주셔서 감사합니다.`}
          </Typography>
        </TitleWrapper>
        <Confirmation
          onClick={() => {
            window.isWebViewAccess &&
              sendMessageToDevice(WEBVIEW_MESSAGE_TYPE.EXIT_APP, 'true');
            router.replace('/');
          }}
        >
          확인
        </Confirmation>
      </Wrapper>
    </Dialog>
  );
};

export default WithDrawPage;

const Wrapper = styled(Stack)(() => ({
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

const Confirmation = styled(Button)(() => ({
  margin: '3rem auto',
  width: '70%',
  height: '40px',
  borderRadius: '10px',
  backgroundColor: '#736dee !important',
  fontSize: '16px'
}));
