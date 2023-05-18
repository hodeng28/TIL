import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

interface HomeIconButtonProps {
  iconColor?: string;
  isShadowExist?: boolean;
  onClickHome?: () => void;
}

export const HomeButton = ({
  iconColor,
  isShadowExist,
  onClickHome
}: HomeIconButtonProps) => (
  <IconButton
    key="home"
    size="large"
    edge="start"
    color="inherit"
    aria-label="back"
    onClick={onClickHome}
  >
    <HomeIcon
      sx={{
        zIndex: '100',
        color: iconColor,
        filter: isShadowExist ? 'drop-shadow(0px 0px 1px rgb(0 0 0 / 0.4))' : ''
      }}
    />
  </IconButton>
);
