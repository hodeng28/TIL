import { useEffect, useState } from 'react';
import { styled, Box } from '@mui/material';
import GoogleMap from '@/components/common/GoogleMap';
import UserLocationMarker from './UserPositionMarker';
import MapControlButtonGroup from '../ButtonGroup/MapControlButtonGroup';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { storySearchModalAtom } from '@/atoms/ModalAtom';
import { isCityHallCoordinate, sendMessageToDevice } from '@/utils/helpers';
import useLocationPermissionStatusChange from '@/hooks/useLocationPermissionStatusChange';
import usePermission from '@/hooks/usePermission';
import useUserPosition from '@/hooks/useUserPosition';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import keepMapLocationAtom from '@/atoms/keepMapLocation';
import keepZoomLevelAtom from '@/atoms/keepZoomLevel';
import { DEFAULT_ZOOM } from '@/consts/constants';
import { WEBVIEW_MESSAGE_TYPE } from '@naranggo/shared';
import isGPSEnabledAtom from '@/atoms/isGPSEnabledAtom';
import modalInformationAtom from '@/atoms/modalInformationAtom';

interface MainMapProps {
  children?: React.ReactNode;
  searchResultCoordinate?: MapCoordinate;
  onChangeMap?: (mapChangeInformation: MapChangeInformation) => void;
  moveToCoordinate?: (coordinate: MapCoordinate) => void;
  mapCenter?: MapCoordinate;
  onClickMap?: () => void;
  handleGoogleApiLoaded?: ({
    map,
    maps,
    ref
  }: HandleGoogleApiLoadedParam) => void;
}

const MainMap = ({
  children,
  searchResultCoordinate,
  onChangeMap,
  onClickMap,
  handleGoogleApiLoaded
}: MainMapProps) => {
  const [center, setCenter] = useAtom(keepMapLocationAtom);
  const [zoomLevel, setZoomLevel] = useAtom(keepZoomLevelAtom);
  const isGPSEnabled = useAtomValue(isGPSEnabledAtom);
  const setModalInformation = useSetAtom(modalInformationAtom);

  const { userPosition } = useUserPosition();

  const [isMapTypeSatellite, setIsMapTypeSatellite] = useState(false);
  const setIsSearchBarOpen = useSetAtom(storySearchModalAtom);
  const [isCheckTerms] = useLocalStorage('isCheckTerms', false);

  const { targetPermissionStatus: LOCATION, checkIfPossibleToUseFeature } =
    usePermission('LOCATION');

  useLocationPermissionStatusChange({
    userPosition,
    LOCATION,
    setCenter
  });

  useEffect(() => {
    if (
      LOCATION === 'denied' &&
      isCheckTerms
    ) {
      sendMessageToDevice(WEBVIEW_MESSAGE_TYPE.PERMISSION_REQUEST, {
        permissionType: 'LOCATION',
        isMainPageRequest: true
      });
    }

    sendMessageToDevice(WEBVIEW_MESSAGE_TYPE.MAIN_PAGE_ACCESS, true)
  }, [LOCATION, isCheckTerms, isGPSEnabled, setModalInformation]);

  const handleChangeMapToUserPosition = () => {
    if (userPosition && !isCityHallCoordinate(userPosition)) {
      setCenter(userPosition);
      setZoomLevel(DEFAULT_ZOOM);
    }
  };

  const handleChangeMapType = () => {
    setIsMapTypeSatellite(!isMapTypeSatellite);
  };

  const handleChangeMap = (mapChangeInformation: MapChangeInformation) => {
    onChangeMap && onChangeMap(mapChangeInformation);
    setZoomLevel(mapChangeInformation.zoom);
    setCenter({
      lng: mapChangeInformation.center[0],
      lat: mapChangeInformation.center[1]
    });
  };

  useEffect(() => {
    if (searchResultCoordinate) {
      setCenter(searchResultCoordinate);
    }
  }, [searchResultCoordinate, setCenter]);

  return (
    <>
      <Wrapper>
        {userPosition && (
          <GoogleMap
            center={center || userPosition}
            isMapTypeSatellite={isMapTypeSatellite}
            onChangeMap={handleChangeMap}
            onClickMap={onClickMap}
            handleGoogleApiLoaded={handleGoogleApiLoaded}
            zoom={zoomLevel}
          >
            {children}
            <UserLocationMarker lat={userPosition.lat} lng={userPosition.lng} />
          </GoogleMap>
        )}
        <MapControlButtonGroup
          controls={[
            {
              type: 'Search',
              onClick: () => {
                setIsSearchBarOpen(true);
              }
            },
            {
              type: 'UserLocation',
              onClick: checkIfPossibleToUseFeature(
                handleChangeMapToUserPosition
              )
            },
            { type: 'MapType', onClick: handleChangeMapType }
          ]}
        />
      </Wrapper>
    </>
  );
};

export default MainMap;

const Wrapper = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  position: 'relative'
}));
