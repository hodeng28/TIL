import { useEffect, useRef, useState } from 'react';
import { PermissionStatusChange } from './useLocationPermissionStatusChange';
import usePrevious from './usePrevious';

interface UseAlbumPermissionStatusChangeParams {
  ALBUM: 'denied' | 'blocked' | 'granted' | 'unavailable' | 'limited';
}

const useAlbumPermissionStatusChange = ({
  ALBUM
}: UseAlbumPermissionStatusChangeParams) => {
  const previousLocationPermission = usePrevious(ALBUM);

  const mouseClickEventRef = useRef(
    new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': false
    })
  );

  const [permissionStatusChange, setPermissionStatusChange] =
    useState<PermissionStatusChange>('');

  useEffect(() => {
    if (
      ALBUM !== previousLocationPermission &&
      ALBUM === 'granted' &&
      (previousLocationPermission === 'denied' ||
        previousLocationPermission === 'blocked')
    ) {
      setPermissionStatusChange('DisallowToAllow');
    }

    if (
      ALBUM !== previousLocationPermission &&
      (ALBUM === 'denied' || ALBUM === 'blocked') &&
      previousLocationPermission === 'granted'
    ) {
      setPermissionStatusChange('AllowToDisallow');
    }
  }, [ALBUM, previousLocationPermission]);

  if (permissionStatusChange === 'DisallowToAllow') {
    document
      .querySelector('.ck-file-dialog-button')
      ?.children[0].dispatchEvent(mouseClickEventRef.current);

    document
      .querySelector('.user-profile-image-set')
      ?.dispatchEvent(mouseClickEventRef.current);

    document
      .getElementById('contained-button-file')
      ?.dispatchEvent(mouseClickEventRef.current);

    setPermissionStatusChange('');
  }

  if (permissionStatusChange === 'AllowToDisallow') {
    setPermissionStatusChange('');
  }
};

export default useAlbumPermissionStatusChange;
