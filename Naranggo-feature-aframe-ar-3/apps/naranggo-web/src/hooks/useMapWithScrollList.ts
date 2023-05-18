import { ITEM_HEIGHT, PROFILE_HEIGHT } from '@/pages/StoryPreview';
import { useState, useEffect } from 'react';

interface MapWithScrollListProps {
  pointList: StoryPoint[];
  scrollElementRef: React.RefObject<HTMLElement>;
}

const useMapWithScrollList = ({
  pointList,
  scrollElementRef
}: MapWithScrollListProps) => {
  const [currentMarkerCoordinate, setCurrentMarkerCoordinate] =
    useState<MapCoordinate>();
  const [currentPointIndex, setCurrentPointIndex] = useState(-1);

  useEffect(() => {
    const scrollElementCurrent = scrollElementRef.current;

    if (!scrollElementCurrent) {
      return () => {
        console.log('temp');
      };
    }

    const scrollListener = () => {
      const pointIndex = Math.floor(
        (scrollElementCurrent.scrollTop - PROFILE_HEIGHT) / ITEM_HEIGHT
      );

      setCurrentPointIndex(pointIndex < 0 ? -1 : pointIndex);
    };

    scrollElementCurrent.addEventListener('scroll', scrollListener);

    return () => {
      if (scrollElementCurrent) {
        scrollElementCurrent.removeEventListener('scroll', scrollListener);
      }
    };
  }, [scrollElementRef]);

  useEffect(() => {
    if (currentPointIndex !== -1) {
      const currentPoint = pointList[currentPointIndex];
      setCurrentMarkerCoordinate({
        lat: currentPoint.Latitude,
        lng: currentPoint.Longitude
      });
    }
  }, [currentPointIndex, pointList]);

  return { currentMarkerCoordinate, currentPointIndex };
};

export default useMapWithScrollList;
