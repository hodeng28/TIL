import { styled, IconButton } from '@mui/material';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import {
  mainImageOpacityAtom,
  mapCenterAtom,
  markerToStoryPointInformationAtom,
  scrolledByButtonAtom
} from '@/atoms/storyReadAtom';
import { useAtomValue, useSetAtom } from 'jotai';

interface ScrollToTpBtnProps {
  isScrollToTopBtnDisplayed: boolean;
  onClickScrollToTopBtn: () => void;
}

const ScrollToTopBtn = ({
  isScrollToTopBtnDisplayed,
  onClickScrollToTopBtn
}: ScrollToTpBtnProps) => {
  const setMainImageOpacity = useSetAtom(mainImageOpacityAtom);

  const markerToStoryPointInformation = useAtomValue(
    markerToStoryPointInformationAtom
  );

  const setIsScrolledByBtn = useSetAtom(scrolledByButtonAtom);
  const setMapCenter = useSetAtom(mapCenterAtom);
  const handleClickScrollToTopBtn = () => {
    setIsScrolledByBtn(true);
    setMainImageOpacity(1);
    onClickScrollToTopBtn();
    setMapCenter(
      getMarkerCoordinateOfFirstStoryPoint(markerToStoryPointInformation)
    );
  };

  return (
    <>
      {isScrollToTopBtnDisplayed && (
        <Wrapper onClick={handleClickScrollToTopBtn}>
          <ArrowUpward />
        </Wrapper>
      )}
    </>
  );
};

export default ScrollToTopBtn;

const Wrapper = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: '1rem',
  right: '1.5rem',
  zIndex: 100,
  backgroundColor: theme.palette.custom.light,
  '&:hover': {
    backgroundColor: theme.palette.custom.light
  },
  boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.2)'
}));

const getMarkerCoordinateOfFirstStoryPoint = (
  markerToStoryPointInformation: MarkerToStoryPointInformation
) => {
  const [firstStoryPointInformation] = Object.values(
    markerToStoryPointInformation
  ).sort(
    (
      { scrollYPosition: firstScrollYPosition },
      { scrollYPosition: secondScrollYPosition }
    ) => {
      return firstScrollYPosition - secondScrollYPosition;
    }
  );

  return {
    lat: firstStoryPointInformation.lat,
    lng: firstStoryPointInformation.lng
  };
};
