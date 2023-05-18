import { useAtom, useAtomValue } from 'jotai';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppState, Platform } from 'react-native';
import {
  check,
  checkMultiple,
  PERMISSIONS,
  request,
  openSettings
} from 'react-native-permissions';
import DeviceInfo from 'react-native-device-info';
import isPossibleToSendCityHallCoordinateToWebAtom from '../atoms/isPossibleToSendCityHallCoordinateToWebAtom';
import useSendMessageToWeb, {
  APP_TO_WEB_MESSAGE_TYPES
} from './useSendMessageToWeb';
import GeoLocation from 'react-native-geolocation-service';
import { CITYHALL_COORDINATE } from './useLocation';
import isMainPageAccessedAtom from '../atoms/isMainPageAccessedAtom';

export type PermissionStatus =
  | 'blocked' // 권한 승인 거부되었으며, 권한 승인 재요청도 불가함
  | 'denied' // 권한 요청된적도 없거나, 권한 승인이 거절됐지만 재요청이 가능함
  | 'granted' // 권한 승인
  | 'unavailable' // 기능 지원되지 않음 (일정상 고려 못함)
  | 'limited'; // 권한을 제한적으로 승인 (일정상 고려 못함)

type PermissionType = 'ALBUM' | 'LOCATION';

interface Body {
  permissionType: PermissionType;
  isRouteSettings?: boolean;
  isMainPageRequest?: boolean;
}

const permissionInformation = {
  'ALBUM': PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
  'LOCATION': PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
};

