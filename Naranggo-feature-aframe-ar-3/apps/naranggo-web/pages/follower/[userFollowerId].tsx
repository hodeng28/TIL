import { Stack, styled, Box, Typography } from '@mui/material';
import withAuth from '@/components/withAuth';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FollowList from '@/components/List/FollowList';

import loginProfileAtom from '@/atoms/loginProfileAtom';
import { useAtom, useAtomValue } from 'jotai';

import useInfiniteScrollWithQuery from '@/hooks/useInfiniteScrollWithQuery';
import { useInfiniteList } from '@/components/story/queries';
import {
  getFollowList,
  FollowListRequestParam
} from '@/components/follow/queries';
import { useEffect, useRef } from 'react';
import produce from 'immer';
import { visitedPageInformationAtom } from '@/atoms/visitedPageInformationAtom';
import { scrollTo } from '@/utils/helpers';
import { isCurrentPageVisitedByBackspaceAtom } from '@/atoms/isCurrentPageVisitedByBackspaceAtom';

const Follow: NextPageWithLayout = () => {
  const router = useRouter();
  const { userFollowerId, nickname } = router.query;
  const currentTime = Date.now();

  const { iduser: loggedInUserId, accesstoken } =
    useAtomValue(loginProfileAtom);

  const isCurrentPageVisitedByBackspace = useAtomValue(
    isCurrentPageVisitedByBackspaceAtom
  );

  const { data: followList, ObservationComponent } =
    useInfiniteScrollWithQuery<ProcessedFollowItem>(
      useInfiniteList<ProcessedFollowItem, FollowListRequestParam>({
        queryKey: ['followList'],
        apiParam: {
          iduser: userFollowerId,
          followType: 1,
          lastIdfollow: -1,
          accessId: loggedInUserId,
          accesstoken: accesstoken,
          timeStamp: currentTime
        },
        queryFn: getFollowList,
        pagingRequestParamKey: 'lastIdfollow',
        pagingParamKey: 'idfollow',
        pagingType: 'IdProperty',
        pagingParamStartValue: -1,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchInterval: false
      })
    );

  const handleClickTab = () => {
    if (Reflect.has(router.query, 'id')) {
      router.push({
        pathname: `/following/${userFollowerId}`,
        query: {
          nickname,
          id: router.query.id
        }
      });

      return;
    }

    router.push(`/following/${userFollowerId}?nickname=${nickname}`);
  };

  const listRef = useRef<HTMLDivElement>(null);

  const [visitedPageInformation, setVisitedPageInformation] = useAtom(
    visitedPageInformationAtom
  );

  const restoredInformation = Reflect.has(
    visitedPageInformation.STORY_GROUP,
    router.asPath
  )
    ? visitedPageInformation.STORY_GROUP[router.asPath]
    : {
        y: 0
      };

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

  useEffect(() => {
    if (
      Reflect.has(visitedPageInformation.STORY_GROUP, router.asPath) &&
      isCurrentPageVisitedByBackspace
    ) {
      scrollTo(listRef, restoredInformation.y);
    }
  }, [
    isCurrentPageVisitedByBackspace,
    restoredInformation.y,
    router.asPath,
    visitedPageInformation.STORY_GROUP
  ]);

  const handleScroll = (
    e: React.UIEvent<HTMLDivElement> & { target: HTMLDivElement }
  ) => {
    const nextState = produce(visitedPageInformation, (draft) => {
      draft.STORY_GROUP[router.asPath] = {
        y: e.target.scrollTop
      };
    });

    setVisitedPageInformation(nextState);
  };

  const handleClickFollwerTab = () => {
    scrollTo(listRef, 0);
  };

  return (
    <FollowContainer>
      <HeaderWrapper>
        <Header
          pageName={nickname}
          options={{ back: true }}
          onClickBack={() => {
            router.back();
          }}
        />
        <TabsWrapper>
          <StyledTabs>
            <StyledTabActive onClick={handleClickFollwerTab}>
              팔로워
            </StyledTabActive>
            <StyledTab onClick={handleClickTab}>팔로잉</StyledTab>
          </StyledTabs>
        </TabsWrapper>
      </HeaderWrapper>
      <ListWrapper ref={listRef} onScroll={handleScroll}>
        {followList?.length !== 0 ? (
          <FollowList
            followList={followList}
            ObservationComponent={ObservationComponent}
          />
        ) : (
          <NoFollowWrapper>
            <NoPersonOutlineIcon />
            <NoFollowTypography>팔로우하는 사람이 없습니다.</NoFollowTypography>
          </NoFollowWrapper>
        )}
      </ListWrapper>
    </FollowContainer>
  );
};

export default withAuth(Follow);

const FollowContainer = styled(Stack)(() => ({
  height: '100vh',

  '& h6': {
    display: 'block',
    position: 'initial',
    maxWidth: '176px',
    width: '100%',
    margin: '0 auto',
    fontSize: '1rem',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    transform: 'initial'
  }
}));

const ListWrapper = styled(Stack)(() => ({
  overflow: 'auto'
}));

const HeaderWrapper = styled(Stack)(() => ({
  position: 'sticky',
  top: 0,
  left: 0,
  background: '#fff',
  zIndex: 1
}));

const TabsWrapper = styled(Box)(() => ({
  borderBottom: '1px solid #ebedf0'
}));

const StyledTabs = styled(Stack)(() => ({
  flexDirection: 'row',
  height: '3rem',

  '& .MuiTabs-indicator': {
    borderBottom: '2px solid #201A1B'
  }
}));

const StyledTabActive = styled(Typography)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',
  color: '#201A1B',
  textAlign: 'center',
  fontWeight: 'bold',
  borderBottom: '2px solid rgb(32, 26, 27);'
}));

const StyledTab = styled(Typography)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',
  color: '#201A1B',
  textAlign: 'center'
}));

const NoFollowWrapper = styled(Stack)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%)',
  color: '#868686'
}));

const NoPersonOutlineIcon = styled(PersonOutlineIcon)(() => ({
  margin: '0 auto',
  fontSize: '2rem'
}));

const NoFollowTypography = styled(Typography)(() => ({
  fontSize: '.875rem'
}));
