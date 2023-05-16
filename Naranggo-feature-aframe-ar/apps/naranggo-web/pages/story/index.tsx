import { RefObject, useRef, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import withAuth from '@/components/withAuth';
import BottomModal from '@/components/Modal/BottomModal';
import FilterTab from '@/components/common/Tab/FilterTab';
import { styled, Box, Tabs, Tab, Button, IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { showDate } from '@/utils/time';
import { useAtomValue, useSetAtom } from 'jotai';
import router, { useRouter } from 'next/router';
import MoreButton from '@/components/Button/MoreButton';
import { getStoryImage, getProfileImage } from '@/utils/image';
import { BaseCard } from '@naranggo/storybook';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import {
  useInfiniteList,
  StoryListRequestParam,
  getStoryList
} from '@/components/story/queries';
import useInfiniteScrollWithQuery from '@/hooks/useInfiniteScrollWithQuery';
import useLocationPermissionStatusChange from '@/hooks/useLocationPermissionStatusChange';
import useUserPosition from '@/hooks/useUserPosition';
import usePermission from '@/hooks/usePermission';
import {
  FixedSizeList,
  ListChildComponentProps,
  ListOnScrollProps
} from 'react-window';
import { shouldNotForwardProp } from '@/utils/helpers';
import { useWindowSize } from '@/hooks/useWindowResize';
import useListScrollOffset from '@/hooks/useListScrollOffset';
import useStoryListRestoration from '@/hooks/useStoryListRestoration';
import isBottomModalOpenAtom from '@/atoms/isBottomModalOpenAtom';
import DisplayContainer from '@/components/login/DisplayContainer';
import { isLoggedInAtom } from '@/atoms/webLoginAtom';

interface StoryListProps {
  iduser: number;
  accesstoken: string;
  userPosition: MapCoordinate | undefined;
  orderType: 1 | 2 | 3;
  storyFilterPeriod: number;
  totalListRef?: RefObject<FixedSizeList>;
  followingListRef?: RefObject<FixedSizeList>;
  handleScroll: (
    { scrollOffset }: ListOnScrollProps,
    appliedTab: 'total' | 'follow'
  ) => void;
  onClickCard: (idblog: number) => void;
}

interface StoryProps {
  containerRef: RefObject<HTMLDivElement>;
}

export type SortItem = {
  text: '인기순' | '최신순' | '가까운순';
  checked: boolean;
  orderType: 1 | 2 | 3;
};

export interface StoryPageInformation {
  activeTab: 0 | 1;
  scrollTop: number;
}

const Story: NextPageWithLayout = ({ containerRef }: StoryProps) => {
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);

  const {
    activeTab,
    storySort,
    apliedFilter,
    periodFilter,
    totalListRef,
    followingListRef,
    cancleApplingFilter,
    handleChangeTab,
    handleScroll,
    handleClickSortBtn,
    handleClickSortStory,
    handleClickFilterPeriod,
    handleResetFilter,
    handleChangeFromAllowToDisallow
  } = useStoryListRestoration();

  const { userPosition } = useUserPosition();
  const { targetPermissionStatus: LOCATION, checkIfPossibleToUseFeature } =
    usePermission('LOCATION');

  useLocationPermissionStatusChange({
    userPosition,
    LOCATION,
    storySort,
    isStoryListPage: true,
    handleClickSortBtn,
    handleChangeFromAllowToDisallow
  });

  const { iduser, accesstoken } = useAtomValue(loginProfileAtom);

  const setIsBottomModalOpen = useSetAtom(isBottomModalOpenAtom);

  const handleClickCard = (idblog: number) => router.push(`/story/${idblog}`);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  return (
    <Box ref={listRef}>
      <TabsWrapper>
        <StyledTabs value={activeTab} onChange={handleChangeTab}>
          <StyledTab label="전체" />
          {isLoggedIn || window.isWebViewAccess ? (
            <StyledTab label="팔로잉" />
          ) : (
            <DisplayContainer pathName="/story" activeTab={1}>
              <StyledTab label="팔로잉" />
            </DisplayContainer>
          )}
        </StyledTabs>
      </TabsWrapper>
      <FilterTab tabValue={activeTab} index={0}>
        {activeTab === 0 && (
          <TotalStoryList
            iduser={iduser}
            totalListRef={totalListRef}
            accesstoken={accesstoken}
            userPosition={userPosition}
            orderType={
              storySort.find((sortItem) => sortItem.checked === true)
                ?.orderType as 1 | 2 | 3
            }
            storyFilterPeriod={
              periodFilter.find((sortItem) => sortItem.checked === true)
                ?.date as 0 | 1 | 6 | 12
            }
            onClickCard={(idblog) => {
              handleClickCard(idblog);
            }}
            handleScroll={handleScroll}
          />
        )}
      </FilterTab>
      <FilterTab tabValue={activeTab} index={1}>
        {activeTab === 1 && (
          <FollowingStoryList
            iduser={iduser}
            followingListRef={followingListRef}
            accesstoken={accesstoken}
            userPosition={userPosition}
            storyFilterPeriod={
              periodFilter.find((sortItem) => sortItem.checked === true)
                ?.date as 0 | 1 | 6 | 12
            }
            orderType={
              storySort.find((sortItem) => sortItem.checked === true)
                ?.orderType as 1 | 2 | 3
            }
            onClickCard={(idblog) => {
              handleClickCard(idblog);
            }}
            handleScroll={handleScroll}
          />
        )}
      </FilterTab>
      <BottomModal
        title="필터 선택"
        contentsTitle="스토리 정렬"
        period={apliedFilter.storyFilter}
        onClose={cancleApplingFilter}
        onClickFilterData={handleClickFilterPeriod}
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
    </Box>
  );
};

Story.getLayout = (page: React.ReactElement) => {
  // 추후 수정
  return (
    <ScrollWrapper>
      <MainLayout
        pageName="블로그 스토리"
        options={{ search: true, storySortFilter: true, notification: true }}
      >
        {page}
      </MainLayout>
    </ScrollWrapper>
  );
};

export default withAuth(Story);

const CardList = ({ data, index, style }: ListChildComponentProps) => {
  const { storyList, iduser, accesstoken, queryKey, onClickCard } = data;
  const storyItem = storyList[index];

  return (
    <Box
      component="div"
      key={storyItem.idblog}
      style={style}
      sx={{ padding: '8px 16px' }}
    >
      <BaseCard
        variant="topBtn"
        key={storyItem.idblog}
        storyItem={storyItem}
        createdtime={showDate(storyItem.createdtime)}
        representativeImageUrl={getStoryImage(
          'thumbnails50',
          storyItem.representative
        )}
        profileImageUrl={getProfileImage('profile', storyItem.profilepath)}
        onClickCard={() => onClickCard(storyItem.idblog)}
        onClickProfile={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.stopPropagation();
          router.push(`/profile/${storyItem.iduser}`);
        }}
      >
        <DisplayContainer>
          <MoreButton
            userId={storyItem.iduser}
            loggedInUserId={iduser}
            accesstoken={accesstoken}
            isscrap={storyItem.isscrap}
            idblog={storyItem.idblog}
            type="Story"
            queryKey={queryKey}
            reportParamOptions={{
              iduser: storyItem.iduser,
              idblog: storyItem.idblog
            }}
          />
        </DisplayContainer>
      </BaseCard>
    </Box>
  );
};

