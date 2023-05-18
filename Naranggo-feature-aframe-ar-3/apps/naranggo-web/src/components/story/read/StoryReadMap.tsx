import { styled, Box } from '@mui/material';
import GoogleMap from '@/components/common/GoogleMap';
import CustomMarker from '@/components/common/map/Marker';
import { Control } from '@/components/Button/MapButton';
import useMapInteraction from '@/hooks/useMapInteraction';
import {
  mapCenterAtom,
  markerToStoryPointInformationAtom,
  scrolledByButtonAtom
} from '@/atoms/storyReadAtom';
import { scrollTo } from '@/utils/helpers';
import { RefObject, useLayoutEffect, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import MapControlButtonGroup from '@/components/ButtonGroup/MapControlButtonGroup';
import { useRouter } from 'next/router';
import isRoutingAtom from '@/atoms/isRouting';
import {
  isBeforePopStateEventTriggered,
  isCurrentPageVisitedByBackspaceAtom
} from '@/atoms/isCurrentPageVisitedByBackspaceAtom';
import { getTargetStoryPointInformation } from '@/hooks/useStoryReadScroll';

interface StoryReadMapProps {
  isMapExpanded: boolean;
  storyPointsWithBlockKey: StoryPointWithBlockKey[];
  scrollElementRef: RefObject<HTMLDivElement>;
  onChangeMapSize: () => void;
}

const StoryReadMap = ({
  scrollElementRef,
  isMapExpanded,
  storyPointsWithBlockKey,
  onChangeMapSize
}: StoryReadMapProps) => {
  const {
    zoom,
    isMapTypeSatellite,
    zoomIn,
    zoomOut,
    changeZoomByMouseScroll,
    changeMapType
  } = useMapInteraction({});

  const router = useRouter();

  const isRouting = useAtomValue(isRoutingAtom);
  const isCurrentPageVisitedByBackspace = useAtomValue(
    isCurrentPageVisitedByBackspaceAtom
  );

  const [mapCenter, setMapCenter] = useAtom(mapCenterAtom);
  const [googleMapInformation, setGoogleMapInformation] =
    useState<Omit<HandleGoogleApiLoadedParam, 'ref'>>();

  const markerToStoryPointInformation = useAtomValue(
    markerToStoryPointInformationAtom
  );

  const [isFitBoundsInvoked, setIsFitBoundsInvoked] = useState(false);

  const setIsScrolledByBtn = useSetAtom(scrolledByButtonAtom);

  const handleChangeMap = ({ zoom }: MapChangeInformation) => {
    changeZoomByMouseScroll(zoom);
  };

  const handleClickMarker = ({ lat, lng }: MapCoordinate) => {
    isMapExpanded && onChangeMapSize();

    setIsScrolledByBtn(true);
    const { scrollYPosition } = markerToStoryPointInformation[`${lat}-${lng}`];

    scrollTo(scrollElementRef, scrollYPosition);

    setMapCenter({
      lat,
      lng
    });

    setTimeout(() => {
      setIsScrolledByBtn(false);
    });
  };

  const mapControls: Control[] = [
    {
      type: 'ZoomIn',
      onClick: zoomIn
    },
    {
      type: 'ZoomOut',
      onClick: zoomOut
    }
  ];

  if (isMapExpanded) {
    mapControls.push({
      type: 'Shrink',
      onClick: onChangeMapSize
    });
    mapControls.push({ type: 'MapType', onClick: changeMapType });
  } else {
    mapControls.push({
      type: 'Expand',
      onClick: onChangeMapSize
    });
  }

  useLayoutEffect(() => {
    if (
      !isRouting &&
      (isBeforePopStateEventTriggered || isCurrentPageVisitedByBackspace) &&
      scrollElementRef.current
    ) {
      const targetStoryPointInformation = getTargetStoryPointInformation(
        markerToStoryPointInformation,
        scrollElementRef.current.scrollTop
      );

      if (targetStoryPointInformation) {
        const { lat, lng } = targetStoryPointInformation;

        if (mapCenter && mapCenter.lat === lat && mapCenter.lng === lng) {
          return;
        }

        setMapCenter({
          lat,
          lng
        });
      }
    }
  }, [
    isCurrentPageVisitedByBackspace,
    isRouting,
    mapCenter,
    markerToStoryPointInformation,
    router.query.storyId,
    scrollElementRef,
    setMapCenter
  ]);

  useLayoutEffect(() => {
    if (googleMapInformation && !isFitBoundsInvoked) {
      const { map, maps } = googleMapInformation;
      const markerPositions = storyPointsWithBlockKey?.map(
        ({ Latitude, Longitude }) => ({
          lat: Latitude,
          lng: Longitude
        })
      );

      const bounds = new maps.LatLngBounds();

      markerPositions?.forEach(({ lat, lng }) =>
        bounds.extend(new maps.LatLng(lat, lng))
      );

      map.fitBounds(bounds);
      setIsFitBoundsInvoked(true);
    }
  }, [googleMapInformation, isFitBoundsInvoked, storyPointsWithBlockKey]);

  const handleGoogleApiLoaded = ({ map, maps }: HandleGoogleApiLoadedParam) => {
    setGoogleMapInformation({ map, maps });
  };

  return (
    <Wrapper>
      <GoogleMap
        zoom={zoom}
        center={mapCenter}
        isMapTypeSatellite={isMapTypeSatellite}
        onChangeMap={handleChangeMap}
        handleGoogleApiLoaded={handleGoogleApiLoaded}
      >
        {storyPointsWithBlockKey?.map(
          (
            {
              Latitude,
              Longitude,
              blocks,
              RepresentativeImagePath
            }: StoryPointWithBlockKey,
            index: number
          ) => {
            return (
              <CustomMarker
                key={`${Latitude}-${Longitude}-${index}`}
                selected={
                  isMapCenterInitialized(mapCenter)
                    ? isCenteredCurrently(mapCenter, Latitude, Longitude)
                    : false
                }
                lat={Latitude}
                lng={Longitude}
                onClickMarker={() => {
                  handleClickMarker({ lat: Latitude, lng: Longitude });
                }}
                representative={getImage(RepresentativeImagePath, blocks)}
              />
            );
          }
        )}
      </GoogleMap>
      <MapControlButtonGroup controls={mapControls} />
    </Wrapper>
  );
};

export default StoryReadMap;

const Wrapper = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  position: 'relative'
}));

