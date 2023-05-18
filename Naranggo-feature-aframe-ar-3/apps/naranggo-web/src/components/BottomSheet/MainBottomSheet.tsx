import { useState, useEffect, RefObject, useRef, useCallback } from 'react';
import { Stack, styled, Typography, Button, debounce } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import router, { useRouter } from 'next/router';
import Image from 'next/image';
import MoreButton from '../Button/MoreButton';
import useStoryListDisplay, {
  SortedType,
  SortingDirectionType
} from '@/hooks/useStoryListDisplay';
import { BaseCard } from '@naranggo/storybook';
import { useAtom, useAtomValue } from 'jotai';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import { getStoryImage, getProfileImage } from '@/utils/image';
import theme from '@/utils/theme';
import { showDate } from '@/utils/time';
import {
  FixedSizeList,
  FixedSizeList as List,
  ListChildComponentProps
} from 'react-window';
import { useWindowSize } from '@/hooks/useWindowResize';
import DisplayContainer from '@/components/login/DisplayContainer';
import { isStoryListScrollTriggeredAtom } from '@/atoms/storyPageAtom';

interface MainBottomSheetProps {
  onMarkerStory: boolean;
  storyList: StoryItem[];
  isLoading?: boolean;
  sheetRef: RefObject<BottomSheetRef>;
  focusRef: RefObject<HTMLButtonElement>;
  queryKey: string | string[];
  setSelectMarkerId: (id?: number) => void;
}

const MainBottomSheet = ({
  onMarkerStory,
  storyList = [],
  isLoading,
  sheetRef,
  focusRef,
  queryKey,
  setSelectMarkerId
}: MainBottomSheetProps) => {
  const [currentStoryList, setCurrentStoryList] =
    useState<StoryItem[]>(storyList);
  const [sheetScroll, setSheetScroll] = useState(0);
  const listRef = useRef<FixedSizeList>(null);

  const windowHeight = useWindowSize()[1];

  const { iduser: loggedInUserId, accesstoken } =
    useAtomValue(loginProfileAtom);

  const router = useRouter();

  const { btnText, changeSortBtnText } = useStoryListDisplay({
    storyList,
    currentStoryList,
    setCurrentStoryList
  });

  const handleClickCard = (idblog: number, playable: number) =>
    playable === 1
      ? router.push(`/play/${idblog}`)
      : router.push(`/story/${idblog}`);

  const handleClickSortBtn = debounce(() => {
    changeSortBtnText(btnText);

    if (listRef) {
      listRef.current?.scrollTo(0);
    }
  }, 150);

  const [isStoryListScrollTriggered, setIsStoryListScrollTriggered] = useAtom(
    isStoryListScrollTriggeredAtom
  );

  useEffect(() => {
    if (isStoryListScrollTriggered) {
      listRef?.current?.scrollToItem(0);
      setIsStoryListScrollTriggered(false);
    }
  }, [listRef, isStoryListScrollTriggered, setIsStoryListScrollTriggered]);

  const changeStoryList = useCallback(
    (btnText: string) => {
      const buttonType = ['가까운순', '최신순', '좋아요순'];

      const sortType: SortedType[] = [
        { key: 'distance', direction: 'asc' },
        { key: 'createdtime', direction: 'desc' },
        { key: 'likecount', direction: 'desc' }
      ];

      const sorting = (
        key: SortedType['key'],
        direction: SortingDirectionType
      ) => {
        const sorted = [...storyList];

        sorted?.sort((a, b) => {
          if (a[key] < b[key]) {
            return direction === 'asc' ? -1 : 1;
          }
          if (a[key] > b[key]) {
            return direction === 'asc' ? 1 : -1;
          }
          return 0;
        });

        setCurrentStoryList(sorted);
      };

      switch (btnText) {
        case buttonType[0]:
          sorting(sortType[0].key, sortType[0].direction);
          break;
        case buttonType[1]:
          sorting(sortType[1].key, sortType[1].direction);
          break;
        case buttonType[2]:
          sorting(sortType[2].key, sortType[2].direction);
          break;
        default:
      }
    },
    [storyList]
  );

  useEffect(() => {
    if (btnText) {
      changeStoryList(btnText);
    }
  }, [btnText, changeStoryList]);

  const itemData = {
    currentStoryList,
    loggedInUserId,
    accesstoken,
    setSelectMarkerId,
    queryKey,
    handleClickCard
  };

  return (
    <BottomSheet
      open
      skipInitialTransition
      blocking={false}
      ref={sheetRef}
      initialFocusRef={focusRef}
      defaultSnap={({ maxHeight }) => maxHeight / 2}
      snapPoints={({ maxHeight, height }) => {
        window.sessionStorage.setItem('height', String(height));
        return [maxHeight - 75, maxHeight / 2, 125];
      }}
      expandOnContentDrag={
        sheetScroll === 0 ||
        window.sessionStorage.getItem('height') === '448' ||
        window.sessionStorage.getItem('height') === '125'
          ? true
          : false
      }
      scrollLocking={false}
      header={
        <HeaderWrapper direction="row">
          <PointTextWrapper>
            <TextWrapper>
              <Image
                key={'pen'}
                src={'/images/main_pen.png'}
                alt="포인트"
                width={20}
                height={20}
              />
              {onMarkerStory ? '포인트에 ' : '주변에 '}
              <StoryCount>{currentStoryList.length}개</StoryCount>의 스토리가
              있어요.
            </TextWrapper>
          </PointTextWrapper>
          <SortBtnArea direction="row" onClick={handleClickSortBtn}>
            <SortBtn disabled={isLoading}>{btnText}</SortBtn>
            <KeyboardArrowDownIcon />
          </SortBtnArea>
        </HeaderWrapper>
      }
    >
      <Wrapper>
        {currentStoryList.length === 0 ? (
          <NoListTypography>첫 스토리 작가가 되어보세요!</NoListTypography>
        ) : (
          <List
            ref={listRef}
            itemData={itemData}
            onScroll={({ scrollOffset }) => {
              setSheetScroll(scrollOffset);
            }}
            height={windowHeight - 200}
            width="100%"
            itemSize={270}
            itemCount={currentStoryList.length}
            overscanCount={3}
          >
            {CardList}
          </List>
        )}
      </Wrapper>
    </BottomSheet>
  );
};

