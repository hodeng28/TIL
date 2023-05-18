import { Box, Menu, MenuItem, Stack, styled } from '@mui/material';
import ProfileInfoArea from '@/components/profile/ProfileInfoArea';
import withAuth from '@/components/withAuth';
import Header from '@/components/Header/Header';
import { useRouter } from 'next/router';
import {
  MouseEventHandler,
  useLayoutEffect,
  useRef,
  useState,
  useEffect
} from 'react';
import useInfiniteScrollWithQuery from '@/hooks/useInfiniteScrollWithQuery';
import MoreButton from '@/components/Button/MoreButton';
import {
  getUserStoryList,
  StoryUserListRequestParam,
  useInfiniteList
} from '@/components/story/queries';
import axios from '@/api/axiosClient';
import { BaseCard } from '@naranggo/storybook';
import useUserPosition from '@/hooks/useUserPosition';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import { getStoryImage, getProfileImage } from '@/utils/image';
import { useMutation, useQueryClient } from 'react-query';
import { AxiosResponse } from 'axios';
import ReportModal from '@/components/Modal/ReportModal';
import useReport from '@/components/Modal/useReport';
import { showDate } from '@/utils/time';
import { useGetProfile } from '@/components/profile/queries';
import {
  FixedSizeList,
  ListChildComponentProps,
  ListOnScrollProps
} from 'react-window';
import { useWindowSize } from '@/hooks/useWindowResize';
import menuAnchorElAtom from '@/atoms/menuAcholElAtom';
import modalInformationAtom from '@/atoms/modalInformationAtom';
import { BaseModal } from '@naranggo/storybook';
import { visitedPageInformationAtom } from '@/atoms/visitedPageInformationAtom';
import produce from 'immer';
import { isCurrentPageVisitedByBackspaceAtom } from '@/atoms/isCurrentPageVisitedByBackspaceAtom';
import DisplayContainer from '@/components/login/DisplayContainer';
import { getCookie } from '@/utils/cookie';
import { scrollTo } from '@/utils/helpers';

