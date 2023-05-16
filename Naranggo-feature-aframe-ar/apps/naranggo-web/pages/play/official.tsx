import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState
} from 'react';
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  styled,
  Tab,
  Tabs,
  Typography
} from '@mui/material';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FilterTab from '@/components/common/Tab/FilterTab';
import MoreButton from '@/components/Button/MoreButton';
import withAuth from '@/components/withAuth';
import BottomModal from '@/components/Modal/BottomModal';
import MainLayout from '@/components/layout/MainLayout';
import {
  useInfiniteList,
  PlayStoryListRequestParam,
  getPlayStoryList
} from '@/components/story/queries';
import useLocationPermissionStatusChange from '@/hooks/useLocationPermissionStatusChange';
import usePlayStoryListRestoration from '@/hooks/usePlayStoryListRestoration';
import useUserPosition from '@/hooks/useUserPosition';
import usePermission from '@/hooks/usePermission';
import { useInfiniteScrollWithQueryInPlayStory } from '@/hooks/useInfiniteScrollWithQuery';
import { useWindowSize } from '@/hooks/useWindowResize';
import { BaseCard } from '@naranggo/storybook';
import { showDate } from '@/utils/time';
import { shouldNotForwardProp } from '@/utils/helpers';
import { getStoryImage, getProfileImage } from '@/utils/image';
import router, { useRouter } from 'next/router';
import { useAtomValue, useSetAtom } from 'jotai';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import isBottomModalOpenAtom from '@/atoms/isBottomModalOpenAtom';
import {
  ListChildComponentProps,
  FixedSizeList,
  ListOnScrollProps
} from 'react-window';
import DisplayContainer from '@/components/login/DisplayContainer';

interface StoryListProps {
  iduser: number;
  accesstoken: string;
  userPosition: MapCoordinate | undefined;
  orderType: 1 | 2 | 3;
  totalListRef?: RefObject<FixedSizeList>;
  baekjeListRef?: RefObject<FixedSizeList>;
  koreaIndependenceListRef?: RefObject<FixedSizeList>;
  handleScroll: (
    { scrollOffset }: ListOnScrollProps,
    appliedTab: 'total' | 'baekje' | 'koreaIndependence'
  ) => void;
  onClickCard: (idblog: number) => void;
  setPlayStoryData?: any;
}

export type SortItem = {
  text: '인기순' | '최신순' | '가까운순';
  checked: boolean;
  orderType: 1 | 2 | 3;
};

