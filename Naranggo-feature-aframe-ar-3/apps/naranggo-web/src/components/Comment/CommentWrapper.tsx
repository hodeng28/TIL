import { Box, styled } from '@mui/material';

interface CommentWrapperProps {
  activeComment?: ActiveComment | null;
  children?: React.ReactNode;
  isChild?: boolean;
  idreply?: string;
  idrereply?: string;
}

const CommentWrapper = ({
  activeComment,
  children,
  isChild,
  idreply,
  idrereply
}: CommentWrapperProps) => {
  if (
    activeComment?.type === 'ReplyEditing' &&
    activeComment.idreply === idreply &&
    !isChild
  ) {
    return <Content as={EditingContent}>{children}</Content>;
  }

  if (
    activeComment?.type === 'RereplyEditing' &&
    activeComment.idrereply === idrereply &&
    isChild
  ) {
    return <ChildContent as={EditingContent}>{children}</ChildContent>;
  }

  if (isChild) {
    return <ChildContent>{children}</ChildContent>;
  }

  return <Content>{children}</Content>;
};

export default CommentWrapper;

const Content = styled(Box)(() => ({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  margin: '0 1rem',
  paddingTop: '1rem',
  borderTop: '1px solid #ebedf0'
}));

const ChildContent = styled(Content)(() => ({
  padding: '0 0 0 2.5rem',
  borderTop: 'none',

  '& > div:first-of-type': {
    paddingTop: '1rem',
    borderTop: '1px solid #ebedf0'
  }
}));

const EditingContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.custom.grey200
}));
