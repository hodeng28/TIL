import { useEffect, useRef, useState } from 'react';
import { useSetAtom, useAtomValue, useAtom } from 'jotai';
import {
  Box,
  Button,
  Stack,
  styled,
  Typography,
  CircularProgress
} from '@mui/material';
import { BaseCard } from '@naranggo/storybook';
import SearchTextField from '@/components/search/SearchTextField';
import withAuth from '@/components/withAuth';
import Header from '@/components/Header/Header';
import MoreButton from '@/components/Button/MoreButton';
import {
  getSearchStoryList,
  getSearchUserList,
  SearchStoryListRequestParam,
  SearchUserListRequestParam,
  useInfiniteList
} from '@/components/story/queries';
import useInfiniteScrollWithQuery from '@/hooks/useInfiniteScrollWithQuery';
import { useWindowSize } from '@/hooks/useWindowResize';
import { useSessionStorage } from '@/hooks/useSessionStorage';
import useUserPosition from '@/hooks/useUserPosition';
import snackBarAtom from '@/atoms/snackBarAtom';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import { SearchListScrollAtom } from '@/atoms/ListScrollTop';
import { getProfileImage, getStoryImage } from '@/utils/image';
import { showDate } from '@/utils/time';
import axios from '@/api/axiosClient';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import Image from 'next/image';
import produce from 'immer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';

export type SearchType = 'none' | 'user' | 'story';

export interface SeachInformaiton {
  type: 'none' | 'user' | 'story';
  scroll: number;
  keyword: string;
}

