import { Box, styled } from '@mui/material';

interface ParentProps {
  isEditing?: boolean | null;
  isReplying?: boolean | null;
  children: React.ReactNode;
}

const ParentWrapper = ({ isEditing, children, isReplying }: ParentProps) => {
  if (isEditing) {
    return <Content as={EditingContent}>{children}</Content>;
  }

  if (isReplying) {
    return <Box>{children}</Box>;
  }

  return <Content>{children}</Content>;
};

export default ParentWrapper;

const Content = styled(Box)(() => ({
  listStyle: 'none',
  display: 'flex',
  alignItems: 'start',
  padding: '1rem'
}));

const EditingContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.custom.grey200
}));