const usePermission = ({ webViewRef, isWebLoad }) => {
  const appState = useRef(AppState.currentState);
  const [permissionStatus, setPermissionStatus] = useState<{
    [data in PermissionType]: PermissionStatus;
  }>();
  const [
    isPossibleToSendCityHallCoordinateToWeb,
    setisPossibleToSendCityHallCoordinateToWeb
  ] = useAtom(isPossibleToSendCityHallCoordinateToWebAtom);
  const sendMessageToWeb = useSendMessageToWeb(webViewRef, isWebLoad);
  const isMainPageAccessed = useAtomValue(isMainPageAccessedAtom)

  const handlePermissionReqeust = async (
    { permissionType, isRouteSettings, isMainPageRequest }: Body,
    sendMessageToWeb
  ) => {
    if (isRouteSettings) {
      openSettings();
      return;
    }

    if (Platform.OS === 'android') {
      // 안드로이드 버전별로 혹은 기기별로 권한 요청 플로우 및 권한 요청 다이얼로그가 다름
      // 그래서 최대한 방어 코드를 많이 배치해놓음
      if (permissionType === 'LOCATION') {
        const res = await checkMultiple([
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
        ]);

        // COARSE_LOCATION이 허용되고, FINE_LOCATION이 허용되지 않은 경우
        if (
          combineTwoLocationPermissionStatuses(
            res[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
            res[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]
          ) === 'granted'
        ) {
          return;
        }

        request(permissionInformation[permissionType]).then(async (result) => {
          const res = await check(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);

          if (
            isMainPageRequest &&
            Platform.OS === 'android' &&
            combineTwoLocationPermissionStatuses(result, res) === 'granted'
          ) {
            DeviceInfo.getAvailableLocationProviders().then((status) => {
              const { gps } = status;

              if (!gps) {
                sendMessageToWeb(
                  APP_TO_WEB_MESSAGE_TYPES.ANDROID_MAIN_PAGE_GPS_SETTINGS,
                  true
                );
              }
            });
          }

          setPermissionStatus({
            ...permissionStatus,
            [permissionType]: combineTwoLocationPermissionStatuses(result, res)
          });
          if (!isPossibleToSendCityHallCoordinateToWeb) {
            setisPossibleToSendCityHallCoordinateToWeb(true);
          }
        });
      } else {
        request(permissionInformation[permissionType]).then((result) => {
          setPermissionStatus({
            ...permissionStatus,
            [permissionType]: result
          });
        });
      }
    } else {
      if (permissionType === 'LOCATION') {
        request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
          setPermissionStatus({
            ...permissionStatus,
            [permissionType]: result
          });

          if (!isPossibleToSendCityHallCoordinateToWeb) {
            setisPossibleToSendCityHallCoordinateToWeb(true);
          }
        });
      } else {
        request(PERMISSIONS.IOS.PHOTO_LIBRARY).then((result) => {
          setPermissionStatus({
            ...permissionStatus,
            [permissionType]: result[PERMISSIONS.IOS.PHOTO_LIBRARY]
          });
        });
      }
    }
  };

  const checkPermissionStatuses = () => {
    if (Platform.OS === 'android') {
      checkMultiple([
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION
      ]).then((statuses) => {
        setPermissionStatus({
          ALBUM: statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE],
          LOCATION: combineTwoLocationPermissionStatuses(
            statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION],
            statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION]
          )
        });
      });
    } else {
      checkMultiple([
        PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        PERMISSIONS.IOS.PHOTO_LIBRARY
      ]).then((statuses) => {
        setPermissionStatus({
          ALBUM: statuses[PERMISSIONS.IOS.PHOTO_LIBRARY],
          LOCATION: statuses[PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]
        });
      });
    }
  };

  const [isGPSEnabled, setIsGPSEnabled] = useState<boolean>();

  const checkGPSInIOS = useCallback(() => {
    if (Platform.OS === 'ios' && isMainPageAccessed) {
      DeviceInfo.getAvailableLocationProviders().then((status) => {
        const newIsGPSEnabled = status.locationServicesEnabled;

        if (newIsGPSEnabled !== isGPSEnabled) {
          setIsGPSEnabled(newIsGPSEnabled);
        }

        if (newIsGPSEnabled !== isGPSEnabled && newIsGPSEnabled === true) {
          request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
            setPermissionStatus({
              ...permissionStatus,
              LOCATION: result
            });

            if (result === 'granted') {
              GeoLocation.getCurrentPosition(
                ({ coords }) => {
                  const { latitude: lat, longitude: lng } = coords;

                  sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.USER_LOCATION, {
                    location: {
                      lat,
                      lng
                    },
                    isGPSEnabled: newIsGPSEnabled
                  });
                },
                ({ code }) => {
                  alert(`위치 정보를 가져올 수 없습니다. errorCode: ${code}`);
                  sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.USER_LOCATION, {
                    location: CITYHALL_COORDINATE,
                    isGPSEnabled: newIsGPSEnabled
                  });
                }
              );
            }

            if (result === 'blocked' || result === 'denied') {
              sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.USER_LOCATION, {
                location: CITYHALL_COORDINATE,
                isGPSEnabled: newIsGPSEnabled
              });
            }
          });
        }
      });
    }
  }, [isGPSEnabled, isMainPageAccessed, permissionStatus, sendMessageToWeb]);

  useEffect(() => {
    if(Platform.OS === 'ios') {
      DeviceInfo.getAvailableLocationProviders().then((status) => {
        if (
          !status.locationServicesEnabled ||
          !permissionStatus ||
          permissionStatus.LOCATION === 'denied' ||
          permissionStatus.LOCATION === 'blocked'
        ) {
          sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.USER_LOCATION, {
            location: CITYHALL_COORDINATE,
            isGPSEnabled: status.locationServicesEnabled
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
          sendMessageToWeb(APP_TO_WEB_MESSAGE_TYPES.USER_LOCATION, {
            location: CITYHALL_COORDINATE,
            isGPSEnabled: undefined
          });
        };

        if(isMainPageAccessed) {
          GeoLocation.getCurrentPosition(successCallback, errorCallback);
        }
      });
    }
  }, [permissionStatus, isMainPageAccessed, sendMessageToWeb]);

  useEffect(() => {
    checkPermissionStatuses();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async (nextAppState) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          await checkPermissionStatuses();
          await checkGPSInIOS();
        }

        appState.current = nextAppState;
      }
    );

    return () => subscription.remove();
  }, [checkGPSInIOS]);

  return { permissionStatus, handlePermissionReqeust };
};

export default usePermission;

const combineTwoLocationPermissionStatuses = (
  FINE_LOCATION_PERMISSION_STATUS,
  COARSE_LOCATION_PERMISSION_STATUS
) => {
  if (
    COARSE_LOCATION_PERMISSION_STATUS === 'granted' ||
    FINE_LOCATION_PERMISSION_STATUS === 'granted'
  ) {
    return 'granted';
  }

  if (
    COARSE_LOCATION_PERMISSION_STATUS !== 'granted' &&
    FINE_LOCATION_PERMISSION_STATUS !== 'granted'
  ) {
    if (FINE_LOCATION_PERMISSION_STATUS === 'blocked') {
      return 'blocked';
    }

    return 'denied';
  }
};
