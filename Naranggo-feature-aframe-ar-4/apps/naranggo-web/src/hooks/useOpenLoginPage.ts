import { useCallback, useEffect } from 'react';
import { isLoggedInAtom, loginRoutingAtom } from '@/atoms/webLoginAtom';
import { useAtomValue, useAtom } from 'jotai';
import router from 'next/router';
import { getCookie } from '@/utils/cookie';

const useOpenLoginPage = () => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const [loginRouting, setLoginRouting] = useAtom(loginRoutingAtom);

  const handleOpenModal = useCallback(
    (url: string) => {
      if (window.isWebViewAccess || isLoggedIn) return;

      if (isLoggedINPage(url) && !getCookie('socialLoginInfo')) {
        setLoginRouting({
          ...loginRouting,
          routingPage: url,
          status: 'none'
        });
        router.push('/account/login');
      }
    },
    [isLoggedIn, loginRouting, setLoginRouting]
  );

  useEffect(() => {
    router.events.on('routeChangeComplete', handleOpenModal);

    return () => {
      router.events.on('routeChangeComplete', handleOpenModal);
    };
  }, [handleOpenModal]);

  return {};
};

export default useOpenLoginPage;

const isLoggedINPage = (url: string) => {
  return (
    url.startsWith('/mypage') ||
    url.startsWith('/story/write') ||
    url.startsWith('/following') ||
    url.startsWith('/follower') ||
    url.startsWith('/profile/block')
  );
};
