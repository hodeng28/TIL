import { linkAccount, loginNRG } from '@/api/login';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import { AxiosError } from 'axios';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import modalInformationAtom from '@/atoms/modalInformationAtom';
import { getCookie } from '@/utils/cookie';
import produce from 'immer';
import router from 'next/router';
import { setSocialInfo } from '@/utils/cookie';
import { visitedPageInformationAtom } from '@/atoms/visitedPageInformationAtom';
import { isLoggedInAtom, loginRoutingAtom } from '@/atoms/webLoginAtom';

const useWebAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [loginProfile, setLoginProfile] = useAtom(loginProfileAtom);
  const setModalInformation = useSetAtom(modalInformationAtom);
  const [loginRouting, setLoginRouting] = useAtom(loginRoutingAtom);
  const [visitedPageInformation, setVisitedPageInformation] = useAtom(
    visitedPageInformationAtom
  );

  const {
    mutate: signInNRG,
    isLoading,
    isError,
    error,
    isSuccess,
    isIdle
  } = useMutation<ApiResponse<LoginProfile>, AxiosError, LoginParams>(
    loginNRG,
    {
      onSuccess: (response) => {
        const socialInfo = getCookie('socialLoginPreviousInfo');
        window.sessionStorage.setItem('tryCreateAccount', '');

        if (response.returnValue === -4) {
          router.replace('/account/create');
          window.sessionStorage.setItem('tryCreateAccount', 'true');
          window.localStorage.setItem('isCheckTerms', 'false');
          return;
        }

        setIsLoggedIn(true);

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

        if (socialInfo) {
          setSocialInfo({
            name: 'socialLoginInfo',
            division: socialInfo.division,
            idaccount: socialInfo.idaccount
          });

          setSocialInfo({
            name: 'socialLoginPreviousInfo',
            division: socialInfo.division,
            idaccount: socialInfo.idaccount,
            expires: '0'
          });
        }

        if (loginRouting.routingPage) {
          if (loginRouting.storyListActiveTab) {
            const nextState = produce(visitedPageInformation, (draft) => {
              if (!draft.STORY_LIST['/story']) {
                return;
              }

              draft.STORY_LIST['/story'].activeTab =
                loginRouting.storyListActiveTab;
            });

            setVisitedPageInformation(nextState);
          }

          router.replace(loginRouting.routingPage);
        }

        setLoginRouting({
          ...loginRouting,
          status: 'none'
        });
      },
      onError: (err) => {
        console.log(err);
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

      const socialLoginPreviousInfo = getCookie('socialLoginPreviousInfo');

      if (response.returnValue === 2) {
        // response.data.nickname
        // "returnValue가 2일경우 이미 해당 계정과 연동 된
        // 유저가 있다는 의미이므로 확인을 누를 시 연동을 시도한 계정으로 로그인을 해야합니다.
        // 취소: 계정 연동을 시도한 정보를 초기화 시키고 다시 로그인
        // 확인: 계정 연동을 시도한 정보로 다시 로그인
        setModalInformation({
          type: 'LINK_ACCOUNT',
          nickname: response.data.nickname,
          handleClickLeftBtn: () => {
            // 연동한 계정으로 로그인을 하지 않게다라는 의미라 쿠키 상태를 이전 값으로 돌려놔야함
            setSocialInfo({
              name: 'socialLoginPreviousInfo',
              division: socialLoginPreviousInfo.division,
              idaccount: socialLoginPreviousInfo.idaccount,
              expires: '0'
            });
            setLoginRouting({
              routingPage: '',
              storyListActiveTab: 0,
              status: 'none'
            });
          },
          handleClickRightBtn: () => {
            signInNRG({
              division: socialLoginPreviousInfo?.division,
              udid: '',
              idaccount: socialLoginPreviousInfo?.idaccount,
              fcmtoken: ''
            });
            setLoginRouting({
              routingPage: '',
              storyListActiveTab: 0,
              status: 'login'
            });
          }
        });

        return;
      }

      signInNRG({
        division: socialLoginPreviousInfo.division,
        udid: '',
        idaccount: socialLoginPreviousInfo.idaccount || '',
        fcmtoken: ''
      });
    },
    onError: () => {
      // signOut();
    }
  });

  useEffect(() => {
    if (window.isWebViewAccess) return;

    const socialLoginPreviousInfo = getCookie('socialLoginPreviousInfo');
    const socialLoginInfo = getCookie('socialLoginInfo');

    if (!socialLoginPreviousInfo && !socialLoginInfo) {
      return setIsLoggedIn(false);
    }

    if (!isLoggedIn) {
      signInNRG({
        division:
          socialLoginPreviousInfo?.division || socialLoginInfo?.division,
        udid: '',
        idaccount:
          socialLoginPreviousInfo?.idaccount || socialLoginInfo?.idaccount,
        fcmtoken: ''
      });
    }

    if (
      window.sessionStorage.getItem('tryAccountLink') &&
      socialLoginPreviousInfo
    ) {
      const accessInfoJSONString = window.sessionStorage.getItem('accessInfo');

      if (!accessInfoJSONString) {
        // 계정 연동을 시도 했는데 accessToken 정보가 없는 사람
        // 웹에서 연동 후 다른 창에서 진입했을 때
        window.sessionStorage.setItem('tryAccountLink', '');
        alert('다시 시도 하세요');
        return;
      }

      const accessInfo = JSON.parse(accessInfoJSONString);

      accountlink({
        platform_type: socialLoginPreviousInfo.division,
        idaccount: socialLoginPreviousInfo.idaccount,
        accesstoken: accessInfo.accessToken,
        accessId: accessInfo.iduser
      });
    }
  }, [accountlink, isLoggedIn, loginRouting.status, setIsLoggedIn, signInNRG]);

  return {
    loginProfile,
    isLoading,
    isError,
    error,
    isSuccess,
    isIdle,
    signInNRG
    // confirmAccountLink,
    // guestLogin,
  };
};

export default useWebAuth;