const UserProfile: NextPageWithLayout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [windowWidth, windowHeight] = useWindowSize();
  const listRef = useRef<FixedSizeList>(null);
  const [overscanStopIndex, setOverscanStopIndex] = useState(0);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const currentTime = Date.now();

  let {
    query: { userId }
  } = useRouter();

  if (Array.isArray(userId)) {
    userId = userId.join('');
  }

  const { userPosition } = useUserPosition();
  const {
    accesstoken,
    iduser: loggedInUserId,
    nickname: loggedInUserNickname
  } = useAtomValue(loginProfileAtom);

  useLayoutEffect(() => {
    if (!userId) return;

    if (+userId === +loggedInUserId) {
      router.replace('/mypage');
    }
  }, [loggedInUserId, router, userId]);

  const achorElRef = useRef<HTMLButtonElement>();
  const [anchorEl, setAnchorEl] = useAtom(menuAnchorElAtom);
  const open = Boolean(anchorEl === achorElRef.current);

  const [pageName, setPageName] = useState('프로필');
  const [userInformation, setUserInformation] = useState({
    nickname: '',
    isblock: 0
  });
  const [profileInfoAreaClientHeight, setProfileInfoAreaClientHeight] =
    useState(270); // 270은 FixedSizeList 아이템의 size

  const setModalInformation = useSetAtom(modalInformationAtom);

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const { isReportModalOpen, handleOpenReportModal, handleCloseReportModal } =
    useReport();

  const handleClickMenuButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    achorElRef.current = e.currentTarget;
    setAnchorEl(e.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(null);
  const handleClickCard = (idblog: number) => router.push(`/story/${idblog}`);
  const handleRefetch = async () => refetch();
  const handleClickStoryButton = () => {
    listRef.current?.scrollToItem(1, 'start');
  };

  // 스크롤 복원 로직
  const [visitedPageInformation, setVisitedPageInformation] = useAtom(
    visitedPageInformationAtom
  );

  const isCurrentPageVisitedByBackspace = useAtomValue(
    isCurrentPageVisitedByBackspaceAtom
  );

  const restoredInformation = Reflect.has(
    visitedPageInformation.STORY_GROUP,
    router.asPath
  )
    ? visitedPageInformation.STORY_GROUP[router.asPath]
    : {
        y: 0
      };

  useLayoutEffect(() => {
    if (!Reflect.has(visitedPageInformation.STORY_GROUP, router.asPath)) {
      const nextState = produce(visitedPageInformation, (draft) => {
        draft.STORY_GROUP[router.asPath] = {
          y: 0
        };
      });

      setVisitedPageInformation(nextState);
    }
  }, [router.asPath, setVisitedPageInformation, visitedPageInformation]);

  useEffect(() => {
    if (!Reflect.has(visitedPageInformation.STORY_GROUP, router.asPath)) {
      const nextState = produce(visitedPageInformation, (draft) => {
        draft.STORY_GROUP[router.asPath] = {
          y: 0
        };
      });

      setVisitedPageInformation(nextState);
    }
  }, [router.asPath, setVisitedPageInformation, visitedPageInformation]);

  useEffect(() => {
    if (!isCurrentPageVisitedByBackspace) {
      const nextState = produce(visitedPageInformation, (draft) => {
        draft.STORY_GROUP[router.asPath] = {
          y: 0
        };
      });

      setVisitedPageInformation(nextState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (
      Reflect.has(visitedPageInformation.STORY_GROUP, router.asPath) &&
      isCurrentPageVisitedByBackspace
    ) {
      listRef?.current?.scrollTo(restoredInformation.y);
    }
  }, [
    isCurrentPageVisitedByBackspace,
    restoredInformation.y,
    router.asPath,
    router.query,
    visitedPageInformation.STORY_GROUP
  ]);

  const {
    data: userProfileInfo,
    isLoading,
    isError,
    isIdle,
    refetch: userProfileRefetch
  } = useGetProfile(
    {
      iduser: userId ? Number(userId) : loggedInUserId,
      accessId: loggedInUserId,
      accesstoken,
      timeStamp: currentTime
    },
    {
      enabled:
        window.isWebViewAccess || getCookie('socialLoginInfo')
          ? !!userId && !!loggedInUserId && !!accesstoken.length
          : !!userId,
      onSuccess: (res) => {
        const { returnValue, data } = res;

        if (returnValue === 3) {
          setIsNotificationModalOpen(true);
          return;
        }

        if (data && data.nickname) {
          setUserInformation({
            nickname: data.nickname,
            isblock: data.isblock
          });
        }
      }
    }
  );

  const {
    data: storyList,
    error,
    refetch,
    ObservationComponent
  } = useInfiniteScrollWithQuery<StoryItem>(
    useInfiniteList<StoryItem, StoryUserListRequestParam>({
      queryKey: ['userStory', userId as string],
      apiParam: {
        iduser: userId ? +userId : 0,
        lastIdBlog: -1,
        orderType: 1,
        lat: userPosition?.lat || 0,
        lng: userPosition?.lng || 0,
        accessId: loggedInUserId,
        accesstoken: accesstoken,
        timeStamp: currentTime
      },
      queryFn: getUserStoryList,
      pagingRequestParamKey: 'lastIdBlog',
      pagingParamKey: 'idblog',
      pagingType: 'IdProperty',
      pagingParamStartValue: -1,
      enabled:
        (window.platform === 'ios'
          ? true
          : userPosition?.lng !== undefined &&
            userPosition?.lat !== undefined &&
            userPosition?.lng !== 0 &&
            userPosition?.lat !== 0) &&
        (window.isWebViewAccess || getCookie('socialLoginInfo')
          ? !!accesstoken && !!loggedInUserId
          : true) &&
        !!userId
    })
  );

  const { mutate: follow } = useMutation({
    mutationFn: async ({ iduser }: { nickname: string; iduser: number }) =>
      await axios.post(`/apis/setFollow`, {
        accesstoken,
        accessId: loggedInUserId,
        nickname: loggedInUserNickname,
        iduser
      }),
    onMutate: async () => {
      await queryClient.cancelQueries(['getProfile', userId]);

      const snapShotOfPreviousData = queryClient.getQueryData<
        AxiosResponse<ApiResponse<Profile>>
      >(['getProfile', userId]);

      if (snapShotOfPreviousData) {
        queryClient.setQueryData<AxiosResponse<ApiResponse<Profile>>>(
          ['getProfile', userId],
          {
            ...snapShotOfPreviousData,
            data: {
              ...snapShotOfPreviousData.data,
              data: {
                ...snapShotOfPreviousData.data.data,
                followercount:
                  snapShotOfPreviousData.data.data.followercount + 1,
                isfollow: 1
              }
            }
          }
        );
      }

      return {
        snapShotOfPreviousData
      };
    },
    onSuccess: () => userProfileRefetch()
  });

  const { mutate: unfollow } = useMutation({
    mutationFn: async ({ iduser }: { iduser: number }) =>
      await axios.post(`/apis/setUnFollow`, {
        accesstoken,
        accessId: loggedInUserId,
        iduser
      }),
    onMutate: async () => {
      await queryClient.cancelQueries(['getProfile', userId]);

      const snapShotOfPreviousData = queryClient.getQueryData<
        AxiosResponse<ApiResponse<Profile>>
      >(['getProfile', userId]);

      if (snapShotOfPreviousData) {
        queryClient.setQueryData<AxiosResponse<ApiResponse<Profile>>>(
          ['getProfile', userId],
          {
            ...snapShotOfPreviousData,
            data: {
              ...snapShotOfPreviousData.data,
              data: {
                ...snapShotOfPreviousData.data.data,
                followercount:
                  snapShotOfPreviousData.data.data.followercount - 1,
                isfollow: 0
              }
            }
          }
        );
      }

      return {
        snapShotOfPreviousData
      };
    },
    onSuccess: () => userProfileRefetch()
  });

  const { mutate: blockUser } = useMutation({
    mutationFn: async ({ iduser }: { iduser: number }) =>
      await axios.post(`/apis/setBlock`, {
        accesstoken,
        accessId: loggedInUserId,
        iduser
      }),
    onMutate: async () => {
      await queryClient.cancelQueries(['userStory', userId || '']);
      await queryClient.cancelQueries(['getProfile', userId]);

      const snapShotOfPreviousData = queryClient.getQueryData<
        AxiosResponse<ApiResponse<Profile>>
      >(['getProfile', userId]);

      if (snapShotOfPreviousData) {
        queryClient.setQueryData<AxiosResponse<ApiResponse<Profile>>>(
          ['getProfile', userId],
          {
            ...snapShotOfPreviousData,
            data: {
              ...snapShotOfPreviousData.data,
              data: {
                ...snapShotOfPreviousData.data.data,
                isblock: 1
              }
            }
          }
        );
      }

      return {
        snapShotOfPreviousData
      };
    },
    onSuccess: () => userProfileRefetch()
  });

  const { mutate: unBlockUser } = useMutation({
    mutationFn: async ({ iduser }: { iduser: number }) =>
      await axios.post(`/apis/setUnBlock`, {
        accesstoken,
        accessId: loggedInUserId,
        iduser
      }),
    onMutate: async () => {
      await queryClient.cancelQueries(['getProfile', userId]);

      const snapShotOfPreviousData = queryClient.getQueryData<
        AxiosResponse<ApiResponse<Profile>>
      >(['getProfile', userId]);

      if (snapShotOfPreviousData) {
        queryClient.setQueryData<AxiosResponse<ApiResponse<Profile>>>(
          ['getProfile', userId],
          {
            ...snapShotOfPreviousData,
            data: {
              ...snapShotOfPreviousData.data,
              data: {
                ...snapShotOfPreviousData.data.data,
                isblock: 0
              }
            }
          }
        );
      }

      return {
        snapShotOfPreviousData
      };
    },
    onSuccess: async () => {
      await handleRefetch();
      await userProfileRefetch();
    }
  });

  const handleClickFollowButton = async (
    nickname: string,
    iduser: number,
    isfollow: 0 | 1
  ) => {
    if (!isfollow) {
      await follow({ nickname, iduser });
    } else {
      await unfollow({ iduser });
    }
  };

  const handleClickBlockConfirmButton = async () => {
    if (userInformation.isblock) {
      await unBlockUser({ iduser: (userId && +userId) || 0 });
    } else {
      await blockUser({ iduser: (userId && +userId) || 0 });
    }
  };

  const handleClickBlockButton = () => {
    if (!userInformation.isblock) {
      setModalInformation({
        type: 'BLOCK_USER',
        handleClickRightBtn: () => {
          handleClickBlockConfirmButton();
        }
      });
    } else {
      setModalInformation({
        type: 'UNBLOCK_USER',
        nickname: userInformation.nickname,
        handleClickRightBtn: () => {
          handleClickBlockConfirmButton();
        }
      });
    }

    handleCloseMenu();
  };

  const handleScroll = ({ scrollOffset }: ListOnScrollProps) => {
    const nextState = produce(visitedPageInformation, (draft) => {
      draft.STORY_GROUP[router.asPath] = {
        y: scrollOffset
      };
    });

    setVisitedPageInformation(nextState);

    if (Math.round(scrollOffset) >= profileInfoAreaClientHeight) {
      setPageName(userInformation.nickname);
    } else {
      setPageName('프로필');
    }
  };

  const historyBackHandler = () => {
    if (history.length === 1 && window.isWebViewAccess) {
      router.push('/');
      return;
    }

    router.back();
  };

  if (isNotificationModalOpen) {
    return (
      <BaseModal
        isModalOpen={isNotificationModalOpen}
        rightBtnName="닫기"
        onCloseModal={historyBackHandler}
        onClickRightBtn={historyBackHandler}
      >
        존재하지 않는 사용자입니다.
      </BaseModal>
    );
  }

  const userPorfileElement =
    userProfileInfo?.returnValue === 3 || isLoading || isError || isIdle ? (
      <div style={{ width: '470px', height: '270px' }}></div>
    ) : (
      <ProfileInfoArea
        data={userProfileInfo.data}
        onClickFollowButton={handleClickFollowButton}
        onSetProfileInfoAreaClientHeight={setProfileInfoAreaClientHeight}
        onClickUnBlockButton={handleClickBlockConfirmButton}
        onClickStoryButton={handleClickStoryButton}
      />
    );

  const itemData = {
    storyList,
    loggedInUserId,
    accesstoken,
    queryKey: ['userStory', userId as string],
    handleClickCard,
    userPorfileElement
  };

  if (!storyList || error || userProfileInfo?.returnValue === 3) {
    return <></>;
  }

  return (
    <Wrapper>
      <Header
        pageName={pageName}
        options={{ back: true, menu: true }}
        onClickBack={historyBackHandler}
        onClickMenu={handleClickMenuButton}
        onClickTitle={() => listRef.current?.scrollTo(0)}
      />
      <ScrollWrapper>
        {storyList.length === 0 || userProfileInfo?.data?.isblock ? (
          <>
            {userPorfileElement}
            <EmptyMessageWrapper>작성된 스토리가 없습니다.</EmptyMessageWrapper>
          </>
        ) : (
          <FixedSizeList
            ref={listRef}
            height={windowHeight - 56} // 56은 window에서 헤더 높이를 뺀 것임
            itemCount={storyList.length + 1} // + 1은 사용자 프로필 영역
            itemSize={270}
            width="100%"
            itemData={itemData}
            onItemsRendered={({ overscanStartIndex }) => {
              setOverscanStopIndex(overscanStartIndex);
            }}
            onScroll={handleScroll}
          >
            {CardList}
          </FixedSizeList>
        )}
        {overscanStopIndex > storyList.length - 10 ? (
          <ObservationComponent />
        ) : (
          <></>
        )}
        <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <MenuItem
            onClick={() => {
              handleOpenReportModal();
              handleCloseMenu();
            }}
          >
            신고
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClickBlockButton();
            }}
          >
            {userInformation.isblock ? '차단 해제' : '차단'}
          </MenuItem>
        </Menu>
      </ScrollWrapper>
      <ReportModal
        type="User"
        userOptions={{
          iduser: userId ? +userId : 0
        }}
        isModalOpen={isReportModalOpen}
        onCloseModal={handleCloseReportModal}
      />
    </Wrapper>
  );
};

