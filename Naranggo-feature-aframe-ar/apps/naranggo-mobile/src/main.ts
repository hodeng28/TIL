import { AppRegistry, Platform } from 'react-native';
import App from './app/App';
import messaging from '@react-native-firebase/messaging';
import VersionCheck from 'react-native-version-check';

// App이 Background, Quit 상태일 경우. 공식 DOCS에서 가능한한 빨리 핸들러를 세팅하라고 가이드함.
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  global.message = remoteMessage;
});

if (Platform.OS === 'ios') {
  // ios 앱스토어에 배포 이후 가능
  // VersionCheck.needUpdate({
  //   packageName: VersionCheck.getPackageName()
  // }).then(async ({ currentVersion, latestVersion, isNeeded, storeUrl }) => {
  //   if (isNeeded) {
  //     sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.APP_VERSION_COAD, {
  //       currentVersion,
  //       latestVersion,
  //       isNeeded,
  //       storeUrl
  //     });
  //   }
  // });

  // 임시로 보내기

  global.versionInfo = {
    currentVersion: VersionCheck.getCurrentVersion(),
    currentBuildNumber: VersionCheck.getCurrentBuildNumber(),
    latestVersion: '',
    isNeeded: false,
    storeUrl: ''
  };
} else {
  VersionCheck.needUpdate({
    packageName: 'com.ndream.nrg2'
  }).then(async ({ currentVersion, latestVersion, isNeeded, storeUrl }) => {
    if (isNeeded) {
      global.versionInfo = {
        currentVersion,
        currentBuildNumber: VersionCheck.getCurrentBuildNumber(),
        latestVersion,
        isNeeded,
        storeUrl
      };
    }
  });
}

AppRegistry.registerComponent('NaranggoMobile', () => App);
