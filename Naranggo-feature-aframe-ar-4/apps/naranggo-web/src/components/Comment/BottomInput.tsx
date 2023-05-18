import React, {
  useRef,
  useEffect,
  useState,
  SetStateAction,
  Dispatch
} from 'react';
import { styled, Box, IconButton } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  RegistrationRelyRequestParam,
  RegistrationRereplyRequestParam,
  useRegistrationRely,
  useRegistrationRereply
} from './queries';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import Image from 'next/image';
import snackBarAtom from '@/atoms/snackBarAtom';
import DisplayContainer from '../login/DisplayContainer';
import { isLoggedInAtom } from '@/atoms/webLoginAtom';
import { CommonStyles } from '../common/style/CommonStyles';

interface BottomInput {
  storyId: number;
  activeComment?: ActiveComment | null;
  setIsNotification: Dispatch<SetStateAction<boolean>>;
  setActiveComment: React.Dispatch<ActiveComment | null>;
  onMutateReply: (param: RegistrationRelyRequestParam) => unknown;
  onMutateRereply: (param: RegistrationRereplyRequestParam) => unknown;
}

const BottomInput = ({
  storyId,
  activeComment,
  setIsNotification,
  setActiveComment,
  onMutateReply,
  onMutateRereply
}: BottomInput) => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const setSnackBar = useSetAtom(snackBarAtom);
  // const [writtenComment, setWrittenComment] = useState<string | null>(null);
  const [isCommentActive, setIsCommentActive] = useState(false);

  const {
    iduser: accessId,
    accesstoken,
    nickname
  } = useAtomValue(loginProfileAtom);

  const { mutate: RegistrationRely } = useRegistrationRely({
    onMutate: onMutateReply
  });
  const { mutate: RegistrationRereply } = useRegistrationRereply({
    onMutate: onMutateRereply
  });

  const commentWriteRef = useRef<HTMLFormElement>(null);
  const commentInputAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsCommentActive(false);

    if (!activeComment || !commentInputAreaRef.current) {
      return;
    }

    if (
      activeComment.type === 'ReplyEditing' ||
      activeComment.type === 'RereplyEditing'
    ) {
      commentInputAreaRef.current.innerText = activeComment.priorText ?? '';
      commentInputAreaRef.current?.focus();

      // 커서를 맨 마지막으로 이동시키는 로직
      document.execCommand('selectAll', false, undefined);
      document.getSelection()?.collapseToEnd();
      return;
    }

    if (activeComment.type === 'Rereplying') {
      commentInputAreaRef.current.textContent = null;
      commentInputAreaRef.current?.focus();
    }
  }, [activeComment, setActiveComment]);

  const handleInputComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCommentActive(false);

    if (e.currentTarget.innerText.length > 0) {
      setIsCommentActive(true);
    }
  };

  const handleCancleReplyComment = () => {
    if (commentInputAreaRef.current) {
      commentInputAreaRef.current.textContent = '';
    }

    setActiveComment(null);
    setIsCommentActive(false);
  };

  const onSuccessCommentRegistration = () => {
    if (commentInputAreaRef.current) {
      commentInputAreaRef.current.textContent = '';
    }
  };

  const handleSendComment = () => {
    if (!window.isWebViewAccess && !isLoggedIn) return;
    setIsNotification(false);

    const writtenComment = commentInputAreaRef.current?.innerText.trim();

    if (!writtenComment || (writtenComment && writtenComment.length === 0)) {
      alert('글을 입력해주세요');
      return;
    }

    if (!activeComment) {
      RegistrationRely(
        {
          idblog: storyId,
          idreply: '0', // 등록 0
          nickname,
          reply_contents: writtenComment.replace(/(\r\n|\r|\n){3,}/g, '\n\n'),
          accesstoken,
          accessId
        },
        {
          onSuccess: onSuccessCommentRegistration
        }
      );
    }

    switch (activeComment?.type) {
      case 'Rereplying':
        RegistrationRereply(
          {
            idblog: storyId,
            idreply: activeComment.idreply,
            idrereply: '0', // 등록 0
            nickname,
            reply_contents: writtenComment.replace(/(\r\n|\r|\n){3,}/g, '\n\n'),
            accesstoken,
            accessId
          },
          {
            onSuccess(res) {
              if (res.returnValue === -2) {
                setSnackBar({
                  isSnackBarOpen: true,
                  message: '삭제된 댓글입니다.',
                  vertical: 'bottom'
                });
              }

              onSuccessCommentRegistration();
            }
          }
        );
        break;
      case 'ReplyEditing':
        RegistrationRely(
          {
            idblog: storyId,
            idreply: activeComment.idreply, // 수정 idreply값
            nickname,
            reply_contents: writtenComment.replace(/(\r\n|\r|\n){3,}/g, '\n\n'),
            accesstoken,
            accessId
          },
          {
            onSuccess: onSuccessCommentRegistration
          }
        );
        break;
      case 'RereplyEditing':
        RegistrationRereply(
          {
            idblog: storyId,
            idreply: activeComment.idreply, // 댓글 고유id
            idrereply: activeComment.idrereply, // 수정 idrereply값
            nickname,
            reply_contents: writtenComment.replace(/(\r\n|\r|\n){3,}/g, '\n\n'),
            accesstoken,
            accessId
          },
          {
            onSuccess: onSuccessCommentRegistration
          }
        );
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper ref={commentWriteRef}>
      <CommentWriteAreaWrapper>
        <CommentWriteContentEditable
          ref={commentInputAreaRef}
          contentEditable
          placeholder={'댓글을 입력해 보세요'}
          onFocus={() => setIsNotification(false)}
          onBlur={handleCancleReplyComment}
          onInput={handleInputComment}
        />
        <DisplayContainer modal>
          <SubmitBtn type="button" onMouseDown={handleSendComment}>
            {isCommentActive ? (
              <Image
                src="/images/send_relpy_on.png"
                alt="send_button"
                layout="fixed"
                width={30}
                height={30}
              />
            ) : (
              <Image
                src="/images/send_relpy.png"
                alt="send_button"
                layout="fixed"
                width={30}
                height={30}
              />
            )}
          </SubmitBtn>
        </DisplayContainer>
      </CommentWriteAreaWrapper>
      {activeComment?.type === 'Rereplying' && (
        <ReplyingText>
          <RereplyingNickName>{activeComment?.nickname}</RereplyingNickName>
          에게 답글 다는 중 ㆍ
          <CancleReplyCommentBtn
            type="button"
            onClick={handleCancleReplyComment}
          >
            취소
          </CancleReplyCommentBtn>
        </ReplyingText>
      )}
      {(activeComment?.type === 'ReplyEditing' ||
        activeComment?.type === 'RereplyEditing') && (
        <ReplyingText>
          수정 중 ㆍ
          <CancleReplyCommentBtn
            type="button"
            onClick={handleCancleReplyComment}
          >
            취소
          </CancleReplyCommentBtn>
        </ReplyingText>
      )}
    </Wrapper>
  );
};

