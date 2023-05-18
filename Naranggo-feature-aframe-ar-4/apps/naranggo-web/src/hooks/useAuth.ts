import { linkAccount, loginNRG } from '@/api/login';
import loginProfileAtom, {
  initialLoginProfile
} from '@/atoms/loginProfileAtom';
import { AxiosError } from 'axios';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useLayoutEffect } from 'react';
import { useMutation } from 'react-query';
import fcmAtom from '@/atoms/fcmAtom';
import uuidAtom from '@/atoms/uuidAtom';
import socialLoginAtom, { LoginTypeEnum } from '@/atoms/socialLoginProfile';
import modalInformationAtom from '@/atoms/modalInformationAtom';

const useAuth = () => {
  const { socialId, division, status } = useAtomValue(socialLoginAtom);
  const fcmToken = useAtomValue(fcmAtom);
  const uuid = useAtomValue(uuidAtom);
  const [loginProfile, setLoginProfile] = useAtom(loginProfileAtom);
  const setModalInformation = useSetAtom(modalInformationAtom);
  const [socialLogin, setSocialLogin] = useAtom(socialLoginAtom);

  const {
    mutate: signInNRG,
    isLoading,
    isError,
    error,
    isSuccess
  } = useMutation<ApiResponse<LoginProfile>, AxiosError, LoginParams>(
    loginNRG,
    {
      onSuccess: (response) => {
        if (response.returnValue === -4) {
          setSocialLogin({
            division: LoginTypeEnum.Guest,
            socialId: '',
            status: 'none'
          });

          return;
        }

        if (
          process.env.NEXT_PUBLIC_MODE === 'development' ||
          process.env.NEXT_PUBLIC_MODE === 'preview'
        ) {
          console.log('login response: ', response, response.data);
        }

        let encodedAccessToken = 'null';

        if (
          process.env.NEXT_PUBLIC_MODE === 'development' ||
          process.env.NEXT_PUBLIC_MODE === 'preview'
        ) {
          encodedAccessToken = process.env.NEXT_PUBLIC_QA_ACCESS_TOKEN;
        } else {
          encodedAccessToken = encodeURIComponent(response.data.accesstoken);
        }

        window.sessionStorage.setItem(
          'accessInfo',
          JSON.stringify({
            accessToken: encodedAccessToken,
            iduser: response.data.iduser
          })
        );

        setLoginProfile({
          ...response.data,
          accesstoken: encodedAccessToken
        });

        window.sessionStorage.setItem('socialLoginPreviousInfo', '');

        setSocialLogin({
          ...socialLogin,
          status: socialLogin.socialId ? 'complete' : 'none'
        });
      },
      onError: () => {
        console.log('error');
      }
    }
  );

  const { mutate: accountlink } = useMutation<
    ApiResponse<AccountLinkResponse>,
    AxiosError,
    AccountLinkRequestParam & AccessInfo
  >(linkAccount, {
    onSuccess: (response) => {
      window.sessionStorage.setItem('tryAccountLink', '');

      if (response.returnValue === -100) {
        return;
      }

      const socialLoginJSONString = window.sessionStorage.getItem(
        'socialLoginPreviousInfo'
      );

      if (response.returnValue === 2 && socialLoginJSONString) {
        // response.data.nickname
        // "returnValue가 2일경우 이미 해당 계정과 연동 된
        // 유저가 있다는 의미이므로 게스트 상태를 로그아웃하고
        // 연동한 계정으로 로그인을 시켜야 합니다."
        // 클라이언트가 저장한 정보를 날려서 guest 데이터가 의미 없어지게 한후 login 재요청
        // alert 띄우고 확인 누르면 아래 로그인 그냥 진행
        // 확인 안누르면 ? division 0, uuid, idaccount :'', fcmtoken 으로 진행
        setModalInformation({
          type: 'LINK_ACCOUNT',
          nickname: response.data.nickname,
          handleClickLeftBtn: () => {
            window.sessionStorage.setItem('socialLoginPreviousInfo', '');
            setSocialLogin({
              ...socialLogin,
              status: socialLogin.socialId ? 'complete' : 'none'
            });
          },
          handleClickRightBtn: () => {
            const socialLogin = JSON.parse(socialLoginJSONString);

            setSocialLogin({
              division: socialLogin.division,
              socialId: socialLogin.socialId,
              status: 'complete'
            });
            setLoginProfile(initialLoginProfile);
          }
        });
        return;
      }

      signInNRG({
        division,
        udid: uuid,
        idaccount: socialId || '',
        fcmtoken: fcmToken || ''
      });
    },
    onError: () => {
      // signOut();
    }
  });

  useLayoutEffect(() => {
    if (!window.isWebViewAccess) return;

    if (!loginProfile.accesstoken) {
      if (uuid && fcmToken) {
        signInNRG({
          division,
          udid: uuid,
          idaccount: socialId || '',
          fcmtoken: fcmToken || ''
        });
      }
    }

    const accessInfoJSONString = window.sessionStorage.getItem('accessInfo');
    const socialLoginJSONString = window.sessionStorage.getItem(
      'socialLoginPreviousInfo'
    );

    if (
      window.sessionStorage.getItem('tryAccountLink') &&
      (socialId || socialLoginJSONString)
    ) {
      if (!accessInfoJSONString) {
        // 계정 연동을 시도 했는데 accessToken 정보가 없는 사람
        // 웹에서 연동 후 다른 창에서 진입했을 때
        window.sessionStorage.setItem('tryAccountLink', '');
        alert('다시 시도 하세요');
        return;
      }

      const accessInfo = JSON.parse(accessInfoJSONString);
      if (socialLoginJSONString) {
        const socialLogin = JSON.parse(socialLoginJSONString);

        accountlink({
          platform_type: socialLogin.division,
          idaccount: socialLogin.socialId,
          accesstoken: accessInfo.accessToken,
          accessId: accessInfo.iduser
        });

        return;
      }

      accountlink({
        platform_type: division,
        idaccount: socialId,
        accesstoken: accessInfo.accessToken,
        accessId: accessInfo.iduser
      });
    }
  }, [
    fcmToken,
    division,
    loginProfile,
    loginProfile.accesstoken,
    uuid,
    status,
    socialId,
    signInNRG,
    accountlink,
    setLoginProfile
  ]);

  return {
    loginProfile,
    isLoading,
    isError,
    error,
    isSuccess,
    signInNRG
    // confirmAccountLink,
    // guestLogin,
  };
};

export default useAuth;