const Search: NextPageWithLayout = () => {
  const listRef = useRef<FixedSizeList>(null);
  const searchBoxRef = useRef<HTMLInputElement>(null);

  const [searchInputData, setSearchInputData] = useState('');
  const [userSearchKeyword, setUserSearchKeyword] = useState('');
  const [searchResult, setSearchResult] = useState<SearchData[]>();
  const [onSearchStory, setOnSearchStory] = useState<SearchType>('none');
  const [overscanStopIndex, setOverscanStopIndex] = useState(0);
  const [searchState, setSearchState] = useSessionStorage('SeachInformaiton', {
    type: 'none',
    scroll: 0,
    keyword: searchInputData
  });
  const searchKeyword = searchState.keyword;
  const searchType = searchState.type;

  const { userPosition } = useUserPosition();
  const [windowWidth, windowHeight] = useWindowSize();

  const {
    accesstoken,
    iduser: loggedInUserId,
    nickname: loggedInUserNickname
  } = useAtomValue(loginProfileAtom);
  const setSnackBar = useSetAtom(snackBarAtom);
  const [scrollHeight, setScrollHeight] = useAtom(SearchListScrollAtom);

  const queryClient = useQueryClient();
  const router = useRouter();
  const currentTime = Date.now();

  const {
    data: searchList,
    refetch: storySearchRefetch,
    isLoading,
    ObservationComponent
  } = useInfiniteScrollWithQuery<SearchData>(
    useInfiniteList<SearchData, SearchStoryListRequestParam>({
      queryKey: ['storySearchList'],
      apiParam: {
        matchScore: -1,
        lastIdBlog: -1,
        lat: userPosition?.lat || 0,
        lng: userPosition?.lng || 0,
        searchWord: searchInputData,
        accessId: loggedInUserId,
        accesstoken: accesstoken,
        timeStamp: currentTime
      },
      queryFn: getSearchStoryList,
      matchScorePagingRequestParamKey: 'matchScore',
      matchScorePagingParamKey: 'matchScore',
      pagingRequestParamKey: 'lastIdBlog',
      pagingParamKey: 'idblog',
      pagingType: 'IdProperty',
      pagingParamStartValue: -1,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      enabled: false
    })
  );

  const {
    data: userSearchList,
    refetch: userSearchRefech,
    ObservationComponent: ObservationComponentUser
  } = useInfiniteScrollWithQuery<SearchData>(
    useInfiniteList<SearchData, SearchUserListRequestParam>({
      queryKey: ['userSearchList'],
      apiParam: {
        lastIdUser: -1,
        nickname: searchInputData,
        accessId: loggedInUserId,
        accesstoken: accesstoken,
        timeStamp: currentTime
      },
      queryFn: getSearchUserList,
      pagingRequestParamKey: 'lastIdUser',
      pagingParamKey: 'matchScore',
      pagingType: 'IdProperty',
      pagingParamStartValue: -1,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      refetchInterval: false,
      enabled: false
    })
  );

  const { mutate: follow } = useMutation({
    mutationFn: ({ iduser }: { iduser: number; isfollow: 0 | 1 }) =>
      axios.post(`/apis/setFollow`, {
        accesstoken,
        accessId: loggedInUserId,
        nickname: loggedInUserNickname,
        iduser: iduser
      }),
    onMutate: ({ iduser }) => {
      const snapShotOfPreviousData = queryClient.getQueryData<
        InfiniteData<SearchData[]>
      >(['userSearchList']);

      if (snapShotOfPreviousData) {
        queryClient.setQueryData<InfiniteData<SearchData[]>>(
          'userSearchList',
          produce(snapShotOfPreviousData, (draft) => {
            for (let i = 0; i < draft.pages.length; i++) {
              for (let j = 0; j < draft.pages[i].length; j++) {
                const target = draft.pages[i][j];

                if (target.iduser === iduser) {
                  target.isfollow = target.isfollow === 0 ? 1 : 0;
                }
              }
            }
          })
        );
      }
    }
  });

  const { mutate: unfollow } = useMutation({
    mutationFn: ({ iduser }: { iduser: number; isfollow: 0 | 1 }) =>
      axios.post(`/apis/setUnFollow`, {
        accesstoken,
        accessId: loggedInUserId,
        iduser: iduser
      }),
    onMutate: ({ iduser }) => {
      const snapShotOfPreviousData =
        queryClient.getQueryData<InfiniteData<SearchData[]>>('userSearchList');

      if (snapShotOfPreviousData) {
        queryClient.setQueryData<InfiniteData<SearchData[]>>(
          'userSearchList',
          produce(snapShotOfPreviousData, (draft) => {
            for (let i = 0; i < draft.pages.length; i++) {
              for (let j = 0; j < draft.pages[i].length; j++) {
                const target = draft.pages[i][j];

                if (target.iduser === iduser) {
                  target.isfollow = target.isfollow === 1 ? 0 : 1;
                }
              }
            }
          })
        );
      }
    }
  });

  const handleClickFollowButton = ({
    iduser,
    isfollow
  }: {
    iduser: number;
    isfollow: 0 | 1;
  }) => {
    if (isfollow === 1) {
      unfollow({ iduser, isfollow });
    } else {
      follow({ iduser, isfollow });
    }
  };

  const handleClickCard = (idblog: number, playable: number) => {
    setSearchState({
      type: 'story',
      scroll: scrollHeight,
      keyword: searchInputData
    });

    playable === 1
      ? router.push(`/play/${idblog}`)
      : router.push(`/story/${idblog}`);
  };

  const handleClickUserLink = (iduser: number) => {
    setSearchState({
      type: 'user',
      scroll: 0,
      keyword: searchKeyword
    });

    router.push(`/profile/${iduser}`);
  };

  const handleSearchInputInit = () => {
    if (searchInputData) {
      setSearchInputData('');
      queryClient.resetQueries();
    }

    if (searchState.type === 'story' || searchState.type === 'user') {
      setSearchState({ type: 'none', scroll: 0 });
    }

    searchBoxRef.current?.focus();
  };

  const handleClickCloseSearch = () => {
    router.back();

    setSearchState({ type: 'none', scroll: 0 });
  };

  const onSearchEvent = () => {
    queryClient.resetQueries();

    if (searchInputData && searchInputData.includes('@')) {
      const textCount = searchInputData.replace('@', '');

      if (textCount.length >= 2) {
        setOnSearchStory('user');
        userSearchRefech();
      }

      if (textCount.length < 2) {
        setSnackBar({
          isSnackBarOpen: true,
          message: '2글자 이상 입력해 주세요.',
          vertical: 'bottom'
        });
      }
      setSearchState({
        type: 'user',
        keyword: userSearchKeyword
      });
    }

    if (searchInputData && !searchInputData.includes('@')) {
      if (searchInputData.length >= 2) {
        setOnSearchStory('story');
        storySearchRefetch();
        setUserSearchKeyword('');
        setScrollHeight(0);
      }

      if (searchInputData.length < 2) {
        setSnackBar({
          isSnackBarOpen: true,
          message: '2글자 이상 입력해 주세요.',
          vertical: 'bottom'
        });
      }

      setSearchState({
        type: 'story',
        keyword: searchInputData
      });
    }

    if (searchInputData.length === 0) {
      setSnackBar({
        isSnackBarOpen: true,
        message: '검색어를 입력해 주세요.',
        vertical: 'bottom'
      });
    }
  };

  const handleClickKeydownSearch = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      (document?.activeElement as HTMLElement).blur();
      onSearchEvent();
    }
  };

  const handleClickSearch = () => {
    onSearchEvent();
  };

  const itemData = {
    searchList,
    loggedInUserId,
    accesstoken,
    searchKeyword,
    handleClickCard,
    queryKey: ['storySearchList']
  };

  useEffect(() => {
    if (searchList && onSearchStory === 'story') {
      setSearchResult([...searchList]);
      setOnSearchStory('none');
    }
    if (userSearchList && onSearchStory === 'user') {
      setSearchResult([...userSearchList]);
      setOnSearchStory('none');
    }
  }, [searchList, userSearchList, onSearchStory, searchResult]);

  useEffect(() => {
    if (searchInputData.includes('@')) {
      setUserSearchKeyword(searchInputData.replace('@', ''));
    }
  }, [searchInputData]);

  useEffect(() => {
    listRef?.current?.scrollTo(scrollHeight);
  }, [scrollHeight]);

  return (
    <Wrapper>
      <Header
        pageName="검색"
        options={{ close: true }}
        onClickClose={handleClickCloseSearch}
      />
      <SearchTextField
        searchType={searchType}
        searchKeyword={searchKeyword}
        searchInputData={searchInputData}
        setSearchInputData={setSearchInputData}
        handleClickSearch={handleClickSearch}
        handleSearchInputInit={handleSearchInputInit}
        searchBoxRef={searchBoxRef}
        handleClickKeydownSearch={handleClickKeydownSearch}
      />
      {isLoading ? (
        <Stack
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          <CircularProgress color="secondary" />
        </Stack>
      ) : (
        <Stack sx={{ overflow: 'auto' }}>
          {searchState.type === 'user' && userSearchList ? (
            <>
              {userSearchList.length > 0 ? (
                <>
                  {userSearchList.map((user, index) => {
                    const {
                      iduser,
                      userinfo,
                      nickname,
                      profilepath,
                      isfollow
                    } = user;

                    return (
                      <UserList key={iduser}>
                        <UserInforWrapper
                          onClick={() => {
                            handleClickUserLink(iduser);
                          }}
                        >
                          <ImageWrapper>
                            <UserImage
                              width={48}
                              height={48}
                              objectFit="cover"
                              alt={nickname}
                              src={getProfileImage('profile', profilepath)}
                            />
                          </ImageWrapper>

                          <Stack sx={{ marginLeft: '16px' }}>
                            {searchKeyword &&
                            nickname.includes(searchKeyword) ? (
                              <>{HighlightedText(nickname, searchKeyword)}</>
                            ) : (
                              <NickName>{nickname}</NickName>
                            )}

                            <Infor>{userinfo}</Infor>
                          </Stack>
                        </UserInforWrapper>
                        {iduser !== loggedInUserId && (
                          <FollowableButton
                            onClick={() =>
                              handleClickFollowButton({
                                iduser,
                                isfollow
                              })
                            }
                          >
                            {isfollow === 1 ? (
                              <Following>팔로잉</Following>
                            ) : (
                              <Follow>팔로우</Follow>
                            )}
                          </FollowableButton>
                        )}
                        {index > userSearchList.length - 30 ? (
                          <ObservationComponentUser />
                        ) : (
                          <></>
                        )}
                      </UserList>
                    );
                  })}
                </>
              ) : (
                <DefaultContents>검색결과가 없습니다.</DefaultContents>
              )}
            </>
          ) : searchState.type === 'story' && searchList ? (
            <>
              {searchList.length > 0 ? (
                <Wrapper>
                  <FixedSizeList
                    ref={listRef}
                    height={windowHeight - 180}
                    itemCount={searchList.length}
                    itemSize={270}
                    width="100%"
                    itemData={itemData}
                    onItemsRendered={({ overscanStopIndex }) => {
                      setOverscanStopIndex(overscanStopIndex);
                    }}
                    onScroll={({ scrollOffset }) => {
                      setScrollHeight(scrollOffset);
                    }}
                  >
                    {CardList}
                  </FixedSizeList>
                  {overscanStopIndex > searchList.length - 10 ? (
                    <ObservationComponent />
                  ) : (
                    <></>
                  )}
                </Wrapper>
              ) : (
                <DefaultContents>검색결과가 없습니다.</DefaultContents>
              )}
            </>
          ) : (
            <DefaultContents>검색어를 입력해 주세요.</DefaultContents>
          )}
        </Stack>
      )}
    </Wrapper>
  );
};