export default MainBottomSheet;

const CardList = ({ index, style, data }: ListChildComponentProps) => {
  const {
    currentStoryList,
    loggedInUserId,
    accesstoken,
    setSelectMarkerId,
    queryKey,
    handleClickCard
  } = data;
  const storyItem = currentStoryList[index];
  const {
    idblog,
    lat,
    lng,
    createdtime,
    representative,
    profilepath,
    playable,
    iduser,
    isofficial
  } = storyItem;

  return (
    <BaseCard
      key={`${idblog}${lat}${lng}`}
      storyItem={storyItem}
      createdtime={showDate(createdtime)}
      representativeImageUrl={getStoryImage('thumbnails50', representative)}
      profileImageUrl={getProfileImage('profile', profilepath)}
      onClickCard={() => handleClickCard(idblog, playable)}
      onClickProfile={() => {
        if (Reflect.has(router.query, 'id')) {
          router.push({
            pathname: `/profile/${iduser}`,
            query: {
              id: router.query.id
            }
          });

          return;
        }
        router.push(`/profile/${iduser}`);
      }}
      variant="topBtn"
      listItemStyle={style}
    >
      <DisplayContainer>
        <MoreButton
          userId={storyItem.iduser}
          loggedInUserId={loggedInUserId}
          isscrap={storyItem.isscrap}
          accesstoken={accesstoken}
          idblog={storyItem.idblog}
          isofficial={isofficial}
          setSelectMarkerId={setSelectMarkerId}
          type="Story"
          queryKey={queryKey}
          reportParamOptions={{
            iduser: storyItem.iduser,
            idblog: storyItem.idblog
          }}
        />
      </DisplayContainer>
    </BaseCard>
  );
};

const Wrapper = styled('div')(() => ({
  height: '100%',
  paddingBottom: '72px',
  'msOverflowStyle': 'none' /* IE and Edge */,
  'scrollbarWidth': 'none' /* Firefox */,
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

const HeaderWrapper = styled(Stack)(() => ({
  justifyContent: 'space-between',
  marginBottom: '8px',
  padding: '0 1rem'
}));

const SortBtnArea = styled(Stack)(() => ({
  justifyContent: 'flex-end',
  alignItems: 'center',
  display: 'content',

  '& .MuiButton-root': {
    width: 'fit-content',
    minWidth: 'auto',
    border: 'none',
    color: '#000000'
  }
}));

const PointTextWrapper = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  fontSize: '.875rem'
}));

const StoryCount = styled(Typography)(() => ({
  display: 'contents',
  fontWeight: 'bold',
  fontSize: '.875rem'
}));

const SortBtn = styled(Button)(() => ({
  width: '25%',
  padding: 0,
  color: theme.palette.custom.grey3,
  fontSize: '0.75rem',
  fontWeight: 'bold',
  border: '1px solid ' + theme.palette.custom.grey3,
  borderRadius: '25px',
  backgroundColor: '#fff',
  '&:hover': {
    backgroundColor: '#fff'
  }
}));

const TextWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  alignItems: 'center'
}));

const NoListTypography = styled(Typography)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%)',
  whiteSpace: 'nowrap',
  color: '#868686'
}));
