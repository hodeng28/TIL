import useMapInteraction from '@/hooks/useMapInteraction';
import { shouldNotForwardProp } from '@/utils/helpers';
import { Box, styled } from '@mui/material';
import { STORY_READ_PAGE_CSS } from '@/consts/css';
import StoryReadHeader from '../Header/StoryReadHeader';
import StoryMainImage from '../story/read/StoryMainImage';
import DetailContents from './DetailContents';
import StoryReadMap from '@/components/story/read/StoryReadMap';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { mainImageOpacityAtom } from '@/atoms/storyReadAtom';
import { useAtomValue } from 'jotai';
import StoryReadButtonGroup from '../ButtonGroup/StoryReadButtonGroup';
import useStoryReadScroll from '@/hooks/useStoryReadScroll';
import useScrollToTop from '@/hooks/useScrollToTop';

interface PlayStoryDetailProps {
  isscrap?: 1 | 0;
  iduser?: number;
  storyPointsWithBlockKey: PlayStoryContentsData;
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
  estimatedtime?: number;
  idofficialcategory?: 0 | 1 | 2;
  iscomplete?: 0 | 1;
  playable?: 0 | 1;
}

const MAP_HEIGHT = STORY_READ_PAGE_CSS.HEIGHT.MAP;

const PlayStoryDetail = ({
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
  likecount,
  estimatedtime,
  iscomplete,
  idofficialcategory,
  playable
}: PlayStoryDetailProps) => {
  const router = useRouter();
  const [isTooltipShown, setIsTooltipShown] = useState(false);
  const [headerClientHeight, setHeaderClientHeight] = useState(0);

  const playStoryId = router.query.playStoryId;
  const { storyPoints } = storyPointsWithBlockKey;

  const { isMapExpanded, changeMapSize } = useMapInteraction({
    isMapExpanded: false
  });

  const mainImageOpacity = useAtomValue(mainImageOpacityAtom);
  const { scrollElementRef, storyContentRef, handleScrollByUser } =
    useStoryReadScroll(idblog);

  const { scrollToTop } = useScrollToTop({ ref: scrollElementRef });

  const handleGetClientHeight = (headerClientHeight: number) =>
    setHeaderClientHeight(headerClientHeight);

  const handleClickPlayStory = () => {
    router.push(`/play/${playStoryId}/contents`);
  };

  const handleScroll = (event: ScrollEvent) => {
    if (mainImageOpacity === 0) {
      setIsTooltipShown(true);

      setTimeout(() => {
        setIsTooltipShown(false);
      }, 2400);
    }
    handleScrollByUser(event);
  };

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
          isMapExpanded={isMapExpanded}
          onGetClientHeight={handleGetClientHeight}
          onClickScrollToTopButton={scrollToTop}
        />
        <StoryMainImage
          iduser={iduser}
          idblog={idblog}
          representative={representative}
          idofficialcategory={idofficialcategory}
          title={title}
          pointcount={storyPoints.length}
          nickname={nickname}
          createdtime={createdtime}
          isfollow={isfollow}
          iscomplete={iscomplete}
          profilepath={profilepath}
          headerClientHeight={headerClientHeight}
        />
        <StoryReadMap
          key={idblog}
          isMapExpanded={isMapExpanded}
          storyPointsWithBlockKey={storyPoints}
          scrollElementRef={scrollElementRef}
          onChangeMapSize={changeMapSize}
        />
      </TopAreaWrapper>
      <BottomAreaWrapper
        ref={scrollElementRef}
        headerClientHeight={headerClientHeight}
        onScroll={handleScroll}
      >
        <DetailContents
          summary={summary}
          estimatedtime={estimatedtime}
          storyContentRef={storyContentRef}
          scrollElementRef={scrollElementRef}
          headerClientHeight={headerClientHeight}
          storyPointsWithBlockKey={storyPoints}
          onClickPlayStory={handleClickPlayStory}
        />

        <StoryReadButtonGroup
          iduser={iduser}
          idblog={idblog}
          isscrap={isscrap}
          playable={playable}
          title={title}
          islike={islike}
          replycountsum={replycountsum}
          likecount={likecount}
        />
      </BottomAreaWrapper>
    </>
  );
};

export default PlayStoryDetail;

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