const Official: NextPageWithLayout = () => {
  const router = useRouter();
  const [playStoryData, setPlayStoryData] = useState<PlayStoryData>();
  const { userPosition } = useUserPosition();
  const { iduser, accesstoken } = useAtomValue(loginProfileAtom);
  const setIsBottomModalOpen = useSetAtom(isBottomModalOpenAtom);

  const {
    activeTab,
    storySort,
    totalListRef,
    baekjeListRef,
    koreaIndependenceListRef,
    apliedFilter,
    cancleApplingFilter,
    handleChangeTab,
    handleScroll,
    handleClickSortBtn,
    handleClickSortStory,
    handleResetFilter
  } = usePlayStoryListRestoration();

  const handleClickCard = (idblog: number) => {
    router.push(`/play/${idblog}`);
  };

  const { targetPermissionStatus: LOCATION, checkIfPossibleToUseFeature } =
    usePermission('LOCATION');

  useLocationPermissionStatusChange({
    userPosition,
    LOCATION,
    storySort,
    isStoryListPage: true,
    handleClickSortBtn
  });

  return (
    <>
      <TabsWrapper>
        <StyledTabs value={activeTab} onChange={handleChangeTab}>
          <StyledTab
            label={
              <Stack sx={{ fontSize: '14px' }}>
                전체
                <CompleteCount>
                  {playStoryData &&
                    '(' +
                      Number(playStoryData.completeallcount) +
                      '/' +
                      playStoryData.allcount +
                      ')'}
                </CompleteCount>
              </Stack>
            }
          />
          <StyledTab
            label={
              <Stack>
                대한 독립 만세!
                <CompleteCount>
                  {playStoryData &&
                    '(' +
                      Number(playStoryData.complete1count) +
                      '/' +
                      playStoryData.category1count +
                      ')'}
                </CompleteCount>
              </Stack>
            }
          />
          <StyledTab
            label={
              <Stack>
                백제의 고도, 송파
                <CompleteCount>
                  {playStoryData &&
                    '(' +
                      Number(playStoryData.complete2count) +
                      '/' +
                      playStoryData.category2count +
                      ')'}
                </CompleteCount>
              </Stack>
            }
          />
        </StyledTabs>
      </TabsWrapper>
      <FilterTab tabValue={activeTab} index={0}>
        {activeTab === 0 && (
          <TotalPayStoryList
            iduser={iduser}
            totalListRef={totalListRef}
            accesstoken={accesstoken}
            userPosition={userPosition}
            orderType={
              storySort.find((sortItem) => sortItem.checked === true)
                ?.orderType as 1 | 2 | 3
            }
            onClickCard={handleClickCard}
            handleScroll={handleScroll}
            setPlayStoryData={setPlayStoryData}
          />
        )}
      </FilterTab>

      <FilterTab tabValue={activeTab} index={1}>
        {activeTab === 1 && (
          <KoreaIndependenceList
            iduser={iduser}
            koreaIndependenceListRef={koreaIndependenceListRef}
            accesstoken={accesstoken}
            userPosition={userPosition}
            orderType={
              storySort.find((sortItem) => sortItem.checked === true)
                ?.orderType as 1 | 2 | 3
            }
            onClickCard={handleClickCard}
            handleScroll={handleScroll}
            setPlayStoryData={setPlayStoryData}
          />
        )}
      </FilterTab>

      <FilterTab tabValue={activeTab} index={2}>
        {activeTab === 2 && (
          <BaekjeList
            iduser={iduser}
            baekjeListRef={baekjeListRef}
            accesstoken={accesstoken}
            userPosition={userPosition}
            orderType={
              storySort.find((sortItem) => sortItem.checked === true)
                ?.orderType as 1 | 2 | 3
            }
            onClickCard={handleClickCard}
            handleScroll={handleScroll}
            setPlayStoryData={setPlayStoryData}
          />
        )}
      </FilterTab>
      <BottomModal
        title="필터 선택"
        contentsTitle="스토리 정렬"
        onClose={cancleApplingFilter}
        onClickResetButtn={handleResetFilter}
        onClickFilterApplyButton={handleClickSortStory}
      >
        <StyledButtonBox>
          {apliedFilter.storySort.map((storyItem: SortItem) => {
            const { text, checked, orderType } = storyItem;

            return (
              <StyledButton
                onClick={() => {
                  if (orderType === 3) {
                    if (!checkIfPossibleToUseFeature()) {
                      cancleApplingFilter();
                      setIsBottomModalOpen(false);
                      return;
                    }

                    const func =
                      checkIfPossibleToUseFeature(handleClickSortBtn);
                    func && func(orderType);
                    return;
                  }

                  handleClickSortBtn(orderType);
                }}
                data-text={text}
                key={text}
                checked={checked}
              >
                {text}
              </StyledButton>
            );
          })}
        </StyledButtonBox>
      </BottomModal>
    </>
  );
};

Official.getLayout = (page: React.ReactElement) => {
  return (
    <ScrollWrapper>
      <MainLayout
        pageName="플레이 스토리"
        options={{ search: true, playStoryFilter: true, notification: true }}
      >
        {page}
      </MainLayout>
    </ScrollWrapper>
  );
};

export default withAuth(Official);

const CardList = ({ data, index, style }: ListChildComponentProps) => {
  const {
    playStoryList,
    iduser: loggedInUserId,
    accesstoken,
    queryKey,
    onClickCard
  } = data;
  const playStoryItem = playStoryList[index];
  playStoryItem.playable = 1;

  const {
    idblog,
    createdtime,
    representative,
    profilepath,
    isscrap,
    iduser,
    isofficial
  } = playStoryItem;

  return (
    <Box
      component="div"
      key={idblog}
      style={style}
      sx={{ padding: '8px 16px' }}
    >
      <BaseCard
        variant="topBtn"
        key={idblog}
        storyItem={playStoryItem}
        createdtime={showDate(createdtime)}
        representativeImageUrl={getStoryImage('thumbnails50', representative)}
        profileImageUrl={getProfileImage('profile', profilepath)}
        onClickCard={() => onClickCard(idblog)}
        onClickProfile={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          router.push(`/profile/${iduser}`);
        }}
      >
        <DisplayContainer>
          <MoreButton
            userId={iduser}
            loggedInUserId={loggedInUserId}
            accesstoken={accesstoken}
            isscrap={isscrap}
            idblog={idblog}
            isofficial={isofficial}
            type="Story"
            queryKey={queryKey}
            reportParamOptions={{
              iduser: iduser,
              idblog: idblog
            }}
          />
        </DisplayContainer>
      </BaseCard>
    </Box>
  );
};

