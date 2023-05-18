import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, styled, SxProps } from '@mui/material';

interface FloatingButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  sx?: SxProps;
}

const FloatingButton = ({
  onClick,
  disabled = false,
  sx = {
    position: 'absolute',
    zIndex: 1,
    right: 13,
    bottom: 13
  }
}: FloatingButtonProps) => (
  <StyledFab sx={sx} aria-label="add" disabled={disabled} onClick={onClick}>
    <AddIcon
      sx={{
        color: '#ffffff'
      }}
    />
  </StyledFab>
);

export default FloatingButton;

const StyledFab = styled('button')(() => ({
  border: 'none',
  width: '3rem',
  height: '3rem',
  borderRadius: '50%',
  backgroundColor: '#736dee !important',

  '& .MuiFab-circular:hover': {
    backgroundColor: '#736dee !important'
  },

  cursor: 'pointer'
}));
