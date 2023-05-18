import { Box, styled, Button, Typography } from '@mui/material';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
interface ChildCommentFolderProps {
  children: React.ReactNode;
  comment: CommentWithId[];
  FolderOpen: boolean;
  onFolderOpen: (isFolderOpen: boolean) => void;
}

const ChildCommentFolder = ({
  children,
  comment,
  FolderOpen,
  onFolderOpen
}: ChildCommentFolderProps) => {
  return (
    <>
      {FolderOpen ? (
        <>
          <Content>{children}</Content>
          <Button onClick={() => onFolderOpen(false)}>
            <Typography sx={{ color: '#000' }}>답글 접기</Typography>
            <KeyboardArrowUpSharpIcon sx={{ color: '#000' }} />
          </Button>
        </>
      ) : (
        <Box sx={{ paddingLeft: '4rem' }} onClick={() => onFolderOpen(true)}>
          <Button>
            <Typography
              sx={{ color: '#000' }}
            >{`${comment.length}개의 답글`}</Typography>
            <KeyboardArrowDownSharpIcon sx={{ color: '#000' }} />
          </Button>
        </Box>
      )}
    </>
  );
};

export default ChildCommentFolder;

const Content = styled(Box)(() => ({
  alignItems: 'start',
  marginBottom: '1rem'
}));
