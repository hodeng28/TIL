import Terms from '@/components/Terms/Terms';
import { accountCreate } from '@/api/login';
import { useMutation } from 'react-query';
import { getCookie, setSocialInfo } from '@/utils/cookie';
import { useAtom, useAtomValue } from 'jotai';
import md5 from 'md5';
import withAuth from '@/components/withAuth';
import { useEffect, useState } from 'react';
import router from 'next/router';
import { isLoggedInAtom, loginRoutingAtom } from '@/atoms/webLoginAtom';

const CreateAccountPage: NextPageWithLayout = () => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const [loginRouting, setLoginRouting] = useAtom(loginRoutingAtom);
  const [showTerms, setShowTerms] = useState(true);
  const socialInfo = getCookie('socialLoginPreviousInfo');

  const { mutate: createAccount } = useMutation(accountCreate, {
    onSuccess: () => {
      window.localStorage.setItem('isCheckTerms', 'true');
      setShowTerms(false);
      setLoginRouting({ ...loginRouting, status: 'login' });
    }
  });

  window.onpopstate = () => {
    socialInfo && removeCookie();
  };
  window.onbeforeunload = () => {
    socialInfo && removeCookie();
  };

  const removeCookie = () => {
    window.sessionStorage.setItem('tryCreateAccount', '');
    setSocialInfo({
      name: 'socialLoginPreviousInfo',
      division: socialInfo.division,
      idaccount: socialInfo.idaccount,
      expires: '0'
    });
    setLoginRouting({
      ...loginRouting,
      status: 'none'
    });
  };

  const handleClickFinishTerms = () => {
    if (socialInfo) {
      // unixtimestamp: 1970년 1월 1일 00:00:00 협정 세계시(UTC) 부터 경과 시간을 초로 환산하여 정수로 나타낸 것
      const timestamp = Math.floor(new Date().getTime() / 1000).toString();
      // saltkey: 서버와 약속한 값
      const saltkey = 'oE7U6O5g0IBr0NMT';

      // "핑거 프린트 (위변조 검증용)
      // platform_type + idaccount + tp+ saltkey
      // 인자 값을 위 순서대로 연결하여 문자열을 만든 후 md5로 해쉬 한값"
      const accountHash =
        socialInfo.division + socialInfo.idaccount + timestamp + saltkey;
      const fp = md5(accountHash);

      createAccount({
        platform_type: socialInfo.division,
        idaccount: socialInfo.idaccount,
        tp: timestamp,
        fp: fp
      });
    }
  };

  useEffect(() => {
    if (isLoggedIn || !window.sessionStorage.getItem('tryCreateAccount')) {
      router.replace('/');
    }
  }, [isLoggedIn]);

  return (
    <Terms
      onClickFinishTerms={handleClickFinishTerms}
      setShowTerms={setShowTerms}
    />
  );
};

export default withAuth(CreateAccountPage);
