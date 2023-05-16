import { MouseEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { CommonStyles } from '../style/CommonStyles';
import { SEARCH_POINT_PIN_IMAGE_URL } from '@/utils/image';

interface SearchMarkerProps {
  onClickMarker?: (e: MouseEvent<HTMLButtonElement>) => void;
  lat: number;
  lng: number;
}

const SearchMarker = ({
  onClickMarker,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lat,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lng
}: SearchMarkerProps) => {
  const wrapperRef = useRef(null);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let parentElement: HTMLElement | null = null;

    if (wrapperRef && wrapperRef.current) {
      parentElement = (wrapperRef.current as HTMLButtonElement).parentElement;
      setParentElement(parentElement);
    }
  }, []);

  useEffect(() => {
    if (parentElement) {
      parentElement.style.zIndex = '1';
    }
  }, [parentElement]);

  return (
    <CommonStyles.MarkerWrapper
      onClick={(e) => onClickMarker && onClickMarker(e)}
      ref={wrapperRef}
    >
      <Image
        src={SEARCH_POINT_PIN_IMAGE_URL}
        width={20}
        height={36}
        alt="포인트 마커"
      />
    </CommonStyles.MarkerWrapper>
  );
};

export default SearchMarker;
