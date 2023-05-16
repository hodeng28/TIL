import withAuth from '@/components/withAuth';
import { reformatStoryPoints } from '@/utils/storyRead';
import { useAtomValue, useSetAtom } from 'jotai';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import router, { useRouter } from 'next/router';
import StoryRead from '@/components/story/read/StoryRead';
import { isPreviewPageAtom } from '@/atoms/storyWriteAtom';
import { useEffect, useState } from 'react';
import { useStoryQuery } from '@/queries/StoryReadQueries';
import { BaseModal } from '@naranggo/storybook';
import { getCookie } from '@/utils/cookie';

const StoryReadPage = () => {
  const {
    query: { storyId }
  } = useRouter();

  const storyNumberId = Number(storyId);

  const { iduser, accesstoken } = useAtomValue(loginProfileAtom);
  const setIsPreviewPage = useSetAtom(isPreviewPageAtom);
  const [isDelStory, setIsDelStory] = useState(false);
  const [isPrivateStory, setIsPrivateStory] = useState(false);
  const [isblocked, setIsBlocked] = useState(false);
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
      onSuccess: (response) => {
        const { returnValue } = response;

        if (returnValue === -2) {
          return setIsDelStory(true);
        }

        if (returnValue === 3) {
          return setIsPrivateStory(true);
        }

        if (returnValue === 2) {
          return setIsBlocked(true);
        }
      },
      enabled: window.isWebViewAccess || getCookie('socialLoginInfo') ? !!storyNumberId && !!iduser : true
    }
  );

  useEffect(() => {
    setIsPreviewPage(false);
  }, [setIsPreviewPage]);

  const historyBackHandler = () => {
    if (history.length === 1 && window.isWebViewAccess) {
      router.push('/');
      return;
    }

    router.back();
  };

  if (isDelStory || isPrivateStory || isblocked) {
    return (
      <BaseModal
        isModalOpen={isDelStory || isPrivateStory || isblocked ? true : false}
        rightBtnName="닫기"
        onCloseModal={historyBackHandler}
        onClickRightBtn={historyBackHandler}
      >
        {isDelStory && '삭제된 스토리입니다.'}
        {(isPrivateStory || isblocked) && '비공개 스토리입니다.'}
      </BaseModal>
    );
  }

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
    <StoryRead
      {...data.data}
      storyPointsWithBlockKey={
        // (kyh) todo: 데이터를 받을때부터 가공해서 내려주기
        reformatStoryPoints((data?.data as StoryItem).contents)
      }
    />
  );
};

export default withAuth(StoryReadPage);
