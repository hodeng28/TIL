import {
  GoogleSignin,
  statusCodes
} from '@react-native-google-signin/google-signin';
import { appleAuthAndroid, appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import useSendMessageToWeb, {
  APP_TO_WEB_MESSAGE_TYPES
} from './useSendMessageToWeb';
import WebView from 'react-native-webview';
import { Platform } from 'react-native';

GoogleSignin.configure({
  webClientId:
    '566611453678-0sn6tdsk6oaa4ljhecf219lic3cfpe7u.apps.googleusercontent.com' // client ID of type WEB for your server (needed to verify user ID and offline access)
});

const useSocialAuth = (ref: React.RefObject<WebView>, isWebLoad: boolean) => {
  const sendMessageToWeb = useSendMessageToWeb(ref, isWebLoad);

  const signinApple = async (currentURI: string) => {
    try {
      if(Platform.OS === 'ios') {
        
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });
        
        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

        if (credentialState === appleAuth.State.AUTHORIZED) {
          const {user} = appleAuthRequestResponse;
      
          sendMessageToWeb(
            APP_TO_WEB_MESSAGE_TYPES.SIGNIN_APPLE_COMPLETE,
            user
          );
        }
      } else {

        appleAuthAndroid.configure({
          clientId: 'com.ndream.naranggo.signinwithapple',
          redirectUri: currentURI,
          responseType: appleAuthAndroid.ResponseType.ALL,
          scope: appleAuthAndroid.Scope.ALL
        });
  
        const { id_token, nonce } = await appleAuthAndroid.signIn();
        
        const appleCredential = auth.AppleAuthProvider.credential(
          id_token,
          nonce
        );
  
        auth()
          .signInWithCredential(appleCredential)
          .then((res) => {
            sendMessageToWeb(
              APP_TO_WEB_MESSAGE_TYPES.SIGNIN_APPLE_COMPLETE,
              res.user.providerData[0].uid
            );
          });
      }
    } catch (error) {
      sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.SIGNIN_APPLE_ERROR, error);
    }
  };

  const signinGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true
      });

      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        await GoogleSignin.revokeAccess();
      }

      const userInfo = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken
      );

      // 파이어베이스에 회원정보를 넘기고 있음
      // 무엇 때문에 넘기는지 확인해봐야함
      auth().signInWithCredential(googleCredential);
      sendMessageToWeb(
        APP_TO_WEB_MESSAGE_TYPES.SIGNIN_GOOGLE_COMPLETE,
        userInfo
      );

      // this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
      sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.SIGNIN_GOOGLE_ERROR, error);
    }
  };

  const signoutGoogle = async () => {
    try {
      await GoogleSignin.signOut();
      auth().signOut(); // 잘 동작하는지 확인 필요
      sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.SIGNOUT_GOOGLE_COMPLETE, true);
    } catch (error) {
      console.error(error);
    }
  };

  // const signinFacebook = async () => {
  //   try {
  //     // Attempt login with permissions
  //     const result = await LoginManager.logInWithPermissions([
  //       'public_profile',
  //       'email'
  //     ]);

  //     sendMessageToWeb(
  //       APP_TO_WEB_MESSAGE_TYPES.SIGNIN_FACEBOOK_COMPLETE,
  //       result
  //     );

  //     if (result.isCancelled) {
  //       throw 'User cancelled the login process';
  //     }

  //     // Once signed in, get the users AccesToken
  //     const data = await AccessToken.getCurrentAccessToken();

  //     if (!data) {
  //       throw 'Something went wrong obtaining access token';
  //     }

  //     // Create a Firebase credential with the AccessToken
  //     const facebookCredential = auth.FacebookAuthProvider.credential(
  //       data.accessToken
  //     );

  //     // 위에서 보낸 result 또는 여기서 auth().currentUser로 정보를 가져와야함.

  //     // Sign-in the user with the credential
  //     auth().signInWithCredential(facebookCredential);
  //     // sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.SIGNIN_FACEBOOK_ERROR, error);
  //     alert(auth().currentUser);
  //   } catch (error) {
  //     sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.SIGNIN_FACEBOOK_ERROR, error);
  //   }
  // };

  // const signoutFacebook = async () => {
  //   try {
  //     auth().signOut(); // 잘 동작하는지 확인 필요
  //     sendMessageToWeb(
  //       APP_TO_WEB_MESSAGE_TYPES.SIGNOUT_FACEBOOK_COMPLETE,
  //       true
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return { signinApple, signinGoogle, signoutGoogle };
};

export default useSocialAuth;
