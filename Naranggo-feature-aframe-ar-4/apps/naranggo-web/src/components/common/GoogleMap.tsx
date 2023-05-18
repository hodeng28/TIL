import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import GoogleMap from 'google-maps-react-markers';
import { DEFAULT_ZOOM } from '@/consts/constants';

interface GoogleMapProps {
  children: React.ReactNode;
  center: MapCoordinate;
  isMapTypeSatellite?: boolean;
  zoom?: number;
  onChangeMap?: (mapChangeInformation: MapChangeInformation) => void;
  onClickMap?: () => void;
  handleGoogleApiLoaded?: ({
    map,
    maps,
    ref
  }: HandleGoogleApiLoadedParam) => void;
}

const CommonGoogleMap = ({
  children,
  center,
  isMapTypeSatellite = false,
  zoom = DEFAULT_ZOOM,
  onChangeMap,
  onClickMap,
  handleGoogleApiLoaded
}: GoogleMapProps) => {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    mapRef.current?.panTo(center);
  }, [center]);

  useEffect(() => {
    mapRef.current?.setZoom(zoom);
  }, [zoom]);

  useEffect(() => {
    mapRef.current?.setMapTypeId(isMapTypeSatellite ? 'satellite' : 'roadmap');
  }, [isMapTypeSatellite]);

  useEffect(() => {
    if (mapRef.current) {
      setMapLoaded(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapRef.current]);

  return (
    <Wrapper
      id="map"
      onClick={onClickMap}
      sx={{ visibility: !mapLoaded ? 'hidden' : '' }}
    >
      <GoogleMap
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || ''}
        libraries={['geometry', 'places', '&v=3.51&region=KR']}
        defaultCenter={center}
        defaultZoom={zoom}
        onChange={onChangeMap}
        onGoogleApiLoaded={({ map, maps, ref }: HandleGoogleApiLoadedParam) => {
          map.setOptions({
            zoomControlOptions: {
              position: maps.ControlPosition.RIGHT_CENTER
            },
            mapTypeControlOptions: {
              position: maps.ControlPosition.TOP_RIGHT,
              style: maps.MapTypeControlStyle.DEFAULT
            },
            restriction: {
              latLngBounds: {
                north: 85,
                south: -85,
                west: -180,
                east: 180
              },
              strictBounds: false
            },
            maxZoom: 20,
            minZoom: 4
          });

          mapRef.current = map;
          handleGoogleApiLoaded && handleGoogleApiLoaded({ map, maps, ref });
        }}
        options={{
          bootstrapURLKeys: {
            'region': 'kr'
          },
          options: {
            scaleControl: true,
            mapTypeControl: false,
            fullscreenControl: false,
            zoomControl: false,
            keyboardShortcuts: false,
            clickableIcons: false
          }
        }}
      >
        {children}
      </GoogleMap>
    </Wrapper>
  );
};

export default CommonGoogleMap;

const Wrapper = styled(Box)({
  width: '100%',
  height: '100%'
});
