import { useEffect } from 'react';
import VersionCheck from 'react-native-version-check';
import { APP_TO_WEB_MESSAGE_TYPES } from './useSendMessageToWeb';
import { Platform } from 'react-native';

const useUpdate = (sendMessageToWeb) => {
  useEffect(() => {
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
      sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.APP_VERSION_COAD, {
        currentVersion: VersionCheck.getCurrentVersion(),
        currentBuildNumber: VersionCheck.getCurrentBuildNumber(),
        latestVersion: '',
        isNeeded: false,
        storeUrl: ''
      });
    } else {
      VersionCheck.needUpdate({
        packageName: 'com.ndream.nrg2'
      }).then(async ({ currentVersion, latestVersion, isNeeded, storeUrl }) => {
        if (isNeeded) {
          sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.APP_VERSION_COAD, {
            currentVersion,
            currentBuildNumber: VersionCheck.getCurrentBuildNumber(),
            latestVersion,
            isNeeded,
            storeUrl
          });
        }
      });
    }
  }, [sendMessageToWeb]);

  return;
};

export default useUpdate;
