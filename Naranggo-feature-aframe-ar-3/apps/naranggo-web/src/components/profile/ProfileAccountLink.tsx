import {
  Stack,
  styled,
  FormLabel,
  Typography,
  Switch,
  FormControlLabel,
  Box,
  Button,
  Divider
} from '@mui/material';
import theme from '@/utils/theme';
import router from 'next/router';
import useSocialLogin from '@/hooks/useSocialLogin';
import { useMutation } from 'react-query';
import { loginNRG, unLinkAccount, accountWithdraw } from '@/api/login';
import { useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import loginProfileAtom, {
  initialLoginProfile
} from '@/atoms/loginProfileAtom';
import Logout from '@/components/profile/Logout';
import fcmAtom from '@/atoms/fcmAtom';
import uuidAtom from '@/atoms/uuidAtom';
import Image from 'next/image';
import socialLoginAtom, { LoginTypeEnum } from '@/atoms/socialLoginProfile';
import { WEBVIEW_MESSAGE_TYPE } from '@naranggo/shared';
import { sendMessageToDevice } from '@/utils/helpers';
import { isLinkedGooleAtom, isLinkedAppleAtom } from '@/atoms/isLinkedAtom';
import modalInformationAtom from '@/atoms/modalInformationAtom';
import { setSocialInfo, getCookie } from '@/utils/cookie';
import { isLoggedInAtom, loginRoutingAtom } from '@/atoms/webLoginAtom';

const ProfileAccountLink = () => {
  const { signinGoogle, signout, signinApple } = useSocialLogin();
  const { socialId, division } = useAtomValue(socialLoginAtom);

  const fcmToken = useAtomValue(fcmAtom);
  const uuid = useAtomValue(uuidAtom);
  const [loginProfile, setLoginProfile] = useAtom(loginProfileAtom);
  const [isLinkedGoole, setIsLinkedGoole] = useAtom(isLinkedGooleAtom);
  const [isLinkedApple, setIsLinkedApple] = useAtom(isLinkedAppleAtom);
  const setSocialLogin = useSetAtom(socialLoginAtom);
  const accountinfo = JSON.parse(loginProfile.accountinfo.toString());
  const setModalInformation = useSetAtom(modalInformationAtom);
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [loginRouting, setLoginRouting] = useAtom(loginRoutingAtom);

  const { mutate: withdraw } = useMutation(accountWithdraw, {
    onSuccess: () => {
      window.isWebViewAccess ? handleLogoutApp() : handleLogoutWeb();
      router.replace('/account/withdraw');
    }
  });

  const { mutate: signInNRG } = useMutation(loginNRG, {
    onSuccess: (response: ApiResponse<LoginProfile>) => {
      setLoginProfile({
        ...response.data,
        accesstoken: encodeURIComponent(response.data.accesstoken)
      });
    }
  });

  const { mutate: accountUnLink } = useMutation(unLinkAccount, {
    onSuccess: (response: ApiResponse<AccountUnLinkResponse>) => {
      const { accountinfo, lastlinkaccountinfo } = response.data;

      setLoginProfile({
        ...loginProfile,
        accountinfo: accountinfo
      });

      if (window.isWebViewAccess) {
        setSocialLogin({
          division: lastlinkaccountinfo.division,
          socialId: lastlinkaccountinfo.idaccount,
          status: 'complete'
        });
      } else {
        setSocialInfo({
          name: 'socialLoginInfo',
          division: lastlinkaccountinfo.division,
          idaccount: lastlinkaccountinfo.idaccount
        });
      }

      signInNRG({
        division: lastlinkaccountinfo.division,
        udid: uuid || '',
        idaccount: lastlinkaccountinfo.idaccount,
        fcmtoken: fcmToken || ''
      });
    },
    onError: (err) => {
      console.log(err);
    }
  });

  useEffect(() => {
    if (!!socialId && !loginProfile.accesstoken) {
      signInNRG({
        division,
        udid: uuid,
        idaccount: socialId,
        fcmtoken: fcmToken || ''
      });
    }
  }, [division, fcmToken, loginProfile.accesstoken, signInNRG, socialId, uuid]);

  useEffect(() => {
    if (
      loginProfile.accountinfo.includes(2) &&
      loginProfile.accountinfo.includes(4)
    ) {
      setIsLinkedApple(true);
      setIsLinkedGoole(true);

      return;
    }

    if (loginProfile.accountinfo.includes(2)) {
      setIsLinkedGoole(true);
    } else {
      setIsLinkedGoole(false);
    }

    if (loginProfile.accountinfo.includes(4)) {
      setIsLinkedApple(true);
    } else {
      setIsLinkedApple(false);
    }

    // if (
    //   division === LoginTypeEnum.Facebook ||
    //   loginProfile.accountinfo.includes(1)
    // ) {
    //   setFacebookCheck(true);
    // }
  }, [
    accountinfo.length,
    division,
    loginProfile.accountinfo,
    setIsLinkedApple,
    setIsLinkedGoole
  ]);

  const handleLinkGooleAccount = () => {
    if (!isLinkedGoole) {
      window.sessionStorage.setItem('tryAccountLink', 'true');
      signinGoogle(window.location.pathname);
    } else if (accountinfo.length < 2) {
      setModalInformation({ type: 'UNLINK_ACCOUNT' });
      return;
    } else if (isLinkedApple) {
      accountUnLink({
        platform_type: LoginTypeEnum.Google,
        accesstoken: loginProfile.accesstoken,
        accessId: loginProfile.iduser
      });
    }
  };

  const handleLinkAppleAccount = () => {
    if (!isLinkedApple) {
      window.sessionStorage.setItem('tryAccountLink', 'true');
      signinApple(window.location.pathname);
    } else if (accountinfo.length < 2) {
      setModalInformation({ type: 'UNLINK_ACCOUNT' });
      return;
    } else if (isLinkedApple) {
      accountUnLink({
        platform_type: LoginTypeEnum.Apple,
        accesstoken: loginProfile.accesstoken,
        accessId: loginProfile.iduser
      });
    }
  };

  const handleLogoutWeb = () => {
    if (loginProfile.accountinfo) {
      const socialInfo = getCookie('socialLoginInfo');
      window.sessionStorage.setItem('accessInfo', '');

      setSocialInfo({
        name: 'socialLoginInfo',
        division: socialInfo.division,
        idaccount: socialInfo.idaccount,
        expires: '0'
      });

      setLoginRouting({
        routingPage: '',
        storyListActiveTab: 0,
        status: 'none'
      });
      setLoginProfile(initialLoginProfile);
      setIsLoggedIn(false);
    }
  };

  const handleLogoutApp = () => {
    if (loginProfile.accountinfo) {
      if (loginProfile.accountinfo.includes(2)) {
        sendMessageToDevice(WEBVIEW_MESSAGE_TYPE.SIGNOUT_GOOGLE, true);
      }

      setSocialLogin({
        division: LoginTypeEnum.Guest,
        socialId: '',
        status: 'none'
      });

      setLoginProfile({
        ...loginProfile,
        accesstoken: ''
      });
    }
  };

  return (
    <Wrapper>
      <>
        <TextFormLabel id="userinfo">계정 연동</TextFormLabel>
        <AccountArea>
          <SwitchControl
            control={
              <AccountLinkSwitch
                checked={isLinkedGoole}
                onChange={handleLinkGooleAccount}
              />
            }
            label={
              <AccountLabelText direction="row">
                <Image
                  priority
                  src="/images/icon_google.svg"
                  alt="google_icon"
                  layout="fixed"
                  width={30}
                  height={30}
                />
                <Typography>Google 계정 연동</Typography>
              </AccountLabelText>
            }
            labelPlacement="start"
          />
          <SwitchControl
            control={
              <AccountLinkSwitch
                checked={isLinkedApple}
                onChange={handleLinkAppleAccount}
              />
            }
            label={
              <AccountLabelText direction="row">
                <Image
                  priority
                  src="/images/icon_apple.svg"
                  alt="apple_icon"
                  layout="fixed"
                  width={30}
                  height={30}
                />
                <Typography>Apple 계정 연동</Typography>
              </AccountLabelText>
            }
            labelPlacement="start"
          />
        </AccountArea>
      </>

      {isLinkedGoole || isLinkedApple ? (
        <Logout
          onClick={() => {
            setIsLinkedApple(false);
            setIsLinkedGoole(false);
            if (window.isWebViewAccess) {
              handleLogoutApp();
            } else {
              handleLogoutWeb();
              router.push('/');
            }
          }}
        />
      ) : (
        <></>
      )}
      <Box sx={{ marginTop: '3rem' }}>
        <Divider sx={{ borderColor: 'rgba(0, 0, 0, 0.3)' }} />
        <Button
          onClick={() => {
            setModalInformation({
              type: 'WITH_DRAW',
              handleClickRightBtn: () => {
                withdraw({
                  accessId: loginProfile.iduser,
                  accesstoken: loginProfile.accesstoken
                });
              }
            });
          }}
        >
          <Typography>나랑고 탈퇴</Typography>
        </Button>
      </Box>
    </Wrapper>
  );
};

export default ProfileAccountLink;

const Wrapper = styled(Stack)(() => ({
  gap: '.625rem',
  padding: '2rem',
  backgroundColor: theme.palette.custom.light
}));

const AccountArea = styled(Stack)(() => ({
  justifyContent: 'space-between',
  height: '100%'
}));

const SwitchControl = styled(FormControlLabel)(() => ({
  justifyContent: 'space-between !important',
  padding: '0 1rem',
  margin: '1rem 0'
}));

const AccountLabelText = styled(Stack)(() => ({
  alignItems: 'center',
  gap: '1rem',
  '& p': {
    color: '#000 !important'
  }
}));

const TextFormLabel = styled(FormLabel)(() => ({
  fontSize: '1rem',
  lineHeight: '20px',
  color: 'grey',
  marginBottom: '7px',
  '& .MuiFormLabel-root': {
    '&.Mui-focused': {
      color: 'black'
    }
  }
}));

const AccountLinkSwitch = styled(Switch)(({ theme }) => ({
  width: '55px',
  height: '28px',
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: '2.5px',
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(28px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode ? '#5B58AD' : '#d5d5d5',
        opacity: 1,
        border: 0
      }
    }
  },
  '& .MuiSwitch-thumb': {
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode ? '#d5d5d5' : '#5B58AD',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500
    })
  }
}));