const TotalPayStoryList = ({
  iduser,
  accesstoken,
  userPosition,
  orderType,
  totalListRef,
  handleScroll,
  onClickCard,
  setPlayStoryData
}: StoryListProps) => {
  const [windowWidth, windowHeight] = useWindowSize();

  const {
    data: playStoryList,
    error,
    ObservationComponent
  } = useInfiniteScrollWithQueryInPlayStory<PlayStoryData>(
    useInfiniteList<PlayStoryData, PlayStoryListRequestParam>({
      queryKey: ['playStoryList', `${orderType}`],
      apiParam: {
        pageNo: 1,
        orderType,
        idOfficialCategory: 0,
        accessId: iduser,
        accesstoken: accesstoken,
        lat: userPosition?.lat || 0,
        lng: userPosition?.lng || 0
      },
      queryFn: getPlayStoryList,
      pagingType: 'PageNumber',
      pagingParamStartValue: 1,
      enabled:
        userPosition?.lng !== undefined &&
        userPosition?.lat !== undefined &&
        userPosition?.lng !== 0 &&
        userPosition?.lat !== 0
    })
  );

  const [overscanStopIndex, setOverscanStopIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    playStoryList && setPlayStoryData(playStoryList[0]);
  }, [playStoryList, setPlayStoryData]);

  if (!playStoryList || error) {
    return <></>;
  }
  const itemData = {
    playStoryList: playStoryList.map((i) => i.story).flat(),
    iduser,
    accesstoken,
    queryKey: ['playStoryList', `${orderType}`],
    onClickCard
  };

  const storyList = playStoryList.map((i) => i.story).flat();

  return (
    <>
      <FixedSizeList
        ref={totalListRef}
        height={windowHeight - 180}
        itemCount={storyList.length}
        itemSize={270}
        width="100%"
        itemData={itemData}
        onItemsRendered={({ overscanStartIndex }) => {
          setOverscanStopIndex(overscanStartIndex);
        }}
        onScroll={(scrollInfor) => {
          handleScroll(scrollInfor, 'total');
          setScrollOffset(scrollInfor.scrollOffset);
        }}
      >
        {CardList}
      </FixedSizeList>
      {overscanStopIndex > storyList.length - 10 ? (
        <ObservationComponent />
      ) : (
        <></>
      )}

      {scrollOffset > 100 && (
        <ScrollTopBtn onClick={() => totalListRef?.current?.scrollToItem(0)}>
          <ArrowUpwardIcon />
        </ScrollTopBtn>
      )}
    </>
  );
};

const KoreaIndependenceList = ({
  iduser,
  accesstoken,
  userPosition,
  orderType,
  koreaIndependenceListRef,
  handleScroll,
  onClickCard,
  setPlayStoryData
}: StoryListProps) => {
  const [windowWidth, windowHeight] = useWindowSize();

  const {
    data: KoreaIndependenceList,
    error,
    ObservationComponent
  } = useInfiniteScrollWithQueryInPlayStory<PlayStoryData>(
    useInfiniteList<PlayStoryData, PlayStoryListRequestParam>({
      queryKey: ['KoreaIndependenceList', `${orderType}`],
      apiParam: {
        pageNo: 1,
        orderType,
        idOfficialCategory: 1,
        accessId: iduser,
        accesstoken: accesstoken,
        lat: userPosition?.lat || 0,
        lng: userPosition?.lng || 0
      },
      queryFn: getPlayStoryList,
      pagingType: 'PageNumber',
      pagingParamStartValue: 1,
      enabled:
        userPosition?.lng !== undefined &&
        userPosition?.lat !== undefined &&
        userPosition?.lng !== 0 &&
        userPosition?.lat !== 0
    })
  );

  const [overscanStopIndex, setOverscanStopIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    KoreaIndependenceList && setPlayStoryData(KoreaIndependenceList[0]);
  }, [KoreaIndependenceList, setPlayStoryData]);

  if (!KoreaIndependenceList || error) {
    return <></>;
  }

  const itemData = {
    playStoryList: KoreaIndependenceList.map((i) => i.story).flat(),
    iduser,
    accesstoken,
    queryKey: ['KoreaIndependenceList', `${orderType}`],
    onClickCard
  };

  const storyList = KoreaIndependenceList.map((i) => i.story).flat();

  return (
    <>
      <FixedSizeList
        ref={koreaIndependenceListRef}
        height={windowHeight - 180}
        itemCount={storyList.length}
        itemSize={270}
        width="100%"
        itemData={itemData}
        onItemsRendered={({ overscanStartIndex }) => {
          setOverscanStopIndex(overscanStartIndex);
        }}
        onScroll={(scrollInfor) => {
          handleScroll(scrollInfor, 'total');
          setScrollOffset(scrollInfor.scrollOffset);
        }}
      >
        {CardList}
      </FixedSizeList>
      {overscanStopIndex > storyList.length - 10 ? (
        <ObservationComponent />
      ) : (
        <></>
      )}

      {scrollOffset > 100 && (
        <ScrollTopBtn
          onClick={() => koreaIndependenceListRef?.current?.scrollToItem(0)}
        >
          <ArrowUpwardIcon />
        </ScrollTopBtn>
      )}
    </>
  );
};

