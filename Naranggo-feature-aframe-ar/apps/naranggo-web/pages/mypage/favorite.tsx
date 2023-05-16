import { Box, Stack, styled, Typography } from '@mui/material';
import withAuth from '@/components/withAuth';
import Header from '@/components/Header/Header';
import StoryList from '@/components/List/StoryList';
import useUserPosition from '@/hooks/useUserPosition';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import useInfiniteScrollWithQuery from '@/hooks/useInfiniteScrollWithQuery';
import MoreButton from '@/components/Button/MoreButton';
import { useRouter } from 'next/router';
import { useAtomValue } from 'jotai';
import { getStoryImage, getProfileImage } from '@/utils/image';
import { BaseCard } from '@naranggo/storybook';
import {
  getLikeStoryList,
  StoryLikeListRequestParam,
  useInfiniteList
} from '@/components/story/queries';
import { showDate } from '@/utils/time';

const Favorite: NextPageWithLayout = () => {
  const router = useRouter();
  const { userPosition } = useUserPosition();
  const { accesstoken, iduser: loggedInUserId } =
    useAtomValue(loginProfileAtom);
  const currentTime = Date.now();

  const { data: storyList, ObservationComponent } =
    useInfiniteScrollWithQuery<StoryItem>(
      useInfiniteList<StoryItem, StoryLikeListRequestParam>({
        queryKey: ['likeList'],
        apiParam: {
          lastIdLike: -1,
          lat: userPosition?.lat || 0,
          lng: userPosition?.lng || 0,
          accessId: loggedInUserId,
          accesstoken: accesstoken,
          timeStamp: currentTime
        },
        queryFn: getLikeStoryList,
        pagingRequestParamKey: 'lastIdLike',
        pagingParamKey: 'idlikes',
        pagingType: 'IdProperty',
        pagingParamStartValue: -1,
        enabled:
          userPosition?.lng !== undefined &&
          userPosition?.lat !== undefined &&
          !!accesstoken.length &&
          !!loggedInUserId
      })
    );

  const handleClickCard = (idblog: number, playable: number) => {
    playable === 1
      ? router.push(`/play/${idblog}`)
      : router.push(`/story/${idblog}`);
  };

  return (
    <Wrapper>
      <Header
        pageName="좋아하는 스토리"
        options={{ back: true }}
        onClickBack={() => {
          router.back();
        }}
      />
      {/* <StoryCountText>전체 {storyList?.length || '0'}개</StoryCountText> */}

      {storyList && storyList.length > 0 ? (
        <StoryList>
          {storyList?.map((storyItem, index) => {
            const {
              idblog,
              playable,
              profilepath,
              representative,
              createdtime,
              isscrap,
              iduser,
              isofficial
            } = storyItem;
            return (
              <Box component="div" key={idblog}>
                <BaseCard
                  variant="topBtn"
                  key={idblog}
                  storyItem={storyItem}
                  createdtime={showDate(createdtime)}
                  representativeImageUrl={getStoryImage(
                    'thumbnails50',
                    representative
                  )}
                  profileImageUrl={getProfileImage('profile', profilepath)}
                  onClickCard={() => handleClickCard(idblog, playable)}
                  onClickPlaceBtn={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <MoreButton
                    isofficial={isofficial}
                    userId={iduser}
                    loggedInUserId={loggedInUserId}
                    isscrap={isscrap}
                    accesstoken={accesstoken}
                    idblog={idblog}
                    type="Story"
                    queryKey="likeList"
                    reportParamOptions={{
                      iduser: iduser,
                      idblog: idblog
                    }}
                  />
                </BaseCard>
                {index > storyList.length - 10 ? (
                  <ObservationComponent />
                ) : (
                  <></>
                )}
              </Box>
            );
          })}
        </StoryList>
      ) : (
        <NotStoryText>좋아하는 스토리가 없습니다</NotStoryText>
      )}
    </Wrapper>
  );
};

export default withAuth(Favorite);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh',

  '& .MuiList-root > .MuiBox-root + .MuiBox-root': {
    paddingTop: '13px'
  }
}));

// const StoryCountText = styled(ListSubheader)(() => ({
//   fontWeight: 'bold',
//   color: '#000',
//   padding: '0 .625rem'
// }));

const NotStoryText = styled(Typography)(() => ({
  paddingTop: '25%',
  textAlign: 'center',
  fontSize: '0.875rem',
  color: '#868686'
}));
