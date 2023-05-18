import { fitBounds } from 'google-map-react';
import { useCallback, useEffect, useState } from 'react';

type PointMarker = Pick<Marker, 'lat' | 'lng'> & { src: string };

const usePlayStoryMap = (
  storyPoints: StoryPointWithBlockKey[],
  userPosition: MapCoordinate | undefined
) => {
  const [mapCenter, setMapCenter] = useState<MapCoordinate>();
  const [mapZoom, setMapZoom] = useState(18);
  const [pointMarkers, setPointMarkers] = useState<PointMarker[]>([]);
  const [currentPoint, setCurrentPoint] = useState<MapCoordinate>();
  const [currentPointName, setCurrentPointName] = useState('');
  const [isAddPoint, setIsAddPoint] = useState(false);
  const [isMove, setIsMove] = useState(false);

  useEffect(() => {
    if (!currentPoint) {
      const { Latitude: lat, Longitude: lng } = storyPoints[0];
      setMapCenter({ lat, lng });

      return;
    }
  }, [currentPoint, storyPoints]);

  const moveMap = useCallback(() => {
    if (isMove || !currentPoint || !userPosition) return;

    const { lat: pointLat, lng: poinLng } = currentPoint;
    const { lat: userLat, lng: userLng } = userPosition;

    const newBounds = {
      ne: {
        lat: Math.max(pointLat, userLat),
        lng: Math.max(poinLng, userLng)
      },
      sw: {
        lat: Math.min(pointLat, userLat),
        lng: Math.min(poinLng, userLng)
      }
    };

    const { center, zoom } = fitBounds(newBounds, {
      width: window.innerWidth,
      height: window.innerHeight
    });

    setIsMove(true);
    setMapCenter(center);
    setMapZoom(zoom);
  }, [currentPoint, isMove, userPosition]);

  const addPoint = useCallback(
    (blockData: GPSBlockData) => {
      const { pointName } = blockData;

      const playStoryMapData = storyPoints.find(
        (block) => block.PointName === pointName
      );

      // todo: 컨텐츠 이동 로직 구현 후에도 배열에 중복 객체가 존재하는지 확인
      if (playStoryMapData && !isAddPoint) {
        const { Latitude: lat, Longitude: lng, blocks } = playStoryMapData;
        const { src } = blocks[0];
        const point = { lat, lng, src };

        setPointMarkers((prevData) => [...prevData, point]);
        setCurrentPoint({ lat, lng });
        setCurrentPointName(pointName);
        setIsAddPoint(true);
      }
    },
    [isAddPoint, storyPoints]
  );

  return {
    pointMarkers,
    currentPoint,
    currentPointName,
    mapCenter,
    mapZoom,
    setMapCenter,
    setMapZoom,
    addPoint,
    setIsAddPoint,
    moveMap,
    setIsMove
  };
};

export default usePlayStoryMap;
