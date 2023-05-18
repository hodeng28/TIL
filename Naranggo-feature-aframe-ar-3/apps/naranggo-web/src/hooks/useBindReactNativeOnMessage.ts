import fcmAtom from '@/atoms/fcmAtom';
import isHardwareBackButtonTriggeredAtom from '@/atoms/isHardwareBackButtonTriggeredAtom';
import notificationIconShowAtom from '@/atoms/notificationIconShowAtom';
import permissionAtom, { AppPermission } from '@/atoms/permissionAtom';
import socialLoginAtom, { LoginTypeEnum } from '@/atoms/socialLoginProfile';
import userLocationAtom from '@/atoms/userLocationAtom';
import uuidAtom from '@/atoms/uuidAtom';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useEffect } from 'react';
import { WEBVIEW_MESSAGE_TYPE } from '@naranggo/shared';
import usePushMessageRoute from './usePushMessageRoute';
import { sendMessageToDevice } from '@/utils/helpers';
import modalInformationAtom, {
  ModalInformationAtom
} from '@/atoms/modalInformationAtom';
import menuAchorElAtom, { MenuAcholElAtomType } from '@/atoms/menuAcholElAtom';
import isBottomModalOpenAtom from '@/atoms/isBottomModalOpenAtom';
import isStoryMapExpandedAtom from '@/atoms/isStoryMapExpandedAtom';
import { useRouter } from 'next/router';
import { isLinkedGooleAtom, isLinkedAppleAtom } from '@/atoms/isLinkedAtom';
import isGPSEnabledAtom from '@/atoms/isGPSEnabledAtom';
import isUpdateAtom from '@/atoms/isUpdateAtom';

type MessageType =
  typeof WEBVIEW_MESSAGE_TYPE[keyof typeof WEBVIEW_MESSAGE_TYPE];

