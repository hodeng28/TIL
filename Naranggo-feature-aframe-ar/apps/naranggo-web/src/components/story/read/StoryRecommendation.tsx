import { getStoryImage, getProfileImage } from '@/utils/image';
import { Box, List, styled, Stack } from '@mui/material';
import { useQuery } from 'react-query';
import { SmallCard } from '@naranggo/storybook';
import useUserPosition from '@/hooks/useUserPosition';
import axios from '@/api/axiosClient';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { showDate } from '@/utils/time';
import {
  isBeforePopStateEventTriggered,
  isCurrentPageVisitedByBackspaceAtom
} from '@/atoms/isCurrentPageVisitedByBackspaceAtom';
import isRoutingAtom from '@/atoms/isRouting';
import { nanoid } from 'nanoid';
import { useScrollContainer } from 'react-indiana-drag-scroll';

interface StoryRecommendationProps {
  idblog?: number;
}

const StoryRecommendation = ({ idblog }: StoryRecommendationProps) => {
  const scrollContainer = useScrollContainer();
  const { getUserPosition } = useUserPosition();
  const { iduser, accesstoken } = useAtomValue(loginProfileAtom);
  const isCurrentPageVisitedByBackspace = useAtomValue(
    isCurrentPageVisitedByBackspaceAtom
  );
  const isRouting = useAtomValue(isRoutingAtom);

  const router = useRouter();
  const { query } = router;
  const storyId = Number(query.storyId);
  const currentTime = Date.now();

  const { data, isLoading, error } = useQuery(
    ['getStoryRecommendation', idblog],
    async () =>
      await axios.get(
        `/apis/getRecommendStoryList?lat=${
          getQueryParamForUserPosition(getUserPosition()).lat
        }&lng=${
          getQueryParamForUserPosition(getUserPosition()).lng
        }&accessId=${iduser}&accesstoken=${accesstoken}&timeStamp=${currentTime}`
      ),
    {
      enabled:
        !isBackspaceHappend(
          isCurrentPageVisitedByBackspace,
          isBeforePopStateEventTriggered
        ) &&
        !isRouting &&
        idblog === +storyId &&
        !!getUserPosition(),
      refetchOnWindowFocus: false
    }
  );

  if ((data && data.data.returnValue === -101) || isLoading || error) {
    return <></>;
  }

  const handleClickRecommendStory = (idblog: number) => {
    router.push({
      pathname: `/story/${idblog}`,
      query: {
        id: nanoid(8)
      }
    });
  };

  return (
    <Wrapper>
      <Title>이런 스토리는 어때요?</Title>
      <ListWrapper
        ref={scrollContainer.ref}
        className=".indiana-scroll-container"
      >
        {data?.data.data.map(
          ({
            idblog,
            title,
            nickname,
            createdtime,
            contents,
            pointcount,
            islike,
            distance,
            likecount,
            replycountsum,
            profilepath,
            representative,
            summary,
            iduser
          }: StoryItem) => (
            <SmallCard
              key={idblog}
              storyItem={{
                idblog,
                title,
                nickname,
                createdtime,
                contents,
                pointcount,
                islike,
                distance,
                likecount,
                replycountsum,
                summary
              }}
              size="small"
              representativeImageUrl={getStoryImage(
                'thumbnails50',
                representative
              )}
              profileImageUrl={getProfileImage('profile', profilepath)}
              createdtime={showDate(createdtime)}
              variant="topBtn"
              onClickCard={() => handleClickRecommendStory(idblog)}
              onClickProfile={() => router.push(`/profile/${iduser}`)}
            />
          )
        )}
      </ListWrapper>
    </Wrapper>
  );
};

export default StoryRecommendation;

const Wrapper = styled(Stack)(() => ({
  justifyContent: 'space-between',
  width: '100%',
  overflow: 'hidden',
  padding: '2rem 0',
  borderTop: '10px solid #eeeeee',
  userSelect: 'none'
}));

const Title = styled(Box)(() => ({
  padding: '0 1rem',
  fontWeight: 'bold'
}));

const ListWrapper = styled(List)(() => ({
  display: 'flex',
  overflowX: 'scroll',

  '& li': {
    cursor: 'pointer'
  },

  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

const getQueryParamForUserPosition = (
  userPosition: MapCoordinate | undefined
) => {
  if (!userPosition) {
    return { lat: '', lng: '' };
  }

  const { lat, lng } = userPosition;

  return { lat: `${lat}`.slice(0, 10), lng: `${lng}`.slice(0, 11) };
};

const isBackspaceHappend = (
  isCurrentPageVisitedByBackspace: boolean,
  isBeforePopStateEventTriggered: boolean
) => isCurrentPageVisitedByBackspace || isBeforePopStateEventTriggered;
