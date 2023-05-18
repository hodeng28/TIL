import isStoryMapExpandedAtom from '@/atoms/isStoryMapExpandedAtom';
import { useAtom } from 'jotai';
import { useState } from 'react';

interface UseMapBtnProps {
  zoom?: number;
  isMapTypeSatellite?: boolean;
  isMapExpanded?: boolean;
}

const useMapInteraction = ({
  zoom: initialZoom = 14,
  isMapTypeSatellite: initialIsMapTypeSatellite = false,
  isMapExpanded: initialIsMapExpanded = false
}: UseMapBtnProps) => {
  const [zoom, setZoom] = useState(initialZoom);

  const [isMapTypeSatellite, setIsMapTypeSatellite] = useState(
    initialIsMapTypeSatellite
  );

  const [isMapExpanded, setIsMapExpanded] = useAtom(isStoryMapExpandedAtom);

  const zoomIn = () => zoom < 22 && setZoom(zoom + 1);
  const zoomOut = () => zoom > 2 && setZoom(zoom - 1);
  const changeMapType = () => setIsMapTypeSatellite(!isMapTypeSatellite);
  const changeMapSize = () => setIsMapExpanded(!isMapExpanded);
  const changeZoomByMouseScroll = (zoom: number) => setZoom(zoom);

  return {
    zoom,
    zoomIn,
    zoomOut,
    changeZoomByMouseScroll,
    isMapTypeSatellite,
    changeMapType,
    isMapExpanded,
    changeMapSize
  };
};

export default useMapInteraction;