const useBindReactNativeOnMessage = () => {
  const { messageRoute } = usePushMessageRoute();
  const setPermission = useSetAtom(permissionAtom);
  const setUUID = useSetAtom(uuidAtom);
  const setFCM = useSetAtom(fcmAtom);
  const setIsLinkedGoole = useSetAtom(isLinkedGooleAtom);
  const setIsLinkedApple = useSetAtom(isLinkedAppleAtom);
  const setUserLocation = useSetAtom(userLocationAtom);
  const [socialLogin, setSocialLogin] = useAtom(socialLoginAtom);
  const [isUpdate, setIsUpdate] = useAtom(isUpdateAtom);
  const setIsShowNotification = useSetAtom(notificationIconShowAtom);
  const [modalInformation, setModalInformation] = useAtom(modalInformationAtom);
  const [menuAnchorEl, setMenuAchorEl] = useAtom(menuAchorElAtom);
  const setIsGPSEnabled = useSetAtom(isGPSEnabledAtom);
  const setIsHardwareBackButtonTriggered = useSetAtom(
    isHardwareBackButtonTriggeredAtom
  );
  const [isBottomModalOpen, setIsBottomModalOpen] = useAtom(
    isBottomModalOpenAtom
  );
  const [isStoryReadMapExpanded, setIsStoryReadMapExpanded] = useAtom(
    isStoryMapExpandedAtom
  );
  const kindOfGlobalModal = useAtomValue(modalInformationAtom);
  const router = useRouter();

  // value 확인하고 backbutton 확인 필수
  // 급해서 value는 any 사용했습니다. 안티 패턴임 추후 수정 필요.
  const reduceMessageState = useCallback(
    (key: MessageType, value: any) => {
      switch (key) {
        case WEBVIEW_MESSAGE_TYPE.NOTIFICATION_MESSAGE_BACKGROUND:
          // RN RemoteMessage type 확인
          messageRoute(value?.data);
          setIsShowNotification(true);
          break;
        case WEBVIEW_MESSAGE_TYPE.NOTIFICATION_MESSAGE:
          setIsShowNotification(true);
          break;
        case WEBVIEW_MESSAGE_TYPE.APP_IS_UPDATE:
          setIsUpdate(value);
          break;
        case WEBVIEW_MESSAGE_TYPE.PERMISSION_CHECK:
          setPermission(value as AppPermission);
          break;
        case WEBVIEW_MESSAGE_TYPE.FCM_TOKEN:
          setFCM(value as string);
          break;
        case WEBVIEW_MESSAGE_TYPE.UUID:
          setUUID((value as string).split('=')[1]);
          break;
        case WEBVIEW_MESSAGE_TYPE.USER_LOCATION: {
          const { location, isGPSEnabled } = value;
          setIsGPSEnabled(isGPSEnabled);
          setUserLocation(location as MapCoordinate);
          break;
        }
        case WEBVIEW_MESSAGE_TYPE.ANDROID_MAIN_PAGE_GPS_SETTINGS: {
          setModalInformation({ type: 'AndroidGPSSettings' });
          break;
        }
        case WEBVIEW_MESSAGE_TYPE.SIGNIN_GOOGLE_COMPLETE:
          if (value.user.id) {
            window.sessionStorage.setItem(
              'socialLoginPreviousInfo',
              JSON.stringify({
                socialId: value.user.id,
                division: LoginTypeEnum.Google,
                status: 'complete'
              })
            );
            setSocialLogin({
              socialId: value.user.id,
              division: LoginTypeEnum.Google,
              status: 'loading'
            });
          }
          break;
        case WEBVIEW_MESSAGE_TYPE.SIGNOUT_GOOGLE_COMPLETE:
          setSocialLogin({
            socialId: '',
            division: LoginTypeEnum.Guest,
            status: 'none'
          });
          break;
        case WEBVIEW_MESSAGE_TYPE.SIGNIN_GOOGLE_ERROR:
          setIsLinkedGoole(false);
          break;
        case WEBVIEW_MESSAGE_TYPE.SIGNIN_APPLE_COMPLETE:
          window.sessionStorage.setItem(
            'socialLoginPreviousInfo',
            JSON.stringify({
              socialId: value,
              division: LoginTypeEnum.Apple,
              status: 'complete'
            })
          );
          setSocialLogin({
            socialId: value,
            division: LoginTypeEnum.Apple,
            status: 'loading'
          });
          break;
        case WEBVIEW_MESSAGE_TYPE.SIGNIN_APPLE_ERROR:
          setIsLinkedApple(false);
          break;
        case WEBVIEW_MESSAGE_TYPE.HARDWARE_BACK_BUTTON_PRESS:
          if (isStoryReadMapExpanded) {
            setIsStoryReadMapExpanded(false);
            return;
          }

          if (isBottomModalOpen) {
            setIsBottomModalOpen(false);
            return;
          }

          if (isMenuOpen(menuAnchorEl)) {
            setMenuAchorEl(null);
            return;
          }

          if (isGlobalModalOpen(modalInformation)) {
            if (kindOfGlobalModal?.type === 'LINK_ACCOUNT') {
              kindOfGlobalModal.handleClickLeftBtn();
            }

            setModalInformation(null);
            setIsHardwareBackButtonTriggered(false);

            return;
          }

          if (isPageAccessedByAlarm()) {
            router.push('/');
            return;
          }

          if (isCurrentPageHandleBackspaceInPageComponent()) {
            setIsHardwareBackButtonTriggered(true);
          } else {
            router.back();
          }
          break;
        default:
          break;
      }
    },
    [
      isBottomModalOpen,
      isStoryReadMapExpanded,
      kindOfGlobalModal,
      menuAnchorEl,
      messageRoute,
      modalInformation,
      router,
      setFCM,
      setIsBottomModalOpen,
      setIsGPSEnabled,
      setIsHardwareBackButtonTriggered,
      setIsLinkedApple,
      setIsLinkedGoole,
      setIsShowNotification,
      setIsStoryReadMapExpanded,
      setIsUpdate,
      setMenuAchorEl,
      setModalInformation,
      setPermission,
      setSocialLogin,
      setUUID,
      setUserLocation
    ]
  );

  const handleMessage = useCallback(
    (event: Event) => {
      try {
        const { type, body } = JSON.parse((event as MessageEvent).data);
        reduceMessageState(type, body);
      } catch (e) {
        console.error(e);
      }
    },
    [reduceMessageState]
  );

  useEffect(() => {
    if (window.platform === 'ios') {
      window.addEventListener('message', handleMessage);
    } else {
      document.addEventListener('message', handleMessage);
    }

    return () => {
      if (window.platform === 'ios') {
        window.removeEventListener('message', handleMessage);
      } else {
        document.removeEventListener('message', handleMessage);
      }
    };
  }, [handleMessage]);

  useEffect(() => {
    sendMessageToDevice(WEBVIEW_MESSAGE_TYPE.WEB_LOAD, true);
  }, []);
};

export default useBindReactNativeOnMessage;

const isGlobalModalOpen = (modalInformation: ModalInformationAtom) =>
  !!modalInformation;

const isMenuOpen = (anchorEl: MenuAcholElAtomType) => !!anchorEl;

const isCurrentPageHandleBackspaceInPageComponent = () => {
  const { origin, href, pathname } = window.location;
  const onlyPath = href.replace(origin, '');

  return (
    onlyPath === '/' ||
    onlyPath.startsWith('/?id=') ||
    onlyPath === '/story/write' ||
    onlyPath === '/story/write#isPointEditModalOpen=true' ||
    (onlyPath.includes('/story/write?storyId=') &&
      !onlyPath.includes('storySaveModal')) ||
    onlyPath === '/mypage/edit' ||
    pathname === '/mypage/edit'
  );
};

const isPageAccessedByAlarm = () => {
  const { origin, href } = window.location;
  const onlyPath = href.replace(origin, '');

  return (
    window.history.length === 1 && window.isWebViewAccess && onlyPath !== '/'
  );
};