const TotalStoryList = ({
  iduser,
  accesstoken,
  userPosition,
  orderType,
  totalListRef,
  handleScroll,
  storyFilterPeriod,
  onClickCard
}: StoryListProps) => {
  const listRef = useRef<FixedSizeList>(null);
  const { setTotalScrollOffsetAtom } = useListScrollOffset(listRef, 'total');
  const [windowWidth, windowHeight] = useWindowSize();
  const currentTime = Date.now();

  const {
    data: storyList,
    error,
    ObservationComponent
  } = useInfiniteScrollWithQuery<StoryItem>(
    useInfiniteList<StoryItem, StoryListRequestParam>({
      queryKey: ['storyList', `${orderType}`, `${storyFilterPeriod}`],
      apiParam: {
        pageNo: 1,
        period: storyFilterPeriod,
        orderType,
        filterType: 1,
        accessId: iduser,
        accesstoken,
        lat: userPosition?.lat || 0,
        lng: userPosition?.lng || 0,
        timeStamp: currentTime
      },
      queryFn: getStoryList,
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

  const itemData = {
    storyList,
    iduser,
    accesstoken,
    queryKey: ['storyList', `${orderType}`, `${storyFilterPeriod}`],
    onClickCard
  };

  if (!storyList || error) {
    return <></>;
  }

  return (
    <Wrapper>
      <FixedSizeList
        ref={totalListRef}
        height={windowHeight - 228} // 180은 window에서 헤더, 하단 탭 높이를 뺀 것임
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
    </Wrapper>
  );
};

const FollowingStoryList = ({
  iduser,
  accesstoken,
  userPosition,
  orderType,
  followingListRef,
  handleScroll,
  storyFilterPeriod,
  onClickCard
}: StoryListProps) => {
  const listRef = useRef<FixedSizeList>(null);
  const { setFollowingScrollOffsetAtom } = useListScrollOffset(
    listRef,
    'following'
  );
  const [windowWidth, windowHeight] = useWindowSize();
  const currentTime = Date.now();

  const {
    data: storyList,
    error,
    // isFetching,
    ObservationComponent
  } = useInfiniteScrollWithQuery<StoryItem>(
    useInfiniteList<StoryItem, StoryListRequestParam>({
      queryKey: ['followList', `${orderType}`, `${storyFilterPeriod}`],
      apiParam: {
        pageNo: 1,
        orderType,
        period: storyFilterPeriod,
        filterType: 2,
        accessId: iduser,
        accesstoken: accesstoken,
        lat: userPosition?.lat || 0,
        lng: userPosition?.lng || 0,
        timeStamp: currentTime
      },
      queryFn: getStoryList,
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

  const itemData = {
    storyList,
    iduser,
    accesstoken,
    queryKey: ['followList', `${orderType}`, `${storyFilterPeriod}`],
    onClickCard
  };

  if (!storyList || error) {
    return <></>;
  }

  return (
    <Box>
      {storyList.length === 0 ? (
        <EmptyMessageWrapper>
          <div>내가 팔로우하는 회원의 글이 없습니다</div>
        </EmptyMessageWrapper>
      ) : (
        <Wrapper>
          <FixedSizeList
            ref={followingListRef}
            height={windowHeight - 228}
            itemCount={storyList.length}
            itemSize={270}
            width="100%"
            itemData={itemData}
            onItemsRendered={({ overscanStartIndex }) =>
              setOverscanStopIndex(overscanStartIndex)
            }
            onScroll={(scrollInfor) => {
              handleScroll(scrollInfor, 'follow');
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
              onClick={() => followingListRef?.current?.scrollToItem(0)}
            >
              <ArrowUpwardIcon />
            </ScrollTopBtn>
          )}
        </Wrapper>
      )}
    </Box>
  );
};

const ScrollWrapper = styled(Box)(() => ({
  '& .MuiBox-root': { overflow: 'hidden' }
}));

const Wrapper = styled(Box)(() => ({
  '& .MuiList-root': {
    'div.MuiBox-root + div.MuiBox-root': {
      paddingTop: '5px',
      borderTop: '1px solid #dbdbdb'
    }
  }
}));

const TabsWrapper = styled(Box)(() => ({
  borderBottom: '1px solid #ebedf0'
}));

const StyledTabs = styled(Tabs)(() => ({
  height: '48px',
  '& .MuiTabs-indicator': {
    borderBottom: '2px solid #201A1B'
  }
}));

const StyledTab = styled(Tab)(() => ({
  width: '50%',
  color: '#201A1B',
  opacity: 1,

  '&.Mui-selected': {
    color: '#201A1B',
    fontWeight: 'bold'
  }
}));

const EmptyMessageWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '75vh',
  color: '#868686'
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
