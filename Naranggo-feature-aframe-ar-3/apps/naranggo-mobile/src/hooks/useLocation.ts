import { useEffect } from 'react';
import GeoLocation from 'react-native-geolocation-service';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import { APP_TO_WEB_MESSAGE_TYPES } from './useSendMessageToWeb';

export const CITYHALL_COORDINATE = {
  lat: 37.56648021667982,
  lng: 126.97792745301268
};

const useLocation = (permissionStatus, sendMessageToWeb) => {
  const locationProviderStatus = DeviceInfo.getAvailableLocationProviders();

  // useEffect(() => {
  //   let timerId = null;

  //   if (Platform.OS === 'ios') {
  //     timerId = setInterval(() => {}, 3000);

  //     DeviceInfo.getAvailableLocationProviders().then((status) => {
  //       sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.USER_LOCATION, {
  //         location: CITYHALL_COORDINATE,
  //         isGPSEnabled: status.locationServicesEnabled
  //       });
  //     });
  //   }

  //   return () => {
  //     timerId && clearTimeout(timerId);
  //   };
  // }, []);

  useEffect(() => {
    let timerId = null;

    if (Platform.OS === 'android') {
      timerId = setInterval(() => {
        DeviceInfo.getAvailableLocationProviders().then((status) => {
          if (!status) {
            sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.USER_LOCATION, {
              location: CITYHALL_COORDINATE,
              isGPSEnabled: undefined
            });
            return;
          }

          if (
            !status.gps ||
            !permissionStatus ||
            permissionStatus.LOCATION === 'denied'
          ) {
            sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.USER_LOCATION, {
              location: CITYHALL_COORDINATE,
              isGPSEnabled: status.gps
            });
            return;
          }

          const successCallback = ({ coords }) => {
            const { latitude: lat, longitude: lng } = coords;

            sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.USER_LOCATION, {
              location: {
                lat,
                lng
              },
              isGPSEnabled: true
            });
            return;
          };

          const errorCallback = (error) => {
            alert(`위치 정보를 가져올 수 없습니다. errorCode: ${error.code}`);
            sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.USER_LOCATION, {
              location: CITYHALL_COORDINATE,
              isGPSEnabled: undefined
            });
          };

          GeoLocation.getCurrentPosition(successCallback, errorCallback);
        });
      }, 2500);
    }

    return () => {
      timerId && clearTimeout(timerId);
    };
  }, [permissionStatus, sendMessageToWeb, locationProviderStatus]);
};

export default useLocation;
