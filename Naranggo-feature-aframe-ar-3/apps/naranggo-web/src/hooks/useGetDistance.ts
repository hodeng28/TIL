import { useCallback } from 'react';

const useGetDistance = (
  userPosition: MapCoordinate | undefined,
  destination?: MapCoordinate
) => {
  const getDistanceCoordinate = useCallback(() => {
    if (!destination || !userPosition) return 0;

    const { lat: userLat, lng: userLng } = userPosition;
    const { lat: destLat, lng: destLng } = destination;

    if (destLat === userLat && destLng === userLng) {
      return 0;
    }

    const radlat1 = (Math.PI * destLat) / 180;
    const radlat2 = (Math.PI * userLat) / 180;

    const theta = destLng - userLng;
    const radtheta = (Math.PI * theta) / 180;

    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

    if (dist > 1) {
      dist = 1;
    }

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    dist = dist * 1000;

    return Math.floor(dist * 100) / 100;
  }, [destination, userPosition]);

  const getDistance = useCallback(() => {
    const distance = getDistanceCoordinate();

    if (distance > 1000) {
      return Math.floor(distance / 1000) + 'km';
    }

    return distance + 'm';
  }, [getDistanceCoordinate]);

  return { getDistance };
};

export default useGetDistance;
