import { Box, Button, Stack, styled, Typography } from '@mui/material';
import Comment from '../Comment/Comment';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/router';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import React from 'react';
import { useWindowSize } from '@/hooks/useWindowResize';

interface CommentListProps {
  storyId: string;
  commentList: Comment[];
  title?: string | string[];
  storyWriterId: number;
  activeComment?: ActiveComment | null;
  setActiveComment: React.Dispatch<ActiveComment | null>;
  onRefetch: () => void;
}

const CommentList = (
  {
    storyId,
    commentList,
    title,
    storyWriterId,
    activeComment,
    setActiveComment,
    onRefetch
  }: CommentListProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  const router = useRouter();
  const {
    query: { playable }
  } = useRouter();
  const windowHeight = useWindowSize();
  const commentListRef = useRef<HTMLDivElement>();
  const [commentOffsetTop, setCommentOffsetTop] = useState<number | null>();

  const handleClickGotoStory = () => {
    playable === '1'
      ? router.push(`/play/${storyId}`)
      : router.push(`/story/${storyId}`);
  };

  useEffect(() => {
    if (
      commentOffsetTop &&
      commentListRef.current &&
      (activeComment?.type === 'Rereplying' ||
        activeComment?.type === 'ReplyEditing' ||
        activeComment?.type === 'RereplyEditing')
    ) {
      commentListRef.current.scrollTop = commentOffsetTop;
    } else {
      setCommentOffsetTop(null);
    }
  }, [activeComment?.type, commentOffsetTop, windowHeight]);

  const handleClickReply = (
    commentRef: MutableRefObject<HTMLDivElement | undefined>
  ) => {
    const currentComment = commentRef.current;
    const currentList = commentListRef.current;

    if (!currentComment || !currentList) return;

    setCommentOffsetTop(currentComment.offsetTop - currentList.offsetTop);
  };

  return (
    <ListWrapper ref={commentListRef}>
      {title && typeof title === 'string' && title.trim() !== '' && (
        <StoryButton variant="text" onClick={handleClickGotoStory}>
          <Typography>{title}</Typography>
          <StyledArrowForwardIosIcon />
        </StoryButton>
      )}
      {commentList && commentList.length === 0 ? (
        <Box>
          <Typography
            sx={{
              paddingTop: '25%',
              textAlign: 'center'
            }}
          >
            아직 남겨진 댓글이 없어요.
          </Typography>
        </Box>
      ) : (
        <>
          {commentList.map((comment: Comment) => (
            <Comment
              key={
                comment.idrereply === '0' ? comment.idreply : comment.idrereply
              }
              comment={comment}
              storyWriterId={storyWriterId}
              activeComment={activeComment}
              isChild={comment.idrereply !== '0'}
              setActiveComment={setActiveComment}
              onClickReply={handleClickReply}
              onRefetch={onRefetch}
              storyId={storyId}
            />
          ))}
        </>
      )}
    </ListWrapper>
  );
};

export default CommentList;

const ListWrapper = styled(Stack)(() => ({
  height: '100%',
  overflowY: 'auto',

  '& > div:first-of-type > .MuiBox-root': {
    borderTop: 0
  }
}));

const StoryButton = styled(Button)(() => ({
  justifyContent: 'space-between',
  padding: '6px 24px',
  color: '#000',
  background: '#f5f5f5',
  borderBottom: '2px solid #ebedf0',

  '& p': {
    width: '270px',
    padding: '0.5rem 0',
    textAlign: 'left',
    lineHeight: '16px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },

  '&:hover': {
    backgroundColor: '#f5f5f5 !important'
  }
}));

const StyledArrowForwardIosIcon = styled(ArrowForwardIosIcon)(() => ({
  width: '16px',
  height: '16px'
}));
