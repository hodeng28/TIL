import { mainImageOpacityAtom } from '@/atoms/storyReadAtom';
import { isPreviewPageAtom } from '@/atoms/storyWriteAtom';
import StoryReadButtonGroup from '@/components/ButtonGroup/StoryReadButtonGroup';
import StoryReadHeader from '@/components/Header/StoryReadHeader';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import useMapInteraction from '@/hooks/useMapInteraction';
import useScrollToTop from '@/hooks/useScrollToTop';
import { useSessionStorage } from '@/hooks/useSessionStorage';
import useStoryReadScroll from '@/hooks/useStoryReadScroll';
import { shouldNotForwardProp } from '@/utils/helpers';
import styled from '@emotion/styled';
import { Box, Divider } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import StoryContent from './StoryContent';
import StoryMainImage from './StoryMainImage';
import StoryReadMap from './StoryReadMap';
import useStoryRecommendationVisibilityDecisionAtom from '@/hooks/useStoryRecommendationVisibilityDecision';
import StoryRecommendation from './StoryRecommendation';
import { STORY_READ_PAGE_CSS } from '@/consts/css';

type StoryReadPageProps = {
  isscrap?: 1 | 0;
  iduser?: number;
  storyPointsWithBlockKey: StoryPointWithBlockKey[];
  idblog?: number;
  profilepath?: string;
  nickname?: string;
  title?: string;
  summary?: string;
  createdtime?: string;
  representative?: string;
  islike?: 1 | 0;
  isfollow?: 1 | 0;
  replycountsum?: number;
  likecount?: number;
};

const MAP_HEIGHT = STORY_READ_PAGE_CSS.HEIGHT.MAP;

const StoryRead = ({
  representative,
  profilepath,
  nickname,
  createdtime,
  isscrap,
  idblog,
  summary,
  title,
  storyPointsWithBlockKey,
  isfollow,
  islike,
  iduser,
  replycountsum,
  likecount
}: StoryReadPageProps) => {
  const [isTooltipShown, setIsTooltipShown] = useState(false);
  const [headerClientHeight, setHeaderClientHeight] = useState(0);
  const isPreviewPage = useAtomValue(isPreviewPageAtom);
  const mainImageOpacity = useAtomValue(mainImageOpacityAtom);
  const {
    observerRef,
    isObserverVisible,
    isAllImagesLoaded,
    setIsAllImagesLoaded
  } = useStoryRecommendationVisibilityDecisionAtom();

  // (kyh) todo : jotai 사용하기
  const [_, setIsPreviewPageStoryRead] = useSessionStorage(
    'isPreviewPageStoryRead',
    true
  );

  const { isMapExpanded, changeMapSize } = useMapInteraction({
    isMapExpanded: false
  });

  const [isPageVisitedFirst, setIsPageVisitedFirst] = useLocalStorage(
    'isPageVisitedFirst',
    true
  );

  const { scrollElementRef, storyContentRef, handleScrollByUser } =
    useStoryReadScroll(idblog);
  const { scrollToTop } = useScrollToTop({ ref: scrollElementRef });

  const handleGetClientHeight = (headerClientHeight: number) =>
    setHeaderClientHeight(headerClientHeight);

  const handleScroll = (event: ScrollEvent) => {
    if (!isPreviewPage && isPageVisitedFirst && mainImageOpacity === 0) {
      setIsTooltipShown(true);

      setTimeout(() => {
        setIsPageVisitedFirst(false);
        setIsTooltipShown(false);
      }, 2400);
    }

    handleScrollByUser(event);
  };

  useEffect(() => {
    !isPreviewPage && setIsPreviewPageStoryRead(true);
  }, [isPreviewPage, setIsPreviewPageStoryRead]);

  return (
    <>
      <TopAreaWrapper
        isMapExpanded={isMapExpanded}
        headerClientHeight={headerClientHeight}
        mainImageOpacity={mainImageOpacity}
      >
        <StoryReadHeader
          title={title}
          idblog={idblog}
          iduser={iduser}
          isTooltipShown={isTooltipShown}
          isPageVisitedFirst={isPageVisitedFirst}
          isMapExpanded={isMapExpanded}
          onGetClientHeight={handleGetClientHeight}
          onClickScrollToTopButton={scrollToTop}
        />
        <StoryMainImage
          iduser={iduser}
          isPreviewPage={isPreviewPage}
          idblog={idblog}
          representative={representative}
          title={title}
          pointcount={storyPointsWithBlockKey?.length}
          summary={summary}
          nickname={nickname}
          createdtime={createdtime}
          isfollow={isfollow}
          profilepath={profilepath}
          headerClientHeight={headerClientHeight}
        />

        <StoryReadMap
          key={idblog}
          isMapExpanded={isMapExpanded}
          storyPointsWithBlockKey={storyPointsWithBlockKey}
          scrollElementRef={scrollElementRef}
          onChangeMapSize={changeMapSize}
        />
      </TopAreaWrapper>
      {/* (kyh) todo : raf 사용하기 */}
      <BottomAreaWrapper
        ref={scrollElementRef}
        headerClientHeight={headerClientHeight}
        onScroll={handleScroll}
      >
        {!isPreviewPage && (
          <Divider
            sx={{ height: '20px', backgroundColor: '#eeeeee', border: 'none' }}
          />
        )}
        <StoryContent
          isAllImagesLoaded={isAllImagesLoaded}
          setIsAllImagesLoaded={setIsAllImagesLoaded}
          storyContentRef={storyContentRef}
          scrollElementRef={scrollElementRef}
          headerClientHeight={headerClientHeight}
          storyPointsWithBlockKey={storyPointsWithBlockKey}
        />
        <StoryReadButtonGroup
          iduser={iduser}
          idblog={idblog}
          isscrap={isscrap}
          title={title}
          islike={islike}
          replycountsum={replycountsum}
          likecount={likecount}
        />
        {!isPreviewPage && <StoryRecommendation idblog={idblog} />}
      </BottomAreaWrapper>
    </>
  );
};

export default StoryRead;

const TopAreaWrapper = styled(
  Box,
  shouldNotForwardProp(
    'isMapExpanded',
    'headerClientHeight',
    'mainImageOpacity'
  )
)<{
  isMapExpanded: boolean;
  headerClientHeight: number;
  mainImageOpacity: number;
}>(({ isMapExpanded, headerClientHeight, mainImageOpacity }) => ({
  position: 'relative',
  height: isMapExpanded ? `calc(100vh - ${headerClientHeight}px)` : getHeight(),
  width: 'inherit',
  zIndex: 100,

  '& header .MuiToolbar-root': {
    borderBottom:
      mainImageOpacity === 1
        ? '2px solid rgba(0, 0, 0, 0)'
        : '2px solid rgba(0, 0, 0, 0.12)'
  }
}));

const BottomAreaWrapper = styled(
  'div',
  shouldNotForwardProp('headerClientHeight')
)<{ headerClientHeight: number }>(({ headerClientHeight }) => ({
  position: 'fixed',
  top: `calc(${MAP_HEIGHT} + ${headerClientHeight}px)`,
  bottom: 0,
  width: '100%',
  maxWidth: '470px',
  minWidth: '370px',
  overflowY: 'auto',
  overflowX: 'hidden'
}));

const getHeight = () => {
  if (typeof window === 'undefined') return MAP_HEIGHT;

  if (window.DeviceHeight)
    return (
      window.DeviceHeight * (+MAP_HEIGHT.slice(0, MAP_HEIGHT.length - 2) / 100)
    );

  return MAP_HEIGHT;
};
