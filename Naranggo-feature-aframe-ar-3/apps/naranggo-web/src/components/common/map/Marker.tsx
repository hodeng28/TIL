import { memo, MouseEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { styled, Typography, Box } from '@mui/material';
import { getMarkerImage } from '@/utils/image';
import { CommonStyles } from '../style/CommonStyles';
import { shouldNotForwardProp } from '@/utils/helpers';

interface CustomMarkerProps extends CustomMarkerInfor {
  selected?: boolean;
  onClickMarker?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const CustomMarker = ({
  lat,
  lng,
  selected,
  representative,
  numberOfMarkers = 1,
  onClickMarker
}: CustomMarkerProps) => {
  const wrapperRef = useRef(null);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  const getNumberOfMarkers = () =>
    numberOfMarkers <= 99 ? numberOfMarkers : '99+';

  const markerImage = getMarkerImage(representative);
  const markerCount = getNumberOfMarkers();

  useEffect(() => {
    let parentElement: HTMLElement | null = null;

    if (wrapperRef && wrapperRef.current) {
      // 이유는 모르겠는데 여기서 바로 parentElement.style.zIndex = 1로 스타일을 설정하면
      // 바로 반영되지 않습니다. 그래서 parentElement를 상태로 만들었습니다.
      parentElement = (wrapperRef.current as HTMLButtonElement).parentElement;
      setParentElement(parentElement);
    }
  }, []);

  useEffect(() => {
    if (selected && parentElement) {
      parentElement.style.zIndex = '1';
    } else if (!selected && parentElement) {
      parentElement.style.zIndex = '0';
    }
  }, [selected, parentElement]);

  return (
    <CommonStyles.MarkerWrapper onClick={onClickMarker} ref={wrapperRef}>
      <Image
        src={
          selected
            ? '/images/selected-marker.svg'
            : '/images/default-marker.svg'
        }
        alt="마커"
        layout="fill"
        objectFit="contain"
      />
      <MarkerContent>
        {numberOfMarkers > 1 ? (
          <NumberOfMarkers isClusteredMarkerOver99={numberOfMarkers > 99}>
            {markerCount}
          </NumberOfMarkers>
        ) : (
          markerImage && (
            <Image
              src={markerImage}
              alt="대표 이미지"
              width="20px"
              height="20px"
              objectFit="cover"
            />
          )
        )}
      </MarkerContent>
    </CommonStyles.MarkerWrapper>
  );
};

export default memo(CustomMarker);

const NumberOfMarkers = styled(
  Typography,
  shouldNotForwardProp('isClusteredMarkerOver99')
)<{ isClusteredMarkerOver99: boolean }>(
  ({ theme, isClusteredMarkerOver99 }) => ({
    color: theme.palette.custom.light,
    fontSize: isClusteredMarkerOver99 ? '0.6rem' : '0.8rem',
    fontWeight: 'bold'
  })
);

const MarkerContent = styled(Box)(({ theme }) => ({
  overflow: 'hidden',
  position: 'absolute',
  width: '20px',
  height: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  borderRadius: '50%',
  left: '50%',
  top: '4px',
  backgroundColor: theme.palette.custom.blue100,
  transform: 'translateX(-50%)'
}));
