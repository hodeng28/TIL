import { Button, IconButton, Stack, Typography, styled } from '@mui/material';
import Image from 'next/image';
import { BaseModal } from '@naranggo/storybook';
import { useEffect, useState } from 'react';
import { termsOfServiceModalAtom } from '@/atoms/ModalAtom';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import router from 'next/router';
import useSocialLogin from '@/hooks/useSocialLogin';
import { isLinkedAppleAtom, isLinkedGooleAtom } from '@/atoms/isLinkedAtom';
import withAuth from '@/components/withAuth';
import { isLoggedInAtom, loginRoutingAtom } from '@/atoms/webLoginAtom';

const LoginPage = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState('');
  const [isTermsModalOpen, setIsTermsModalOpen] = useAtom(
    termsOfServiceModalAtom
  );
  const setIsLinkedGoole = useSetAtom(isLinkedGooleAtom);
  const setIsLinkedApple = useSetAtom(isLinkedAppleAtom);
  const { signinGoogle, signinApple } = useSocialLogin();
  const loginRouting = useAtomValue(loginRoutingAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const handleLinkGooleAccount = () => {
    setIsLinkedGoole(true);
    signinGoogle();
  };

  const handleLinkAppleAccount = () => {
    setIsLinkedApple(true);
    signinApple();
  };

  useEffect(() => {
    if (isLoggedIn && !loginRouting.routingPage) {
      router.replace('/');
    }
  }, [isLoggedIn, loginRouting.routingPage]);

  return (
    <Wrapper>
      <ButtonWrapper direction="row">
        <IconButton
          onClick={() => {
            router.back();
          }}
        >
          <Image
            src="/images/back_arrow.svg"
            alt="back_arrow"
            layout="fixed"
            width={33}
            height={33}
          />
        </IconButton>
        <IconButton
          onClick={() => {
            router.push('/');
          }}
        >
          <Image
            src="/images/story_home_bk.png"
            alt="story_home"
            layout="fixed"
            width={49}
            height={49}
          />
        </IconButton>
      </ButtonWrapper>
      <Stack>
        <LogoBox>
          <Image
            src="/images/narango_logo.svg"
            alt="naranggo_logo"
            layout="fill"
            objectFit="contain"
          />
        </LogoBox>
        <TitleWrapper>
          <Typography>로그인이 필요한 서비스입니다.</Typography>
          <Typography>아래 서비스 계정으로 로그인하세요.</Typography>
        </TitleWrapper>
      </Stack>

      <Stack>
        <AccountArea>
          <AccountButton onClick={handleLinkGooleAccount}>
            <Image
              src="/images/google_off.svg"
              alt="google_off"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
              priority
            />
          </AccountButton>
          <AccountButton onClick={handleLinkAppleAccount}>
            <Image
              src="/images/apple_off.svg"
              alt="apple_off"
              layout="fill"
              objectFit="contain"
              objectPosition="center"
            />
          </AccountButton>
        </AccountArea>
      </Stack>

      <AppLinkArea>
        <Typography>또는 앱을 다운로드하세요!</Typography>
        <AppLinkWrapper direction="row">
          <AppLinkButton sx={{ width: '160px' }}>
            <a
              target="_blank"
              href="https://play.google.com/store/search?q=%EB%82%98%EB%9E%91%EA%B3%A0&c=apps"
              rel="noreferrer"
            >
              <Image
                src="/images/google_play.svg"
                alt="naranggo_maintop"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </a>
          </AppLinkButton>
          {/* <AppLinkButton sx={{ width: '150px' }}>
              <a target="_blank" href="" rel="noreferrer">
                <Image
                  src="/images/app_store.svg"
                  alt="naranggo_maintop"
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                />
              </a>
            </AppLinkButton> */}
        </AppLinkWrapper>
      </AppLinkArea>

      <TermsWrapper direction="row">
        <Button
          onClick={() => {
            setIsInfoModalOpen('https://www.ndream.com/provision.html');
            setIsTermsModalOpen(true);
          }}
        >
          <Typography>이용약관</Typography>
        </Button>
        <Button
          onClick={() => {
            setIsInfoModalOpen('https://www.ndream.com/privacy.html');
            setIsTermsModalOpen(true);
          }}
        >
          <Typography>개인정보 처리방침</Typography>
        </Button>
      </TermsWrapper>

      <BaseModal
        isUsedInMyPage={true}
        isModalOpen={isTermsModalOpen && !!isInfoModalOpen.length}
        onCloseModal={() => {
          setIsInfoModalOpen('');
        }}
        sx={{
          '& template': {
            width: '90% !important',
            maxWidth: 'calc(470px - 3rem)',
            minWidth: 'calc(360px - 3rem)'
          }
        }}
      >
        {<iframe style={{ height: '60vh' }} src={isInfoModalOpen}></iframe>}
      </BaseModal>
    </Wrapper>
  );
};

export default withAuth(LoginPage);

const Wrapper = styled(Stack)(() => ({
  height: '100vh'
}));

const ButtonWrapper = styled(Stack)(() => ({
  padding: '2rem 0.5rem',
  gap: '0.5rem',

  '& button:nth-of-type(1)': {
    width: '40px'
  },

  '& button:nth-of-type(2)': {
    padding: 0
  }
}));

const LogoBox = styled(Stack)(() => ({
  margin: 'auto',
  width: '50%',
  height: '65px',
  position: 'relative'
}));

const TitleWrapper = styled(Stack)(() => ({
  alignSelf: 'center',
  textAlign: 'center',
  gap: '10px',
  paddingTop: '5rem',
  paddingBottom: '3rem',

  '& p': {
    fontWeight: 'bold',
    fontSize: '26px'
  },

  '& > p:nth-of-type(2)': {
    fontWeight: '400',
    fontSize: '18px'
  }
}));

const AccountArea = styled(Stack)(() => ({
  justifyContent: 'space-between',
  height: '100%',
  marginBottom: '10rem'
}));

const AccountButton = styled(Button)(() => ({
  margin: '0.7rem auto',
  padding: 0,
  width: '75%',
  height: '3rem'
}));

const AppLinkArea = styled(Stack)(() => ({
  textAlign: 'center',
  alignItems: 'center',
  marginBottom: '10rem',

  '& p': {
    fontSize: '18px'
  }
}));

const AppLinkWrapper = styled(Stack)(() => ({
  // justifyContent: 'space-between',
  justifyContent: 'center',
  padding: '1rem 0',
  width: '70%'
}));

const AppLinkButton = styled(Stack)(() => ({
  '&>a': {
    height: '50px',
    position: 'relative'
  }
}));

const TermsWrapper = styled(Stack)(() => ({
  textAlign: 'center',
  justifyContent: 'center',
  gap: '2rem',

  '& p': {
    color: '#868686'
  }
}));
