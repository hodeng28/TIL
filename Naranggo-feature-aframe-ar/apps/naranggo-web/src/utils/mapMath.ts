// Cluster 기준을 결정하는 식을 구현한 함수
// 이 주석에서 설명하는 '거리'는 모두 현재 맵의 '실제 거리'를 의미함
// 공식은, 마커1과 마커2의 거리 / 맵의 절반 거리 < 클러스터링 기준 비율
// 마커1과 마커2의 거리를 맵의 절반 거리로 나누었을 때, 클러스터링 기준 비율보다 '작을 정도로 두 마커가 가깝다면' 클러스터링
// 맵의 절반 거리 수식은 {(맵의 가로 거리 + 맵의 세로 거리) / 2 } / 2
// 가로 거리와 세로 거리의 중간 거리를 구하고, 맵의 절반에 해당하는 거리를 구하기 위해서 다시 나누기 2 를 함
const CLUSTER_RATE = 0.12;

export const isNeedToCluster = (
  marker1: Marker,
  marker2: Marker,
  currentMapCoordinate: MapViewportInformation
) =>
  calculateDistanceBetweenMarker(marker1, marker2) /
    calculateDistanceBetweenMarker(currentMapCoordinate, {
      ...currentMapCoordinate,
      lat: calculateHalfDistance(currentMapCoordinate)
    }) <
  CLUSTER_RATE;

// 맵의 절반 거리를 구하는 공식
const calculateHalfDistance = ({
  lat,
  latDelta,
  lngDelta
}: MapViewportInformation) => {
  const halfDelta = (latDelta + lngDelta) / 2;

  return lat + halfDelta / 2;
};

// 위경도 좌표계에서, 두 지점 사이의 거리를 구하기 위한 공식
// haversine formular라고 부름
const calculateDistanceBetweenMarker = (
  marker1: Marker | MapViewportInformation,
  marker2: Marker | MapViewportInformation
) => {
  const { lat: lat1, lng: lng1 } = marker1;
  const { lat: lat2, lng: lng2 } = marker2;

  const R = 6371;
  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d;
};

const degToRad = (deg: number) => deg * (Math.PI / 180);
