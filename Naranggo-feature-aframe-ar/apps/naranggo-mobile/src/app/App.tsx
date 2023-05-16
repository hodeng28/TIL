import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import VersionCheck from 'react-native-version-check';
import WebView from 'react-native-webview';
import { SafeAreaView, Dimensions, Platform } from 'react-native';
import useFcm from '../hooks/useFcm';
import useUuid from '../hooks/useUuid';
import useLocation from '../hooks/useLocation';
import useGetMessageFromWeb from '../hooks/useGetMessageFromWeb';
import useQuitNotifictionPageRoute from '../hooks/useQuitNotifictionPageRoute';
import { APP_TO_WEB_MESSAGE_TYPES } from '../hooks/useSendMessageToWeb';
import messaging from '@react-native-firebase/messaging';
import usePermission from '../hooks/usePermission';
import DeviceInfo from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';
import useUpdate from '../hooks/useUpdate';

const App = () => {
  const [webviewURI, setWebviewURI] = useState('');
  const [onLoadWebView, setOnLoadWebView] = useState(false);
  const { notifictionPagePath } = useQuitNotifictionPageRoute();
  const uuid = useUuid();
  const { fcmToken } = useFcm();
  const webViewRef = useRef<WebView>(null);
  const [isWebLoad, setIsWebLoad] = useState(false);
  const { permissionStatus, handlePermissionReqeust } = usePermission({
    webViewRef,
    isWebLoad
  });
  const { sendMessageToWeb, getMessageFromWeb } = useGetMessageFromWeb({
    handlePermissionReqeust,
    setIsWebLoad,
    webViewRef,
    isWebLoad
  });
  const windowHeight = Dimensions.get('window').height;
  useLocation(permissionStatus, sendMessageToWeb);
  useUpdate(sendMessageToWeb);

  useLayoutEffect(() => {
    sendMessageToWeb(
      APP_TO_WEB_MESSAGE_TYPES.APP_VERSION_COAD,
      global.versionInfo
    );
  }, [sendMessageToWeb]);

  useEffect(() => {
    // setBackgroundMessageHandler로 알림을 받고 getInitialNotification로 앱 실행 시 메세지를 처리함
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          global.remoteMessage = global.message || remoteMessage;
        }
      });
  }, []);

  useEffect(() => {
    // quit
    if (global.remoteMessage && onLoadWebView) {
      sendMessageToWeb(
        APP_TO_WEB_MESSAGE_TYPES.NOTIFICATION_MESSAGE,
        global.remoteMessage
      );
    }

    // background
    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (Platform.OS === 'ios') {
        global.remoteMessage = remoteMessage;
      }
      sendMessageToWeb(
        APP_TO_WEB_MESSAGE_TYPES.NOTIFICATION_MESSAGE_BACKGROUND,
        remoteMessage
      );
    });

    // foreground
    messaging().onMessage(async (remoteMessage) => {
      sendMessageToWeb(
        APP_TO_WEB_MESSAGE_TYPES.NOTIFICATION_MESSAGE,
        remoteMessage
      );
    });
  }, [onLoadWebView, sendMessageToWeb]);

  useEffect(() => {
    if (uuid && onLoadWebView) {
      sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.UUID, uuid);
    }
    if (fcmToken && onLoadWebView) {
      sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.FCM_TOKEN, fcmToken);
    }
  }, [fcmToken, onLoadWebView, sendMessageToWeb, uuid]);

  useEffect(() => {
    if (permissionStatus && onLoadWebView) {
      sendMessageToWeb(
        APP_TO_WEB_MESSAGE_TYPES.PERMISSION_CHECK,
        permissionStatus
      );
    }
  }, [
    sendMessageToWeb,
    uuid,
    fcmToken,
    permissionStatus,
    onLoadWebView,
    webViewRef
  ]);

  useEffect(() => {
    const ms = Date.now();
    fetch(`https://resources-cf.naranggo.com/version.json?ver=${ms}`)
      .then((response) => response.json())
      .then((json) => {
        const versionCode = DeviceInfo.getReadableVersion().split('.')[3];

        if (
          !Reflect.has(json, Platform.OS.toUpperCase()) ||
          !json[Platform.OS.toUpperCase()][`${versionCode}`]
        ) {
          setWebviewURI('naranggo.vercel.app');
        } else {
          setWebviewURI(json[Platform.OS.toUpperCase()][`${versionCode}`]);
          console.log('load webview ::::::', json[`${versionCode}`]);
        }
      });
  }, []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {webviewURI && (
        <WebView
          nativeConfig={{ props: { webContentsDebuggingEnabled: true } }}
          ref={webViewRef}
          onMessage={getMessageFromWeb}
          source={{
            // uri: process.env.NX_WEB_URL
            uri: 'http://localhost:3000/'
            // uri: 'https://story.naranggo.com'
            // uri: `https://naranggo.vercel.app/${notifictionPagePath}`
            // uri: `http://10.0.2.2:3000/${notifictionPagePath}`
            // uri: `https://${webviewURI}/${notifictionPagePath}`
            // uri: `http://localhost:3000/${notifictionPagePath}`
          }}
          onLoad={() => {
            // onload가 첫 load시에 수행되지 않는 버그가 있음. onLoadEnd도 같이 사용.
            setOnLoadWebView(true);
          }}
          onLoadEnd={() => {
            setOnLoadWebView(true);
            webViewRef.current.injectJavaScript(/*javascript*/ `yarn build
            window.isWebViewAccess = true;
              window.platform = "${Platform.OS}";
            `);
          }}
          onLoadStart={() =>
            webViewRef.current.injectJavaScript(/*javascript*/ `
              window.isWebViewAccess = true;
              window.notificationPagePath = "${notifictionPagePath}";
              window.DeviceHeight = "${windowHeight}";
              window.platform = "${Platform.OS}";
              window.platformVersion = "${Platform.Version}"
            `)
          }
          hideKeyboardAccessoryView={true}
          mediaPlaybackRequiresUserAction={false}
          geolocationEnabled={true}
          javaScriptEnabled={true}
        />
      )}
    </SafeAreaView>
  );
};

export default App;
