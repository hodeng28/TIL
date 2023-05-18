import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import {
  useEffect,
  useRef,
  useState,
  Fragment,
  RefObject,
  Dispatch
} from 'react';
import { shouldNotForwardProp } from '@/utils/helpers';
import useStoryContent from '@/hooks/useStoryContent';
import { useAtomValue } from 'jotai';
import { elementInformationAtom } from '@/atoms/storyReadAtom';
import DOMPurify from 'dompurify';
import Divider from '@/components/common/Divider';
import { isPreviewPageAtom } from '@/atoms/storyWriteAtom';
import { useRouter } from 'next/router';
import { storyReadScrollPositionsAtom } from '@/atoms/isCurrentPageVisitedByBackspaceAtom';
import { STORY_READ_PAGE_CSS } from '@/consts/css';
import { getNumberFromString } from '@/utils/regex';

interface StoryContentProps {
  isAllImagesLoaded: boolean;
  setIsAllImagesLoaded: Dispatch<boolean>;
  scrollElementRef: RefObject<HTMLDivElement>;
  storyContentRef: RefObject<HTMLDivElement>;
  headerClientHeight: number;
  storyPointsWithBlockKey: StoryPointWithBlockKey[];
}

const StoryContent = ({
  isAllImagesLoaded,
  setIsAllImagesLoaded,
  scrollElementRef,
  storyContentRef,
  headerClientHeight,
  storyPointsWithBlockKey
}: StoryContentProps) => {
  const router = useRouter();
  const calcurateElementInformation = useStoryContent({
    storyContentRef,
    storyPointsWithBlockKey
  });

  const isPreviewPage = useAtomValue(isPreviewPageAtom);
  const { storyContentClientHeight } = useAtomValue(elementInformationAtom);
  const [storyContentWrapperHeight, setStoryContentWrapperHeight] = useState(0);
  const storyReadScrollPositions = useAtomValue(storyReadScrollPositionsAtom);
  const [dummyHeightForScroll, setDummyHeightForScroll] = useState(0);
  const totalImageCountRef = useRef<number | null>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  const pathWithoutOrigin = router.asPath;
  const wrapperHeight = pathWithoutOrigin
    ? storyReadScrollPositions[pathWithoutOrigin]?.height
    : undefined;

  useEffect(() => {
    const storyRecommendationComponentHeight = isPreviewPage ? 0 : 384;

    const remainHeight =
      storyContentClientHeight +
      getNumberFromString(STORY_READ_PAGE_CSS.HEIGHT.BUTTON_GROUP) +
      storyRecommendationComponentHeight;

    if (remainHeight < storyContentWrapperHeight) {
      setDummyHeightForScroll(storyContentWrapperHeight - remainHeight + 20);
    } else if (
      dummyHeightForScroll !== 0 &&
      remainHeight - dummyHeightForScroll - 20 > storyContentWrapperHeight
    ) {
      setDummyHeightForScroll(0);
    }
  }, [
    headerClientHeight,
    dummyHeightForScroll,
    isPreviewPage,
    storyContentClientHeight,
    storyContentWrapperHeight
  ]);

  useEffect(() => {
    if (isAllImagesLoaded) {
      return;
    }

    const allImagesInStoryContent:
      | HTMLCollectionOf<HTMLImageElement>
      | undefined = storyContentRef.current?.getElementsByTagName('img');

    const tagsToRemoveEventHandler: HTMLImageElement[] = [];

    const handleImageLoadingComplete = () => {
      if (totalImageCountRef.current) {
        totalImageCountRef.current -= 1;

        if (!isAllImagesLoaded && totalImageCountRef.current === 0) {
          setIsAllImagesLoaded(true);
        }
      }
    };

    if (allImagesInStoryContent) {
      totalImageCountRef.current = allImagesInStoryContent.length;

      Array.from(allImagesInStoryContent).forEach((imgTag) => {
        imgTag.addEventListener('load', handleImageLoadingComplete);
        tagsToRemoveEventHandler.push(imgTag);
      });
    }

    return () => {
      tagsToRemoveEventHandler.forEach((imgTag) => {
        imgTag.removeEventListener('load', handleImageLoadingComplete);
      });
    };
  }, [isAllImagesLoaded, setIsAllImagesLoaded, storyContentRef]);

  useEffect(() => {
    if (totalImageCountRef.current === 0 && isAllImagesLoaded) {
      setStoryContentWrapperHeight(
        scrollElementRef?.current?.clientHeight || 0
      );

      calcurateElementInformation();
    }
  }, [
    router.query.storyId,
    isAllImagesLoaded,
    scrollElementRef,
    totalImageCountRef,
    calcurateElementInformation
  ]);

  return (
    <Wrapper ref={storyContentRef} height={wrapperHeight}>
      {storyPointsWithBlockKey?.map(
        (
          {
            PointName,
            koAddress,
            enAddress,
            Latitude,
            Longitude,
            editorValue
          }: StoryPointWithBlockKey,
          index: number
        ) => {
          // (kyh) todo: 데이터를 받을때부터 가공해서 내려주기
          const isAddressExist =
            !!koAddress ||
            !!enAddress ||
            (!!koAddress && !!koAddress.length) ||
            (!!enAddress && !!enAddress.length);

          return (
            <Fragment key={`${Latitude}-${Longitude}-${index}`}>
              <StoryPointWrapper className="story-point">
                <StoryPointHeaderWrapper>
                  <MarkerIconWrapper>
                    <Image
                      alt="마커 아이콘"
                      layout="fixed"
                      width="20px"
                      height="20px"
                      src="/images/story_point.svg"
                    />
                  </MarkerIconWrapper>
                  <LocationWrapper isAddressExist={isAddressExist}>
                    {!isAddressExist ? (
                      <LocationName>{PointName}</LocationName>
                    ) : (
                      <>
                        <LocationName>{PointName}</LocationName>
                        <DetailAddress>{koAddress || enAddress}</DetailAddress>
                      </>
                    )}
                  </LocationWrapper>
                </StoryPointHeaderWrapper>
                {isContentExistInPoint(editorValue) ? (
                  <ContentWrapper
                    ref={contentWrapperRef}
                    dangerouslySetInnerHTML={
                      editorValue
                        ? {
                            __html: DOMPurify.sanitize(editorValue)
                          }
                        : undefined
                    }
                  />
                ) : (
                  <WithoutContent>
                    <EmptyText>작성된 내용이 없습니다.</EmptyText>
                  </WithoutContent>
                )}
              </StoryPointWrapper>
              {index !== storyPointsWithBlockKey?.length - 1 && (
                <Divider height="0.6rem" />
              )}
            </Fragment>
          );
        }
      )}
      <DummyTag dummyHeightForScroll={dummyHeightForScroll} />
    </Wrapper>
  );
};

