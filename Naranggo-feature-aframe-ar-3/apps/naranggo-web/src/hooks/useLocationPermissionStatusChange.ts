import { CITYHALL_COORDINATE } from '@/consts/constants';
import { isCityHallCoordinate } from '@/utils/helpers';
import { SortItem } from '@pages/story';
import { Dispatch, useEffect, useState } from 'react';
import usePrevious from './usePrevious';
import isGPSEnabledAtom from '@/atoms/isGPSEnabledAtom';
import { useAtomValue } from 'jotai';

interface UseLocationPermissionStatusChangeParams {
  userPosition: MapCoordinate | undefined;
  LOCATION: 'denied' | 'blocked' | 'granted' | 'unavailable' | 'limited';
  isStoryListPage?: boolean;
  storySort?: SortItem[];
  handleChangeFromAllowToDisallow?: () => void;
  handleClickSortBtn?: (selectedOrderType: 1 | 2 | 3) => void;
  setCenter?: Dispatch<MapCoordinate>;
}

export type PermissionStatusChange = '' | 'DisallowToAllow' | 'AllowToDisallow';

const useLocationPermissionStatusChange = ({
  userPosition,
  LOCATION,
  storySort,
  isStoryListPage,
  handleChangeFromAllowToDisallow,
  handleClickSortBtn,
  setCenter
}: UseLocationPermissionStatusChangeParams) => {
  const previousLocationPermission = usePrevious(LOCATION);
  const isGPSEnabled = useAtomValue(isGPSEnabledAtom);
  const [permissionStatusChange, setPermissionStatusChange] =
    useState<PermissionStatusChange>('');
  const previousIsGPSEnabled = usePrevious(isGPSEnabled);

  useEffect(() => {
    if (
      (LOCATION !== previousLocationPermission &&
        LOCATION === 'granted' &&
        (previousLocationPermission === 'denied' ||
          previousLocationPermission === 'blocked')) ||
      (isGPSEnabled && LOCATION === 'granted')
    ) {
      setPermissionStatusChange('DisallowToAllow');
    }

    if (
      LOCATION !== previousLocationPermission &&
      (LOCATION === 'denied' || LOCATION === 'blocked') &&
      previousLocationPermission === 'granted'
    ) {
      setPermissionStatusChange('AllowToDisallow');
    }
  }, [LOCATION, isGPSEnabled, previousLocationPermission]);

  if (isGPSEnabled !== previousIsGPSEnabled && !isGPSEnabled) {
    setCenter && setCenter(CITYHALL_COORDINATE);
  }

  if (
    permissionStatusChange === 'DisallowToAllow' &&
    userPosition &&
    !isCityHallCoordinate(userPosition)
  ) {
    setCenter && setCenter(userPosition);
    setPermissionStatusChange('');
  }

  if (permissionStatusChange === 'AllowToDisallow') {
    setCenter && setCenter(CITYHALL_COORDINATE);
    setPermissionStatusChange('');
    handleChangeFromAllowToDisallow && handleChangeFromAllowToDisallow();
  }

  if (
    storySort &&
    permissionStatusChange === 'DisallowToAllow' &&
    userPosition &&
    !isCityHallCoordinate(userPosition)
  ) {
    if (isStoryListPage) {
      return;
    }

    handleClickSortBtn && handleClickSortBtn(3);
  }
};

export default useLocationPermissionStatusChange;