export default withAuth(UserProfile);

const CardList = ({ data, index, style }: ListChildComponentProps) => {
  const {
    storyList,
    loggedInUserId,
    accesstoken,
    queryKey,
    handleClickCard,
    userPorfileElement
  } = data;

  const storyItem = storyList[index - 1];

  return index === 0 ? (
    userPorfileElement
  ) : (
    <Box
      component="div"
      key={storyItem.idblog}
      style={style}
      sx={{ padding: '24px', paddingBottom: 0 }}
    >
      <BaseCard
        variant="topBtn"
        storyItem={storyItem}
        createdtime={showDate(storyItem.createdtime)}
        representativeImageUrl={getStoryImage(
          'thumbnails50',
          storyItem.representative
        )}
        profileImageUrl={getProfileImage('profile', storyItem.profilepath)}
        onClickCard={() => handleClickCard(storyItem.idblog)}
      >
        <DisplayContainer>
          <MoreButton
            userId={storyItem.iduser}
            loggedInUserId={loggedInUserId}
            isscrap={storyItem.isscrap}
            accesstoken={accesstoken}
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

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh',

  '& .MuiList-root > .MuiBox-root + .MuiBox-root': {
    paddingTop: '13px',
    borderTop: '1px solid #dbdbdb'
  }
}));

const ScrollWrapper = styled(Box)(() => ({
  overflowY: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
}));

const EmptyMessageWrapper = styled(Box)(() => ({
  width: '100%',
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#868686'
}));