export default BottomInput;

const Wrapper = styled('form')(({ theme }) => ({
  position: 'inherit',
  width: '100%',
  maxWidth: 'inherit',
  padding: '6px',
  display: 'flex',
  bottom: 0,
  zIndex: 1,
  borderTop: `1px solid ${theme.palette.custom.grey200}`,
  backgroundColor: theme.palette.custom.light,
  flexDirection: 'column-reverse'
}));

const CommentWriteAreaWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  margin: '0 0.5rem',
  paddingLeft: '1rem',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',

  '& .MuiOutlinedInput-root': {
    height: '100%',
    padding: '8.5px 0 8.5px 7px'
  }
}));

const CommentWriteContentEditable = styled(CommonStyles.ContentEditable)(
  () => ({
    borderRadius: '16px',
    fontSize: '16px',
    maxHeight: '80px',
    overflowY: 'scroll',
    padding: '6px 12px',
    flex: 1
  })
);

const SubmitBtn = styled(IconButton)(({ theme }) => ({
  padding: '8px 8px 8px 16px',
  color: theme.palette.custom.blue,
  cursor: 'pointer',
  borderRadius: 'initial',

  '& > svg': {
    fontSize: '1.6rem',
    transform: 'rotate(-45deg)'
  }
}));

const ReplyingText = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '6px',
  paddingLeft: '14px',
  fontSize: '0.8rem'
}));

const RereplyingNickName = styled(Box)(() => ({
  width: 'max-content',
  maxWidth: '145px',
  paddingRight: '1px',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
}));

const CancleReplyCommentBtn = styled('button')(({ theme }) => ({
  backgroundColor: 'transparent',
  border: 'none',
  color: theme.palette.custom.grey3,
  cursor: 'pointer',
  fontSize: '0.75rem'
}));
