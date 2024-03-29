import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface BackIconButtonProps {
  iconColor?: string;
  isShadowExist?: boolean;
  onClickBack?: () => void;
}

const BackIconButton = ({
  iconColor,
  isShadowExist,
  onClickBack,
}: BackIconButtonProps) => (
  <IconButton
    key="back"
    size="large"
    edge="start"
    color="inherit"
    aria-label="back"
    onClick={onClickBack}
  >
    <ArrowBackIcon
      sx={{
        color: iconColor,
        filter: isShadowExist
          ? "drop-shadow(0px 0px 1px rgb(0 0 0 / 0.4))"
          : "",
      }}
    />
  </IconButton>
);

export default BackIconButton;
