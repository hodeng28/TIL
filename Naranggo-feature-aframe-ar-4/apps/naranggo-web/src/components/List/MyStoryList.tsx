import { RefObject, useEffect } from 'react';
import {
  styled,
  List,
  Container,
  ListItem,
  Stack,
  Typography,
  debounce
} from '@mui/material';
import MyStoryItems from '../myStory/MyStoryItem';
import { getStoryImage } from '@/utils/image';
import theme from '@/utils/theme';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useUserPosition from '@/hooks/useUserPosition';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import useInfiniteScrollWithQuery from '@/hooks/useInfiniteScrollWithQuery';
import MoreButton from '@/components/Button/MoreButton';
import { useAtom, useAtomValue } from 'jotai';
import { showDate } from '@/utils/time';
import {
  getUserStoryList,
  StoryUserListRequestParam,
  useInfiniteList
} from '@/components/story/queries';
import { visitedPageInformationAtom } from '@/atoms/visitedPageInformationAtom';
import produce from 'immer';
import { scrollTo } from '@/utils/helpers';
import { isCurrentPageVisitedByBackspaceAtom } from '@/atoms/isCurrentPageVisitedByBackspaceAtom';

interface MyStoryListProps {
  listRef: RefObject<HTMLDivElement>;
}

const MyStoryList = ({ listRef }: MyStoryListProps) => {
  const router = useRouter();
  const { userPosition } = useUserPosition();
  const { accesstoken, iduser } = useAtomValue(loginProfileAtom);
  const currentTime = Date.now();

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
    listRef,
    restoredInformation.y,
    router.asPath,
    visitedPageInformation.STORY_GROUP
  ]);

  const { data: storyList, ObservationComponent } =
    useInfiniteScrollWithQuery<StoryItem>(
      useInfiniteList<StoryItem, StoryUserListRequestParam>({
        queryKey: ['myStory'],
        apiParam: {
          iduser: iduser,
          lastIdBlog: -1,
          orderType: 1,
          lat: userPosition?.lat || 0,
          lng: userPosition?.lng || 0,
          accessId: iduser,
          accesstoken: accesstoken,
          timeStamp: currentTime
        },
        queryFn: getUserStoryList,
        pagingRequestParamKey: 'lastIdBlog',
        pagingParamKey: 'idblog',
        pagingType: 'IdProperty',
        pagingParamStartValue: -1,
        enabled:
          userPosition?.lng !== undefined &&
          userPosition?.lat !== undefined &&
          userPosition?.lng !== 0 &&
          userPosition?.lat !== 0 &&
          !!accesstoken &&
          !!iduser
      })
    );

  const handleScroll = debounce(
    (e: React.UIEvent<HTMLDivElement> & { target: HTMLDivElement }) => {
      const nextState = produce(visitedPageInformation, (draft) => {
        draft.STORY_GROUP[router.asPath] = {
          y: e.target.scrollTop
        };
      });

      setVisitedPageInformation(nextState);
    }
  );

  return (
    <Wrapper onScroll={handleScroll} ref={listRef}>
      <ListContents>
        <MyStoryItems>
          {storyList && storyList?.length > 0 ? (
            storyList?.map((storyItem: StoryItem, index) => (
              <ItemWrapper
                key={storyItem.idblog}
                onClick={() => router.push(`/story/${storyItem.idblog}`)}
              >
                <StoryList key={storyItem.title}>
                  <Stack
                    sx={{
                      flex: '0 0 auto',
                      position: 'relative',
                      width: '130px',
                      height: '100px'
                    }}
                  >
                    <Image
                      src={getStoryImage(
                        'thumbnails50',
                        storyItem.representative
                      )}
                      alt={`${storyItem.title} 이미지`}
                      layout="fill"
                      objectFit="cover"
                    />
                    <LockImage>
                      {storyItem.publicsetting === 1 ? (
                        <></>
                      ) : (
                        <Image
                          src="/images/story_lock.png"
                          alt="자물쇠 이미지"
                          layout="fill"
                          objectFit="cover"
                        />
                      )}
                    </LockImage>
                  </Stack>
                  <StoryInfoWrapper>
                    <Stack>
                      <StyledTitle>{storyItem.title}</StyledTitle>
                      <StyledDate>{showDate(storyItem.createdtime)}</StyledDate>
                    </Stack>
                    <IconWrapper>
                      <IconWrapper>
                        {storyItem.likecount > 0 ? (
                          <StyledFavoriteIcon />
                        ) : (
                          <StyledFavoriteIcon as={FavoriteBorderOutlinedIcon} />
                        )}

                        <StyledText>{storyItem.likecount}</StyledText>
                      </IconWrapper>
                      <IconWrapper>
                        <StyledCommentIcon />
                        <StyledText>{storyItem.replycountsum}</StyledText>
                      </IconWrapper>
                    </IconWrapper>
                  </StoryInfoWrapper>
                  <MyStoryEditBtnWrapper>
                    <MoreButton
                      userId={storyItem.iduser}
                      loggedInUserId={iduser}
                      isscrap={storyItem.isscrap}
                      accesstoken={accesstoken}
                      idblog={storyItem.idblog}
                      type="Story"
                      queryKey="myStory"
                      reportParamOptions={{
                        iduser: storyItem.iduser,
                        idblog: storyItem.idblog
                      }}
                      buttonColor="grey"
                    />
                  </MyStoryEditBtnWrapper>
                </StoryList>
                {index > storyList.length - 10 ? (
                  <ObservationComponent />
                ) : (
                  <></>
                )}
              </ItemWrapper>
            ))
          ) : (
            <NotStoryText>작성된 스토리가 없습니다.</NotStoryText>
          )}
        </MyStoryItems>
      </ListContents>
    </Wrapper>
  );
};

export default MyStoryList;

const Wrapper = styled(Container)(() => ({
  flex: 1,
  overflowY: 'scroll'
}));

const ListContents = styled(List)(() => ({
  padding: 0
}));

const ItemWrapper = styled(ListItem)(() => ({
  display: 'block',
  padding: '0 .625rem',
  cursor: 'pointer',

  '& > div': {
    gap: '1rem'
  }
}));

const StoryList = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '.625rem 0',
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const StoryInfoWrapper = styled(Stack)(() => ({
  flexGrow: 3,
  justifyContent: 'space-between',
  gap: '1rem'
}));

const StyledTitle = styled(Typography)(() => ({
  fontSize: '.875rem',
  fontWeight: 'bold'
}));

const StyledDate = styled(Typography)(() => ({
  color: theme.palette.custom.grey,
  fontSize: '.75rem'
}));

const IconWrapper = styled(Stack)(() => ({
  flexDirection: 'row'
}));

const StyledFavoriteIcon = styled(FavoriteIcon)(() => ({
  width: '.875rem',
  height: '1.25rem',
  color: theme.palette.custom.red
}));

const StyledCommentIcon = styled(SmsOutlinedIcon)(() => ({
  width: '.875rem',
  height: '1.25rem'
}));

const StyledText = styled(Typography)(() => ({
  margin: '0 .25rem',
  fontSize: '.875rem',
  color: theme.palette.text.secondary
}));

const MyStoryEditBtnWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  alignItems: 'flex-start',
  justifyContent: 'flex-end'
}));

const NotStoryText = styled(Typography)(() => ({
  paddingTop: '25%',
  textAlign: 'center',
  fontSize: '0.875rem',
  color: '#868686'
}));

const LockImage = styled(Stack)(() => ({
  position: 'absolute',
  top: '5px',
  left: '5px',
  width: '35px',
  height: '35px'
}));
