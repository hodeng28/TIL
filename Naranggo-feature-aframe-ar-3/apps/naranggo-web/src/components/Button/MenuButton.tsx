import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MouseEventHandler } from 'react';

interface MenuIconButtonProps {
  iconColor?: string;
  isShadowExist?: boolean;
  onClickMenu?: MouseEventHandler<HTMLButtonElement>;
}

export const MenuIconButton = ({
  iconColor,
  isShadowExist,
  onClickMenu
}: MenuIconButtonProps) => (
  <IconButton
    key="back"
    size="large"
    edge="start"
    color="inherit"
    aria-label="backr"
    onClick={onClickMenu}
  >
    <MoreVertIcon
      sx={{
        color: iconColor,
        filter: isShadowExist ? 'drop-shadow(0px 0px 1px rgb(0 0 0 / 0.4))' : ''
      }}
    />
  </IconButton>
);
