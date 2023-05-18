import userLocationAtom from '@/atoms/userLocationAtom';
import { CITYHALL_COORDINATE } from '@/consts/constants';
import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

const useUserPosition = () => {
  const [userPosition, setUserPosition] = useState<MapCoordinate>();

  const appLocation = useAtomValue(userLocationAtom);

  const findWebUserPosition = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setUserPosition({
          lat: coords.latitude,
          lng: coords.longitude
        });
      },
      () => {
        setUserPosition(CITYHALL_COORDINATE);
      },
      {
        enableHighAccuracy: true,
        maximumAge: Infinity
      }
    );
  };

  const getUserPosition = useCallback(() => {
    return userPosition;
  }, [userPosition]);

  useEffect(() => {
    if (appLocation) {
      setUserPosition(appLocation);
    } else {
      !window.isWebViewAccess && findWebUserPosition();
    }
  }, [appLocation]);

  return { userPosition, setUserPosition, getUserPosition };
};

export default useUserPosition;
