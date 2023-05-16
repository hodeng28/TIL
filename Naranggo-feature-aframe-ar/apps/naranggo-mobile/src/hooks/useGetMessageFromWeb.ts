import { WebViewMessageEvent } from 'react-native-webview';
import Clipboard from '@react-native-community/clipboard';
import RNExitApp from 'react-native-exit-app';
import useSendMessageToWeb, {
  APP_TO_WEB_MESSAGE_TYPES
} from './useSendMessageToWeb';
import { useEffect } from 'react';
import { BackHandler, Linking } from 'react-native';
import useSocialAuth from './useSocialAuth';
import isMainPageAccessedAtom from '../atoms/isMainPageAccessedAtom';
import { useSetAtom } from 'jotai';
// import { LoginManager, AccessToken } from 'react-native-fbsdk';

export const WEB_TO_APP_MESSAGE_TYPES = {
  COPY: 'COPY',
  IMAGE_PICKER: 'IMAGE_PICKER',
  PERMISSION_REQUEST: 'PERMISSION_REQUEST',
  PERMISSION_CHECK: 'PERMISSION_CHECK',
  SIGNIN_GOOGLE: 'SIGNIN_GOOGLE',
  SIGNIN_GOOGLE_COMPLETE: 'SIGNIN_GOOGLE_COMPLETE',
  SIGNOUT_GOOGLE: 'SIGNOUT_GOOGLE',
  SIGNIN_APPLE: 'SIGNIN_APPLE',
  SIGNIN_APPLE_COMPLETE: 'SIGNIN_APPLE_COMPLETE',
  WEB_LOAD: 'WEB_LOAD',
  EXIT_APP: 'EXIT_APP',
  ANDROID_GPS_SETTINGS: 'ANDROID_GPS_SETTINGS',
  MAIN_PAGE_ACCESS: 'MAIN_PAGE_ACCESS',
  COPY_URL: 'COPY_URL',
  APP_VERSION_UPDATE: 'APP_VERSION_UPDATE'
} as const;

interface NativeEventData {
  type: keyof typeof WEB_TO_APP_MESSAGE_TYPES;
  body: any;
}

const useGetMessageFromWeb = ({
  handlePermissionReqeust,
  webViewRef,
  setIsWebLoad,
  isWebLoad
}) => {
  const { signinApple, signinGoogle, signoutGoogle } = useSocialAuth(
    webViewRef,
    isWebLoad
  );

  const sendMessageToWeb = useSendMessageToWeb(webViewRef, isWebLoad);
  const setIsMainPageAccessed = useSetAtom(isMainPageAccessedAtom);

  const getMessageFromWeb = ({ nativeEvent }: WebViewMessageEvent) => {
    const { type, body }: NativeEventData = JSON.parse(nativeEvent.data);
    switch (type) {
      case WEB_TO_APP_MESSAGE_TYPES.WEB_LOAD:
        setIsWebLoad(true);
        break;
      case WEB_TO_APP_MESSAGE_TYPES.COPY:
        Clipboard.setString(body);
        break;
      case WEB_TO_APP_MESSAGE_TYPES.IMAGE_PICKER:
        // openPicker();
        break;
      case WEB_TO_APP_MESSAGE_TYPES.PERMISSION_REQUEST:
        handlePermissionReqeust(body, sendMessageToWeb);
        break;
      case WEB_TO_APP_MESSAGE_TYPES.SIGNIN_GOOGLE:
        signinGoogle();
        break;
      case WEB_TO_APP_MESSAGE_TYPES.SIGNIN_APPLE:
        signinApple(body);
        break;

      case WEB_TO_APP_MESSAGE_TYPES.SIGNOUT_GOOGLE:
        signoutGoogle();
        break;

      case WEB_TO_APP_MESSAGE_TYPES.EXIT_APP:
        RNExitApp.exitApp();
        break;
      case WEB_TO_APP_MESSAGE_TYPES.ANDROID_GPS_SETTINGS:
        Linking.sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
        break;
      case WEB_TO_APP_MESSAGE_TYPES.MAIN_PAGE_ACCESS:
        setIsMainPageAccessed(true);
        break;
      case WEB_TO_APP_MESSAGE_TYPES.COPY_URL:
        Clipboard.setString(body);
        break;
      case WEB_TO_APP_MESSAGE_TYPES.APP_VERSION_UPDATE:
        Linking.openURL(body);

        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handlePressHardwareBackButton = () => {
      sendMessageToWeb(
        APP_TO_WEB_MESSAGE_TYPES.HARDWARE_BACK_BUTTON_PRESS,
        true
      );

      return true;
    };

    BackHandler.addEventListener(
      'hardwareBackPress',
      handlePressHardwareBackButton
    );

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handlePressHardwareBackButton
      );
    };
  }, [sendMessageToWeb]);

  // const openPicker = async () => {
  //   MultipleImagePicker.openPicker({
  //     mediaType: 'photo'
  //   })
  //     .then(async (images: Results[]) => {
  //       const results = [];
  //       for (const realPath of images
  //         .filter((image) => !!image.realPath)
  //         .map((image) => image.realPath)) {
  //         if (realPath) {
  //           results.push(await getFileContent(realPath));
  //         }
  //       }
  //       sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.IMAGE_PICKED, results);
  //     })
  //     .catch((e: PickerErrorCode) => console.log(e));
  // };

  // const getFileContent = async (path: string) => {
  //   try {
  //     const formData = new FormData();
  //     const contents = await RNFS.readFile(path, 'base64');

  //     formData.append('image', contents);

  //     const response: Body = await fetch('https://api.imgur.com/3/image', {
  //       method: 'POST',
  //       headers: {
  //         Authorization: 'Client-ID 40f0379d3544d92',
  //         Accept: 'application/json'
  //       },
  //       body: formData
  //     });

  //     const json = await response.json();

  //     return json.data.link;
  //   } catch (e) {
  //     console.log('error');
  //   }
  // };

  return {
    sendMessageToWeb,
    getMessageFromWeb
  };
};

export default useGetMessageFromWeb;
