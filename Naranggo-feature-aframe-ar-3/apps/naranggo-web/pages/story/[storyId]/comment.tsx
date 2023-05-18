import withAuth from '@/components/withAuth';
import Header from '@/components/Header/Header';
import { Stack, styled } from '@mui/material';
import router, { useRouter } from 'next/router';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import BottomInput from '@/components/Comment/BottomInput';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import CommentList from '@/components/List/CommentList';
import snackBarAtom from '@/atoms/snackBarAtom';
import { useGetComment } from '@/queries/CommentQueries';
import {
  RegistrationRelyRequestParam,
  RegistrationRereplyRequestParam
} from '@/components/Comment/queries';
import { nanoid } from 'nanoid';
import { showDate } from '@/utils/time';
import { BaseModal } from '@naranggo/storybook';

const CommentPage: NextPageWithLayout = () => {
  const {
    query: { storyWriterId, storyId }
  } = useRouter();
  const queryClient = useQueryClient();

  const idblog = window.location.href.split('story/')[1]?.split('/')[0];
  const urlParams = new URLSearchParams(window.location.search);
  const idreply = urlParams.get('idreply');
  const idrereply = urlParams.get('idrereply');

  const [activeComment, setActiveComment] = useState<ActiveComment | null>();
  const { accesstoken, iduser, nickname, profilepath } =
    useAtomValue(loginProfileAtom);
  const setSnackBar = useSetAtom(snackBarAtom);
  const [isDelStory, setIsDelStory] = useState(false);
  const [isPrivateStory, setIsPrivateStory] = useState(false);
  const [isblocked, setIsBlocked] = useState(false);
  const [isNotification, setIsNotification] = useState(
    idreply ? true : idrereply ? true : false
  );
  const currentTime = Date.now();

  const { data, isLoading, isError, isIdle, refetch } = useGetComment(
    {
      idblog: storyId || idblog,
      accessId: iduser,
      accesstoken,
      timeStamp: currentTime
    },
    {
      onSuccess: (response) => {
        const { data, returnValue } = response;

        if (returnValue === -2) {
          return setIsDelStory(true);
        }

        if (returnValue === 2) {
          return setIsBlocked(true);
        }

        if (returnValue === 3) {
          return setIsPrivateStory(true);
        }

        if (isNotification) {
          const delIdreply = data?.reply?.filter(
            (item: Comment) => item.idreply.toString() === idreply?.toString()
          );

          const delIdrereply = data?.reply?.filter(
            (item: Comment) =>
              item.idrereply.toString() === idrereply?.toString()
          );

          if (idrereply && !Object.keys(delIdrereply).length) {
            setSnackBar({
              isSnackBarOpen: true,
              message: '삭제된 답글입니다.',
              vertical: 'bottom'
            });
          }

          if (idreply && !Object.keys(delIdreply).length) {
            setSnackBar({
              isSnackBarOpen: true,
              message: '삭제된 댓글입니다.',
              vertical: 'bottom'
            });
          }
        }
      }
    }
  );

  useEffect(
    () => setIsNotification(idreply ? true : idrereply ? true : false),
    [idreply, idrereply]
  );

  const handleRefetch = () => refetch();

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

  if (isLoading || isError || isIdle) {
    return <></>;
  }

  return (
    <Wrapper>
      <Header
        pageName={`댓글 ${data?.data?.reply?.length || 0}`}
        options={{ back: true }}
        onClickStoryView={() => {
          router.push(`/story/${storyId}`);
        }}
        onClickBack={historyBackHandler}
      />
      <CommentList
        storyId={storyId as string}
        title={data?.data?.title}
        storyWriterId={Number(storyWriterId) || data?.data?.writeriduser}
        activeComment={activeComment}
        setActiveComment={setActiveComment}
        commentList={data?.data?.reply || []}
        onRefetch={handleRefetch}
      />
      <BottomInput
        activeComment={activeComment}
        setActiveComment={setActiveComment}
        setIsNotification={setIsNotification}
        onMutateReply={(param: RegistrationRelyRequestParam) => {
          const snapShotOfPreviousAllData =
            queryClient.getQueryData<CommentResponse>([
              'getReplyList',
              storyId
            ]);

          const snapShotOfPreviousTitleData =
            queryClient.getQueryData<CommentResponse>(['getReplyList', storyId])
              ?.data.title;

          const snapShotOfPreviousWriterIduserData =
            queryClient.getQueryData<CommentResponse>(['getReplyList', storyId])
              ?.data.writeriduser;

          const snapShotOfPreviousReplyData =
            queryClient.getQueryData<CommentResponse>(['getReplyList', storyId])
              ?.data.reply;

          if (
            snapShotOfPreviousReplyData &&
            snapShotOfPreviousAllData &&
            snapShotOfPreviousTitleData &&
            snapShotOfPreviousWriterIduserData
          ) {
            if (
              snapShotOfPreviousReplyData.find(
                (comment) => comment.idreply === param.idreply
              )
            ) {
              queryClient.setQueryData<CommentResponse>(
                ['getReplyList', storyId],
                {
                  message: snapShotOfPreviousAllData.message,
                  returnValue: snapShotOfPreviousAllData.returnValue,
                  data: {
                    title: snapShotOfPreviousTitleData,
                    writeriduser: snapShotOfPreviousWriterIduserData,
                    reply: snapShotOfPreviousReplyData.map((comment: Comment) =>
                      comment.idreply === param.idreply &&
                      comment.idrereply === '0'
                        ? ({
                            contents: param.reply_contents,
                            idreply: nanoid(),
                            idrereply: '0',
                            iduser: iduser,
                            isblock_user: 0,
                            nickname: nickname,
                            profilepath: profilepath,
                            reg_date: showDate(Date.now().toString()),
                            rereplycount: '0'
                          } as Comment)
                        : comment
                    )
                  }
                }
              );
            } else {
              queryClient.setQueryData<CommentResponse>(
                ['getReplyList', storyId],
                {
                  message: snapShotOfPreviousAllData.message,
                  returnValue: snapShotOfPreviousAllData.returnValue,
                  data: {
                    title: snapShotOfPreviousTitleData,
                    writeriduser: snapShotOfPreviousWriterIduserData,
                    reply: [
                      {
                        contents: param.reply_contents,
                        idreply: nanoid(),
                        idrereply: '0',
                        iduser: iduser,
                        isblock_user: 0,
                        nickname: nickname,
                        profilepath: profilepath,
                        reg_date: showDate(Date.now().toString()),
                        rereplycount: '0'
                      } as Comment,
                      ...snapShotOfPreviousReplyData
                    ]
                  }
                }
              );
            }
          }

          return param;
        }}
        onMutateRereply={(param: RegistrationRereplyRequestParam) => {
          const snapShotOfPreviousAllData =
            queryClient.getQueryData<CommentResponse>([
              'getReplyList',
              storyId
            ]);

          const snapShotOfPreviousTitleData =
            queryClient.getQueryData<CommentResponse>(['getReplyList', storyId])
              ?.data.title;

          const snapShotOfPreviousWriterIduserData =
            queryClient.getQueryData<CommentResponse>(['getReplyList', storyId])
              ?.data.writeriduser;

          const snapShotOfPreviousReplyData =
            queryClient.getQueryData<CommentResponse>(['getReplyList', storyId])
              ?.data.reply;

          if (
            snapShotOfPreviousReplyData &&
            snapShotOfPreviousAllData &&
            snapShotOfPreviousTitleData &&
            snapShotOfPreviousWriterIduserData
          ) {
            if (param.idrereply !== '0') {
              queryClient.setQueryData<CommentResponse>(
                ['getReplyList', storyId],
                {
                  message: snapShotOfPreviousAllData.message,
                  returnValue: snapShotOfPreviousAllData.returnValue,
                  data: {
                    title: snapShotOfPreviousTitleData,
                    writeriduser: snapShotOfPreviousWriterIduserData,
                    reply: snapShotOfPreviousReplyData.map((comment) =>
                      comment.idrereply === param.idrereply
                        ? ({
                            contents: param.reply_contents,
                            idreply: nanoid(),
                            idrereply: param.idrereply,
                            iduser: iduser,
                            isblock_user: 0,
                            nickname: nickname,
                            profilepath: profilepath,
                            reg_date: showDate(Date.now().toString()),
                            rereplycount: '0'
                          } as Comment)
                        : comment
                    )
                  }
                }
              );
            } else {
              snapShotOfPreviousReplyData.splice(
                snapShotOfPreviousReplyData
                  .map((comment) => comment.idreply)
                  .lastIndexOf(param.idreply) + 1,
                0,
                {
                  contents: param.reply_contents,
                  idreply: param.idreply,
                  idrereply: nanoid(),
                  iduser: iduser,
                  isblock_user: 0,
                  nickname: nickname,
                  profilepath: profilepath,
                  reg_date: showDate(Date.now().toString()),
                  rereplycount: '0'
                } as Comment
              );

              queryClient.setQueryData<CommentResponse>(
                ['getReplyList', storyId],
                {
                  message: snapShotOfPreviousAllData.message,
                  returnValue: snapShotOfPreviousAllData.returnValue,
                  data: {
                    title: snapShotOfPreviousTitleData,
                    writeriduser: snapShotOfPreviousWriterIduserData,
                    reply: [...snapShotOfPreviousReplyData]
                  }
                }
              );
            }
          }
          return param;
        }}
        storyId={Number(storyId)}
      />
    </Wrapper>
  );
};

export default withAuth(CommentPage);

const Wrapper = styled(Stack)(() => ({
  position: 'relative',
  overflow: 'hidden',
  height: '100vh'
}));
