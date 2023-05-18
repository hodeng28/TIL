import { firebaseAuth } from '@/utils/firebaseWebClient';
import {
  GoogleAuthProvider,
  OAuthProvider,
  signOut,
  signInWithPopup
} from 'firebase/auth';
import { useAtom } from 'jotai';
import { sendMessageToDevice } from '@/utils/helpers';
import { WEBVIEW_MESSAGE_TYPE } from '@naranggo/shared';
import { LoginTypeEnum } from '@/atoms/socialLoginProfile';
import { loginRoutingAtom } from '@/atoms/webLoginAtom';
import { setSocialInfo } from '@/utils/cookie';

const useSocialLogin = () => {
  const [loginRouting, setLoginRouting] = useAtom(loginRoutingAtom);

  const signinGoogle = async (page?: string) => {
    if (window.isWebViewAccess) {
      sendMessageToDevice(WEBVIEW_MESSAGE_TYPE.SIGNIN_GOOGLE, true);
    } else {
      const provider = new GoogleAuthProvider();

      await signInWithPopup(firebaseAuth, provider)
        .then((result) => {
          setSocialInfo({
            name: 'socialLoginPreviousInfo',
            division: LoginTypeEnum.Google,
            idaccount: result.user.providerData[0].uid
          });
          setLoginRouting({
            ...loginRouting,
            routingPage: page ? page : loginRouting.routingPage,
            status: 'accountLink'
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const signinApple = async (page?: string) => {
    if (window.isWebViewAccess) {
      sendMessageToDevice(
        WEBVIEW_MESSAGE_TYPE.SIGNIN_APPLE,
        window.location.href
      );
    } else {
      const provider = new OAuthProvider('apple.com');

      await signInWithPopup(firebaseAuth, provider)
        .then((result) => {
          setSocialInfo({
            name: 'socialLoginPreviousInfo',
            division: LoginTypeEnum.Apple,
            idaccount: result.user.providerData[0].uid
          });
          setLoginRouting({
            ...loginRouting,
            routingPage: page ? page : loginRouting.routingPage,
            status: 'accountLink'
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const signout = () => {
    signOut(firebaseAuth)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { signinGoogle, signinApple, signout };
};

export default useSocialLogin;