export default StoryContent;

const Wrapper = styled(Box)<{ height: number | undefined }>(({ height }) => ({
  height: height ? height : 'auto'
}));

const StoryPointWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderColor: theme.palette.custom.grey2,
  border: '30px'
}));

const MarkerIconWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flexStart',
  justifyContent: 'center',
  flex: 1,
  paddingTop: '4px'
}));

const WithoutContent = styled(Box)(() => ({
  display: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  height: '7rem'
}));

const EmptyText = styled(Typography)(() => ({
  color: '#868686'
}));

const DummyTag = styled(
  Box,
  shouldNotForwardProp('dummyHeightForScroll')
)<{ dummyHeightForScroll: number }>(({ dummyHeightForScroll }) => ({
  width: '100%',
  height: `${dummyHeightForScroll}px`
}));

const StoryPointHeaderWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  padding: '20px 5px 16px'
}));

const LocationWrapper = styled(
  Box,
  shouldNotForwardProp('isAddressExist')
)<{
  isAddressExist: boolean;
}>(({ isAddressExist }) => ({
  flex: 7,
  marginLeft: '-0.6rem',
  display: !isAddressExist ? 'flex' : 'block',
  alignItems: !isAddressExist ? 'center' : 'normal'
}));

const LocationName = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: '16px'
}));

const DetailAddress = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  color: theme.palette.custom.grey
}));

const ContentWrapper = styled(Box)(() => ({
  width: '100%',
  padding: '0 1rem 1rem',

  '& > p': {
    margin: 0,
    padding: '0.1rem 0'
  },

  '& > figure': {
    width: '100%',
    margin: 0
  },
  '& > figure > img': {
    width: '100%',
    padding: '0.1rem 0',
    borderRadius: '8px'
  },
  '& > p > img': {
    padding: '0.1rem 0',
    width: '100%',
    borderRadius: '8px'
  }
}));

const isContentExistInPoint = (editorValue: string | undefined) =>
  editorValue && editorValue.replace(' ', '').length !== 0;