const BaekjeList = ({
  iduser,
  accesstoken,
  userPosition,
  orderType,
  baekjeListRef,
  handleScroll,
  onClickCard,
  setPlayStoryData
}: StoryListProps) => {
  const [windowWidth, windowHeight] = useWindowSize();

  const {
    data: BaekjeList,
    error,
    ObservationComponent
  } = useInfiniteScrollWithQueryInPlayStory<PlayStoryData>(
    useInfiniteList<PlayStoryData, PlayStoryListRequestParam>({
      queryKey: ['BaekjeList', `${orderType}`],
      apiParam: {
        pageNo: 1,
        orderType,
        idOfficialCategory: 2,
        accessId: iduser,
        accesstoken: accesstoken,
        lat: userPosition?.lat || 0,
        lng: userPosition?.lng || 0
      },
      queryFn: getPlayStoryList,
      pagingType: 'PageNumber',
      pagingParamStartValue: 1,
      enabled:
        userPosition?.lng !== undefined &&
        userPosition?.lat !== undefined &&
        userPosition?.lng !== 0 &&
        userPosition?.lat !== 0
    })
  );

  const [overscanStopIndex, setOverscanStopIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    BaekjeList && setPlayStoryData(BaekjeList[0]);
  }, [BaekjeList, setPlayStoryData]);

  if (!BaekjeList || error) {
    return <></>;
  }

  const itemData = {
    playStoryList: BaekjeList.map((i) => i.story).flat(),
    iduser,
    accesstoken,
    queryKey: ['BaekjeList', `${orderType}`],
    onClickCard
  };

  const storyList = BaekjeList.map((i) => i.story).flat();

  return (
    <>
      <FixedSizeList
        ref={baekjeListRef}
        height={windowHeight - 180}
        itemCount={storyList.length}
        itemSize={270}
        width="100%"
        itemData={itemData}
        onItemsRendered={({ overscanStartIndex }) => {
          setOverscanStopIndex(overscanStartIndex);
        }}
        onScroll={(scrollInfor) => {
          handleScroll(scrollInfor, 'total');
          setScrollOffset(scrollInfor.scrollOffset);
        }}
      >
        {CardList}
      </FixedSizeList>
      {overscanStopIndex > storyList.length - 10 ? (
        <ObservationComponent />
      ) : (
        <></>
      )}

      {scrollOffset > 100 && (
        <ScrollTopBtn onClick={() => baekjeListRef?.current?.scrollToItem(0)}>
          <ArrowUpwardIcon />
        </ScrollTopBtn>
      )}
    </>
  );
};

const ScrollWrapper = styled(Box)(() => ({
  '& .MuiBox-root': {
    'msOverflowStyle': 'none' /* IE and Edge */,
    'scrollbarWidth': 'none' /* Firefox */,
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  }
}));

const TabsWrapper = styled(Box)(() => ({
  borderBottom: '1px solid #ebedf0',

  '& .MuiButtonBase-root': {
    color: '#A9A9A9'
  },

  '& .MuiButtonBase-root.Mui-selected': {
    color: '#000000'
  }
}));

const StyledTabs = styled(Tabs)(() => ({
  '& .MuiTabs-indicator': {
    borderBottom: '2px solid #201A1B'
  }
}));

const StyledTab = styled(Tab)(() => ({
  width: '33.3%',
  padding: ' 12px 6px',
  color: '#201A1B',

  '&.Mui-selected': {
    color: '#201A1B',
    fontWeight: 'bold'
  }
}));

const CompleteCount = styled(Typography)(() => ({
  fontSize: '12px'
}));

const StyledButtonBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: '26px',
  gap: '15px',
  borderBottom: '1px solid #e6e6e6'
}));

const StyledButton = styled(
  Button,
  shouldNotForwardProp('checked')
)<{ checked?: boolean }>(({ checked }) => ({
  flex: 1,
  padding: '6.5px 0',
  borderRadius: '10px !important',
  border: '1px solid #e9e9e9 !important',
  color: checked ? '#ffffff' : '#7f7f7f',
  backgroundColor: checked ? '#726de6' : '#e9e9e9',
  fontSize: '13px',
  lineHeight: '13px',

  '&:hover': {
    backgroundColor: checked ? '#726de6 !important' : '#e9e9e9 !important'
  }
}));

const ScrollTopBtn = styled(IconButton)(() => ({
  position: 'absolute',
  bottom: '5rem',
  right: '1.5rem',
  zIndex: 100,
  backgroundColor: '#fff',
  '&:hover': { backgroundColor: '#fff !important' },
  boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.2)'
}));
