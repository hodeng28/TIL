import { IconButton, styled, Typography } from '@mui/material';
import Image from 'next/image';

interface LikeButtonProps {
  islike: 0 | 1;
  likecount: number;
  margin?: string;
  onClick?: () => void;
}

export const LikeButton = ({
  islike,
  likecount,
  margin,
  onClick
}: LikeButtonProps) => (
  <IconButton
    size="large"
    color="inherit"
    onClick={onClick}
    sx={{
      margin
    }}
  >
    {islike ? (
      <Image
        src="/images/like_s.svg"
        width="20px"
        height="20px"
        alt="likebutton"
      />
    ) : (
      <Image
        src="/images/like_s_gray.svg"
        width="20px"
        height="20px"
        alt="dontlikeicon"
      />
    )}
    <Count>{likecount}</Count>
  </IconButton>
);

const Count = styled(Typography)(() => ({
  marginLeft: '0.2rem'
}));
