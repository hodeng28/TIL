import { BaseModal } from '@naranggo/storybook';
import PlayStory from '@/components/playStory/PlayStory';
import { Stack, styled, Typography } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import withAuth from '@/components/withAuth';
import { useStoryQuery } from '@/queries/StoryReadQueries';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import { useAtomValue } from 'jotai';
import { reformatPlayStoryData } from '@/utils/storyRead';

const PlayStoryPage: NextPageWithLayout = () => {
  const router = useRouter();
  const storyNumberId = Number(router.query.playStoryId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { iduser, accesstoken } = useAtomValue(loginProfileAtom);
  const currentTime = Date.now();

  const { data, isLoading, isError, isIdle } = useStoryQuery(
    {
      idblog: storyNumberId,
      accesstoken,
      accessId: iduser,
      timeStamp: currentTime
    },
    {
      keepPreviousData: true,
      enabled: !!iduser && !!accesstoken.length
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

  const handleOpenModal = () => setIsModalOpen(!isModalOpen);

  const handlePlayStoryClose = () => {
    router.back();
  };
  const playStoryData = { ...(data.data as StoryItem) };

  const { title } = playStoryData;

  return (
    <Wrapper>
      <Header
        pageName={title}
        options={{ close: true }}
        onClickClose={handleOpenModal}
      />
      <PlayStory
        contents={reformatPlayStoryData((data?.data as StoryItem).contents)}
      />
      <BaseModal
        isModalOpen={isModalOpen}
        leftBtnName="취소"
        rightBtnName="확인"
        onClickLeftBtn={handleOpenModal}
        onClickRightBtn={handlePlayStoryClose}
        onCloseModal={handleOpenModal}
      >
        <ModalText>진행 중인 스토리를 종료하시겠습니까?</ModalText>
      </BaseModal>
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

const ModalText = styled(Typography)(() => ({
  fontSize: '.9rem',
  textAlign: 'left'
}));
