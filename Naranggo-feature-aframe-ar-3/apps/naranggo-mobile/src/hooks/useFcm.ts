import { useCallback, useEffect, useState } from 'react';
// import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

const useFcm = () => {
  const [latestToken, setLatestToken] = useState('');

  const requestPushMessagePermission = useCallback(async () => {
    // await에서 authorize
    try {
      const authorizationStatus = await messaging().requestPermission();

      const enabled =
        authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        if (token) {
          setLatestToken(token);
        } else {
          requestPushMessagePermission();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    // Get the device token
    requestPushMessagePermission();

    // If using other push notification providers (ie Amazon SNS, etc)
    // you may need to get the APNs token instead for iOS:
    // if(Platform.OS == 'ios') { messaging().getAPNSToken().then(token => { return saveTokenToDatabase(token); }); }

    // Listen to whether the token changes
    return messaging().onTokenRefresh((token) => {
      setLatestToken(token);
    });
  }, [requestPushMessagePermission]);

  return { fcmToken: latestToken };
};

export default useFcm;
