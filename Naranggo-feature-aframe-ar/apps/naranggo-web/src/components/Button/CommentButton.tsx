import { IconButton, styled, Typography } from '@mui/material';
import Image from 'next/image';

interface CommentButtonProps {
  replycountsum: number;
  onClick?: () => void;
}

export const CommentButton = ({
  replycountsum,
  onClick
}: CommentButtonProps) => (
  <IconButton size="large" edge="start" color="inherit" onClick={onClick}>
    <Image src="/images/reply_m.svg" width="32px" height="32px" alt="comment" />
    <Count>{replycountsum > 999 ? '999+' : replycountsum}</Count>
  </IconButton>
);

const Count = styled(Typography)(() => ({
  marginLeft: '0.2rem'
}));