const HighlightedText = (text: string, query: string) => {
  if (query !== '' && text.includes(query)) {
    const parts = text.split(new RegExp(`(${query})`, 'gi'));

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <NickName style={{ color: '#736DEE' }} key={index}>
              {part}
            </NickName>
          ) : (
            <NickName key={index}>{part}</NickName>
          )
        )}
      </>
    );
  }

  return text;
};

export default withAuth(Search);

const CardList = ({ data, index, style }: ListChildComponentProps) => {
  const {
    searchList,
    loggedInUserId,
    accesstoken,
    queryKey,
    handleClickCard,
    searchKeyword
  } = data;
  const storyItem = searchList[index];

  const {
    idblog,
    createdtime,
    profilepath,
    playable,
    isscrap,
    representative,
    iduser,
    isofficial
  } = storyItem;

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
        storyItem={storyItem}
        searchKeyword={searchKeyword}
        createdtime={showDate(createdtime)}
        representativeImageUrl={getStoryImage('thumbnails50', representative)}
        profileImageUrl={getProfileImage('profile', profilepath)}
        onClickCard={() => handleClickCard(idblog, playable)}
      >
        <MoreButton
          isofficial={isofficial}
          userId={iduser}
          loggedInUserId={loggedInUserId}
          accesstoken={accesstoken}
          isscrap={isscrap}
          idblog={idblog}
          type="Story"
          queryKey={queryKey}
          reportParamOptions={{
            iduser: iduser,
            idblog: idblog
          }}
        />
      </BaseCard>
    </Box>
  );
};

