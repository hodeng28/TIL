import { IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';

interface ShareButtonProps {
  margin?: string;
  onClick?: () => void;
}

export const ShareButton = ({ margin, onClick }: ShareButtonProps) => (
  <IconButton
    key="back"
    size="large"
    edge="start"
    color="inherit"
    aria-label="back"
    onClick={onClick}
    sx={{
      margin
    }}
  >
    <ShareIcon />
  </IconButton>
);
