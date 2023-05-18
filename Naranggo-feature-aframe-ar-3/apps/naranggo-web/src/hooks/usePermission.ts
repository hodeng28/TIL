import modalInformationAtom from '@/atoms/modalInformationAtom';
import permissionAtom from '@/atoms/permissionAtom';
import { sendMessageToDevice } from '@/utils/helpers';
import { useAtomValue, useSetAtom } from 'jotai';
import { WEBVIEW_MESSAGE_TYPE } from '@naranggo/shared';
import isGPSEnabledAtom from '@/atoms/isGPSEnabledAtom';

type PermissionType = 'ALBUM' | 'LOCATION' | 'CAMERA';

const usePermission = (permissionType: PermissionType) => {
  const PermissionStatuses = useAtomValue(permissionAtom);
  const targetPermissionStatus = PermissionStatuses[permissionType];
  const setModalInformation = useSetAtom(modalInformationAtom);
  const isGPSEnabled = useAtomValue(isGPSEnabledAtom);

  function checkIfPossibleToUseFeature(): () => boolean;
  function checkIfPossibleToUseFeature(fn: () => void): () => boolean;
  function checkIfPossibleToUseFeature(
    fn: (args: 1 | 2 | 3) => void
  ): (args: 1 | 2 | 3) => boolean;
  function checkIfPossibleToUseFeature(
    fn?: (() => void) | ((args: 1 | 2 | 3) => void)
  ): undefined | boolean | (() => boolean) | ((args: 1 | 2 | 3) => boolean) {
    if (!fn) {
      if (targetPermissionStatus === 'denied' && window.isWebViewAccess) {
        sendMessageToDevice(WEBVIEW_MESSAGE_TYPE.PERMISSION_REQUEST, {
          permissionType
        });
        return false;
      }

      if (targetPermissionStatus === 'blocked' && window.isWebViewAccess) {
        setModalInformation({ type: 'DEVICE_SETTINGS' });
        return false;
      }

      if (!isGPSEnabled && window.isWebViewAccess) {
        setModalInformation({ type: window.platform === 'android' ? 'AndroidGPSSettings' : 'IosGPSSettings' });
        return false;
      }
      return true;
    }

    if (fn && fn.length === 1) {
      return (args: 1 | 2 | 3) => {
        if (targetPermissionStatus === 'denied' && window.isWebViewAccess) {
          sendMessageToDevice(WEBVIEW_MESSAGE_TYPE.PERMISSION_REQUEST, {
            permissionType
          });
          return false;
        }

        if (targetPermissionStatus === 'blocked' && window.isWebViewAccess) {
          setModalInformation({ type: 'DEVICE_SETTINGS' });
          return false;
        }

        if (!isGPSEnabled && window.isWebViewAccess) {
          setModalInformation({ type: window.platform === 'android' ? 'AndroidGPSSettings' : 'IosGPSSettings' });
          return false;
        }

        fn(args);
        return true;
      };
    }

    if (fn && fn.length === 0) {
      return () => {
        if (targetPermissionStatus === 'denied' && window.isWebViewAccess) {
          sendMessageToDevice(WEBVIEW_MESSAGE_TYPE.PERMISSION_REQUEST, {
            permissionType
          });
          return false;
        }

        if (targetPermissionStatus === 'blocked' && window.isWebViewAccess) {
          setModalInformation({ type: 'DEVICE_SETTINGS' });
          return false;
        }

        if (!isGPSEnabled && window.isWebViewAccess) {
          setModalInformation({ type: window.platform === 'android' ? 'AndroidGPSSettings' : 'IosGPSSettings' });
          return false;
        }

        (fn as () => void)(); // 기술 이해 부족으로 타입단언 사용 by kyh
        return true;
      };
    }
  }

  return { targetPermissionStatus, checkIfPossibleToUseFeature };
};

export default usePermission;