const Wrapper = styled(Stack)(() => ({
  height: '100vh',
  overflow: 'hidden'
}));

const DefaultContents = styled(Stack)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  fontSize: '.875rem',
  color: '#868686'
}));

const UserList = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  padding: '0 1rem'
}));

const UserInforWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '.625rem 0',
  alignItems: 'center'
}));

const ImageWrapper = styled(Stack)(() => ({
  width: '50px',
  height: '50px',
  border: '1px solid #fff',
  borderRadius: '50%'
}));

const UserImage = styled(Image)(() => ({
  borderRadius: '50%'
}));

const NickName = styled(Typography)(() => ({
  display: 'contents',
  width: '180px',
  fontWeight: 'bold',
  fontSize: '.875rem',
  whiteSpace: 'nowrap',
  overflowX: 'hidden',
  textOverflow: 'ellipsis'
}));

const Infor = styled(Typography)(() => ({
  width: '180px',
  fontSize: '.875rem',
  whiteSpace: 'nowrap',
  overflowX: 'hidden',
  textOverflow: 'ellipsis',
  color: '#a7a7a7'
}));

const FollowableButton = styled(Button)(() => ({
  flex: '0 0 max-content',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  right: 0,
  fontSize: '.875rem',
  margin: 0,
  // padding: 0,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: '#000000'
}));

const Following = styled('div')(() => ({
  backgroundColor: '#ffffff',
  border: '1px solid #736dee',
  color: '#736dee',
  borderRadius: '5px',
  fontSize: '.875rem',
  padding: '1px 16px',
  '&:hover': {
    backgroundColor: '#ffffff !important'
  }
}));

const Follow = styled('div')(() => ({
  backgroundColor: '#736dee',
  color: '#ffffff',
  borderRadius: '5px',
  fontSize: '.875rem',
  padding: '1px 16px',
  '&:hover': {
    backgroundColor: '#736dee !important'
  }
}));