const isCenteredCurrently = (
  { lat, lng }: MapCoordinate,
  Latitude: number,
  Longitude: number
) => {
  const mapCenterLatString = lat.toString();
  const mapCenterLngString = lng.toString();
  const markerLatString = Latitude.toString();
  const markerLngString = Longitude.toString();

  let isLatSame = null;
  let isLngSame = null;

  if (mapCenterLatString.length > markerLatString.length) {
    mapCenterLatString.includes(markerLatString) && (isLatSame = true);
  } else {
    markerLatString.includes(mapCenterLatString) && (isLatSame = true);
  }

  if (mapCenterLngString.length > markerLngString.length) {
    mapCenterLngString.includes(markerLngString) && (isLngSame = true);
  } else {
    markerLngString.includes(mapCenterLngString) && (isLngSame = true);
  }

  return (isLatSame && isLngSame) || false;
};

const getImage = (RepresentativeImagePath: string, blocks: Block[]) => {
  const pictureBlock = blocks.find(
    (block) => block.type === 'PictureBlockData'
  );

  if (pictureBlock && 'src' in pictureBlock) {
    return pictureBlock.src;
  }

  if (RepresentativeImagePath && RepresentativeImagePath.length !== 0) {
    return RepresentativeImagePath.replace(
      'https://resources-cf.naranggo.com/thumbnails50/',
      ''
    );
  }

  return '';
};

const isMapCenterInitialized = (mapCenter: MapCoordinate) =>
  mapCenter.lat !== 0 && mapCenter.lng !== 0;
