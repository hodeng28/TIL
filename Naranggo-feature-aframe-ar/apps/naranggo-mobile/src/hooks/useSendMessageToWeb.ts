import { useCallback } from 'react';
import WebView from 'react-native-webview';

type Body<T> = T extends typeof APP_TO_WEB_MESSAGE_TYPES['PERMISSION_CHECK']
  ? any
  : any;

// TODO: web constants.ts에도 동일하게 선언 되어 있음. 추후 monorepo를 적용해야 한 곳에서 const.ts 로 관리할 수 있을 듯
export const APP_TO_WEB_MESSAGE_TYPES = {
  USER_LOCATION: 'USER_LOCATION',
  UUID: 'UUID',
  FCM_TOKEN: 'FCM_TOKEN',
  IMAGE_PICKED: 'IMAGE_PICKED',
  PERMISSION_REQUEST: 'PERMISSION_REQUEST',
  PERMISSION_CHECK: 'PERMISSION_CHECK',
  HARDWARE_BACK_BUTTON_PRESS: 'HARDWARE_BACK_BUTTON_PRESS',
  NOTIFICATION_MESSAGE_BACKGROUND: 'NOTIFICATION_MESSAGE_BACKGROUND',
  NOTIFICATION_MESSAGE: 'NOTIFICATION_MESSAGE',
  SIGNIN_GOOGLE_COMPLETE: 'SIGNIN_GOOGLE_COMPLETE',
  SIGNOUT_GOOGLE_COMPLETE: 'SIGNOUT_GOOGLE_COMPLETE',
  SIGNIN_GOOGLE_ERROR: 'SIGNIN_GOOGLE_ERROR',
  SIGNIN_APPLE_COMPLETE: 'SIGNIN_APPLE_COMPLETE',
  SIGNIN_APPLE_ERROR: 'SIGNIN_APPLE_ERROR',
  // SIGNOUT_FACEBOOK_COMPLETE: 'SIGNOUT_FACEBOOK_COMPLETE',
  // SIGNIN_FACEBOOK_COMPLETE: 'SIGNIN_FACEBOOK_COMPLETE',
  // SIGNIN_FACEBOOK_ERROR: 'SIGNIN_FACEBOOK_ERROR',
  APP_VERSION_COAD: 'APP_VERSION_COAD',
  ANDROID_MAIN_PAGE_GPS_SETTINGS: 'ANDROID_MAIN_PAGE_GPS_SETTINGS'
} as const;

const useSendMessageToWeb = (
  ref: React.RefObject<WebView>,
  isWebLoad: boolean
) => {
  const sendToWebMessage = useCallback(
    <T extends keyof typeof APP_TO_WEB_MESSAGE_TYPES>(
      type: T,
      body: Body<T>
    ) => {
      if (ref.current && isWebLoad) {
        ref.current.postMessage(
          JSON.stringify({
            type,
            body
          })
        );
      }
    },
    [isWebLoad, ref]
  );

  return sendToWebMessage;
};
export default useSendMessageToWeb;
