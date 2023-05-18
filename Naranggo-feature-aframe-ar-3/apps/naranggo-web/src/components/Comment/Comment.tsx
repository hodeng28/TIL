import {
  styled,
  Box,
  Avatar,
  Typography,
  Stack,
  Chip,
  Button
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PATH from '@/consts/paths';
import { useRouter } from 'next/router';
import CommentWrapper from './CommentWrapper';
import { showDate } from '@/utils/time';
import { MutableRefObject, useRef } from 'react';
import MenuButton from './MenuButton';
import DisplayContainer from '../login/DisplayContainer';

interface CommentProps {
  comment: Comment;
  storyId: string;
  storyWriterId?: number;
  activeComment?: ActiveComment | null;
  onFolderOpen?: boolean;
  isChild?: boolean;
  children?: React.ReactNode;
  blockId?: string;
  setActiveComment: React.Dispatch<ActiveComment | null>;
  onClickReply: (
    commentRef: MutableRefObject<HTMLDivElement | undefined>
  ) => void;
  onRefetch: () => void;
}

const Comment = ({
  comment,
  storyWriterId,
  activeComment,
  storyId,
  onRefetch,
  setActiveComment,
  onClickReply,
  isChild = false
}: CommentProps) => {
  const {
    contents,
    nickname,
    profilepath,
    reg_date,
    idrereply,
    idreply,
    isblock_user,
    iduser
  } = comment;
  const router = useRouter();
  const commentRef = useRef<HTMLDivElement>();

  const wirter = iduser === storyWriterId;
  const isReplyEditing = activeComment && activeComment.type === 'ReplyEditing';
  const isRereplyEditing =
    activeComment && activeComment.type === 'RereplyEditing';

  const handleClickReply = () => {
    setActiveComment({
      nickname,
      idreply,
      idrereply,
      type: 'Rereplying'
    });

    onClickReply(commentRef);
  };

  const handleClickEditButton = () => {
    onClickReply(commentRef);
  };

  const handleRoute = () => router.push(`/profile/${iduser}`);

  const commentItem = (
    <Stack ref={commentRef}>
      <CommentWrapper
        isChild={isChild}
        activeComment={activeComment}
        idreply={idreply}
        idrereply={idrereply}
      >
        <TopWrapper direction="row">
          <LeftWrapper onClick={handleRoute}>
            <Avatar
              onClick={() => {
                router.push(`/profile/${iduser}`);
              }}
              src={profilepath && `${PATH.PROFILE + profilepath}`}
              alt={`${nickname} 유저 프로필 이미지`}
            />
          </LeftWrapper>
          <ReplyInfo>
            <Stack
              direction="row"
              sx={{
                gap: '.65rem',
                alignItems: 'center'
              }}
            >
              <Nickname onClick={handleRoute}>{nickname}</Nickname>
              {wirter && <WirterBage label="작성자" size="small" />}
            </Stack>
            <CommentDate>{showDate(reg_date)}</CommentDate>
          </ReplyInfo>
          <DisplayContainer>
            {!isReplyEditing && !isRereplyEditing && (
              <MenuButton
                activeCommentUserId={comment.iduser}
                editCommentText={comment.contents}
                isblock={comment.isblock_user}
                queryKey={['getReplyList', storyId]}
                idreply={comment.idreply}
                idrereply={comment.idrereply}
                setActiveComment={setActiveComment}
                onRefetch={onRefetch}
                onClickEdit={handleClickEditButton}
              />
            )}
          </DisplayContainer>
        </TopWrapper>
        <RightWrapper>
          {isblock_user ? (
            <BlockCommentWrapper direction="row">
              <ErrorOutlineIcon />
              <Typography>차단된 사용자의 댓글이에요.</Typography>
            </BlockCommentWrapper>
          ) : (
            <Content>{contents}</Content>
          )}
          {!isChild && !isblock_user && (
            <DisplayContainer modal>
              <BottomWrapper>
                <ReplyBtn onClick={handleClickReply}>답글달기</ReplyBtn>
              </BottomWrapper>
            </DisplayContainer>
          )}
        </RightWrapper>
      </CommentWrapper>
    </Stack>
  );

  return commentItem;
};

export default Comment;

const Content = styled('div')(() => ({
  width: '100%',
  padding: '8px 4px',
  paddingBottom: 0,
  fontSize: '0.9rem',
  color: '#555555',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
  wordWrap: 'break-word'
}));

const TopWrapper = styled(Stack)(() => ({
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const LeftWrapper = styled(Button)(() => ({
  padding: 0
}));

const ReplyInfo = styled(Stack)(() => ({
  flexGrow: 1,
  textAlign: 'left',
  justifyContent: ' center',
  height: '40px'
}));

const WirterBage = styled(Chip)(() => ({
  height: 'initial',
  padding: '0 0.25rem',
  fontSize: '11.4px',
  backgroundColor: '#b8b6f2 ',
  borderRadius: '5px',
  color: '#fff'
}));

const RightWrapper = styled(Box)(() => ({
  width: '100%',
  padding: '0 0 10px 5px'
}));

const Nickname = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: '13px',
  lineHeight: '13px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer'
}));

const BottomWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: 0
}));

const CommentDate = styled(Typography)(({ theme }) => ({
  fontSize: '11px',
  color: theme.palette.custom.grey
}));

const ReplyBtn = styled(Button)(({ theme }) => ({
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  padding: '0 10px',
  fontSize: '0.8rem',
  color: theme.palette.custom.grey
}));

const BlockCommentWrapper = styled(Stack)(() => ({
  justifyContent: 'center',
  gap: '5px',
  margin: '.5rem 1rem 0',
  padding: '1.3rem 0',
  borderRadius: '16px',
  backgroundColor: '#F5F5F5',
  color: '#555555',

  '& p': {
    fontSize: '0.9rem',
    lineHeight: '21px'
  },

  '& svg': {
    width: '21px',
    height: '21px'
  }
}));
