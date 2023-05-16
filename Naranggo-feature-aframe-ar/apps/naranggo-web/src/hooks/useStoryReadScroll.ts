import {
  elementInformationAtom,
  mainImageOpacityAtom,
  mapCenterAtom,
  markerToStoryPointInformationAtom,
  scrolledByButtonAtom
} from '@/atoms/storyReadAtom';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import useStoryReadScrollRestoration from './useStoryReadScrollRestoration';

type StoryPointInformation = {
  scrollYPosition: number;
  storyPointNodeHeight: number;
} & MapCoordinate;

const useStoryReadScroll = (idblog: number | undefined) => {
  const { scrollElementRef, storyContentRef } =
    useStoryReadScrollRestoration(idblog);

  const [mapCenter, setMapCenter] = useAtom(mapCenterAtom);
  const [isScrolledByBtn, setIsScrolledByBtn] = useAtom(scrolledByButtonAtom);
  const setMainImageOpacity = useSetAtom(mainImageOpacityAtom);

  const { firstStoryPointHeaderPaddingTop } = useAtomValue(
    elementInformationAtom
  );
  const markerToStoryPointInformation = useAtomValue(
    markerToStoryPointInformationAtom
  );

  const isScrollFinishedTriggeredByBtn = ({ target }: ScrollEvent) => {
    const { scrollTop } = target;

    return (
      scrollTop === 0 ||
      isScrollAtStoryPoint(
        getOnlyScrollPosition(markerToStoryPointInformation),
        scrollTop
      )
    );
  };

  const changeMainImageOpacity = ({ target }: ScrollEvent) => {
    const { scrollTop } = target;

    const opacity = 1 - scrollTop / firstStoryPointHeaderPaddingTop;
    setMainImageOpacity(opacity >= 0 ? opacity : 0);
  };

  const changeMapCenter = ({ target }: ScrollEvent) => {
    const { scrollTop } = target;

    const targetStoryPointInformation = getTargetStoryPointInformation(
      markerToStoryPointInformation,
      scrollTop
    );

    if (targetStoryPointInformation && mapCenter) {
      const { lat, lng } = targetStoryPointInformation;
      const { lat: currentLat, lng: currentLng } = mapCenter;

      if (isInNewStoryPoint(lat, lng, currentLat, currentLng)) {
        setMapCenter({
          lat,
          lng
        });
      }
    }
  };

  const handleScrollByUser = (event: ScrollEvent) => {
    // 버튼에 의해서 스크롤이 일어났을 때,
    // 버튼이 의도하는 위치에 스크롤이 도달하게되면 setIsScrolledByBtn을 false로 만듬
    // 그렇지 않으면 TopArea가 변하지 않는 현상이 발생하게됨
    isScrollFinishedTriggeredByBtn(event) && setIsScrolledByBtn(false);
    // 버튼에 의해서 스크롤이 일어났을 때 혹은 댓글 영역 밑에 스크롤이 존재할 때
    // 이후의 로직을 실행하지 않음
    if (isScrolledByBtn) {
      return;
    }

    // 유저가 직접 스크롤링 하는 경우, TopArea를 변화시킴(스토리 포인트에 매칭되는 마커를 보여주거나, MainImageOpacity가 바뀜)
    changeMainImageOpacity(event);
    changeMapCenter(event);
  };

  return {
    scrollElementRef,
    storyContentRef,
    handleScrollByUser
  };
};

export default useStoryReadScroll;

const getOnlyScrollPosition = (
  markerToStoryPointInformation: MarkerToStoryPointInformation
) =>
  Object.values(markerToStoryPointInformation).map(
    ({ scrollYPosition }: StoryPointInformation) => scrollYPosition
  );

const isScrollAtStoryPoint = (
  scrollPositionsOfStoryPoints: number[],
  scrollTop: number
) => scrollPositionsOfStoryPoints.includes(scrollTop);

const isScrollAtCurrentStoryPoint = (
  scrollTop: number,
  scrollYPosition: number,
  storyPointNodeHeight: number
) =>
  scrollTop >= scrollYPosition &&
  scrollTop < scrollYPosition + storyPointNodeHeight;

export const getTargetStoryPointInformation = (
  markerToStoryPointInformation: MarkerToStoryPointInformation,
  scrollTop: number
) =>
  Object.values(markerToStoryPointInformation).find(
    ({ scrollYPosition, storyPointNodeHeight }: StoryPointInformation) =>
      isScrollAtCurrentStoryPoint(
        scrollTop,
        scrollYPosition,
        storyPointNodeHeight
      )
  );

const isInNewStoryPoint = (
  newLat: number,
  newLng: number,
  currentLat: number,
  currentLng: number
) => newLat !== currentLat || newLng !== currentLng;
