import { Button, Dialog, Stack, Typography, styled } from '@mui/material';
import Image from 'next/image';
import router from 'next/router';

const InvalidAccess: NextPageWithLayout = () => {
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
            src="/images/invalid_access.png"
            alt="비정상적인 접근 이미지"
            layout="fill"
            objectFit="contain"
          />
        </ImageBox>
        <TitleWrapper>
          <Typography variant="h5">비정상적인 접근입니다.</Typography>
          <Typography>
            {`나랑고에서 제공하는 메뉴를 통해
            서비스를 이용해 주세요.`}
          </Typography>
        </TitleWrapper>
        <Confirmation
          onClick={() => {
            router.replace('/');
          }}
        >
          확인
        </Confirmation>
      </Wrapper>
    </Dialog>
  );
};

export default InvalidAccess;

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
