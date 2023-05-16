import { Stack, styled } from '@mui/material';
import withAuth from '@/components/withAuth';
import { reformatPlayStoryData } from '@/utils/storyRead';
import { useAtomValue } from 'jotai';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import { useRouter } from 'next/router';
import { useStoryQuery } from '@/queries/StoryReadQueries';
import PlayStoryDetail from '@/components/playStory/PlayStoryDetail';

const PlayStoryPage: NextPageWithLayout = () => {
  const router = useRouter();
  const storyNumberId = Number(router.query.playStoryId);
  const currentTime = Date.now();

  const { iduser, accesstoken } = useAtomValue(loginProfileAtom);
  const { data, isLoading, isError, isIdle } = useStoryQuery(
    {
      idblog: storyNumberId,
      accesstoken,
      accessId: iduser,
      timeStamp: currentTime
    },
    {
      keepPreviousData: true
    }
  );

  if (
    (data && !('data' in data)) ||
    (data &&
      'data' in data &&
      'returnValue' in data.data &&
      data.data.returnValue === -101) ||
    isLoading ||
    isError ||
    isIdle
  ) {
    return <></>;
  }

  return (
    <Wrapper>
      <PlayStoryDetail
        {...data.data}
        storyPointsWithBlockKey={reformatPlayStoryData(
          (data?.data as StoryItem).contents
        )}
      />
    </Wrapper>
  );
};

export default withAuth(PlayStoryPage);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh',

  '& .MuiPaper-root .MuiToolbar-root div:nth-of-type(2)': {
    maxWidth: '60% !important'
  },

  '& h6': {
    fontSize: '.9rem',
    textOverflow: 'ellipsis',
    overflowX: 'hidden',
    whiteSpace: 'nowrap'
  }
}));
