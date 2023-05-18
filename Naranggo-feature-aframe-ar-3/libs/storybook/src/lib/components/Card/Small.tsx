import {
  styled,
  Card,
  CardActions,
  IconButton,
  Box,
  CardMedia,
  Stack,
  Typography,
  Avatar,
  ListItem
} from '@mui/material';

import Image from 'next/image';
import { ImageWithFallback } from '@naranggo/shared';
import { CSSProperties, useCallback } from 'react';

interface BaseCardProps {
  storyItem: {
    idblog: number;
    title: string;
    nickname: string;
    createdtime: string;
    contents: string;
    pointcount: number;
    islike: number;
    distance: number;
    likecount: number;
    replycountsum: number;
    summary: string;
    publicsetting?: number;
  };
  size?: 'medium' | 'small';
  variant?: 'none' | 'topBtn';
  representativeImageUrl: string;
  profileImageUrl: string;
  createdtime: string;
  listItemStyle?: CSSProperties;
  onClickCard?: () => void;
  onClickHeartBtn?: () => void;
  onClickPlaceBtn?: (
    e: React.MouseEvent<HTMLButtonElement>,
    contents: string
  ) => void;
  onClickProfile?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}

const SmallCard = ({
  storyItem: {
    pointcount,
    title,
    distance,
    nickname,
    likecount,
    replycountsum,
    contents,
    summary,
    idblog,
    islike,
    publicsetting
  },
  size,
  variant,
  representativeImageUrl,
  createdtime,
  profileImageUrl,
  children,
  listItemStyle,
  onClickCard,
  onClickPlaceBtn,
  onClickProfile
}: BaseCardProps) => {
  const distanceMath = useCallback((distance: number) => {
    if (Number.isNaN(distance)) return 0;

    if (distance < 1) {
      return Math.floor(distance * 1000) + 'm';
    }
    return Math.floor(distance) + 'km';
  }, []);

  const topBtn = (
    <TopBtnArea>
      <ButtonWrapper>
        {/* <Image
          src="/images/point_s.png"
          width={20}
          height={20}
          alt={nickname}
        />
        <PlaceCount>{pointcount}</PlaceCount> */}
      </ButtonWrapper>
      {children}
    </TopBtnArea>
  );

  const card = (
    <ItemStory>
      <ImageWrapper>
        {variant === 'topBtn' && topBtn}
        {publicsetting === 0 && (
          <LockImage>
            <Image
              src="/images/story_lock.png"
              alt="자물쇠 이미지"
              layout="fill"
              objectFit="cover"
            />
          </LockImage>
        )}
        <CardMedia
          sx={{
            height: size === 'small' ? 150 : 190,
            position: 'relative'
          }}
        >
          {representativeImageUrl && (
            <ImageWithFallback
              src={representativeImageUrl}
              layout="fill"
              objectFit="cover"
              alt={title}
              fallbackComponent="StoryReadMainImage"
            />
          )}
          <CardCover />
        </CardMedia>
      </ImageWrapper>
      <BottomArea
        sx={{
          padding: size === 'small' ? '0.8rem' : '1rem'
        }}
      >
        <TextWrapper>
          <Title>{title}</Title>
          <AlignWrapper direction="row" sx={{ color: '#9c9c9c' }}>
            <Summary>{summary}</Summary>
            <Typography>{distanceMath(distance)}</Typography>
          </AlignWrapper>
        </TextWrapper>
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <ProfileButton
            onClick={(event) => {
              event.stopPropagation();
              onClickProfile && onClickProfile(event);
            }}
          >
            <ProfileImg>
              {profileImageUrl && (
                <Image
                  src={profileImageUrl}
                  width={30}
                  height={30}
                  objectFit="cover"
                  objectPosition="center"
                  alt={nickname}
                />
              )}
            </ProfileImg>
          </ProfileButton>
          <StyledButton
            onClick={(event) => {
              event.stopPropagation();
              onClickProfile && onClickProfile(event);
            }}
          >
            <NickName
              sx={{
                fontWeight: 'bold',
                color: '#000000'
              }}
            >
              {nickname}
            </NickName>
            <Typography>{createdtime}</Typography>
          </StyledButton>
          {/* todo: Avatar 클릭 시 유저 프로필로 이동 */}
          <AlignWrapper direction="row">
            {islike === 1 ? (
              <Image
                src="/images/like_s.png"
                width={15}
                height={15}
                alt={nickname}
              />
            ) : (
              <Image
                src="/images/like_s_gray.png"
                width={15}
                height={15}
                alt={nickname}
              />
            )}
            <Typography>{likecount}</Typography>
            <Image
              src="/images/reply_s.png"
              width={15}
              height={15}
              alt={nickname}
            />
            <Typography>{replycountsum}</Typography>
          </AlignWrapper>
        </Stack>
      </BottomArea>
    </ItemStory>
  );

  if (size === 'small') {
    return <Wrapper onClick={onClickCard}>{card}</Wrapper>;
  }

  return (
    <ListItem
      style={listItemStyle}
      sx={{ padding: listItemStyle ? '8px 16px' : 0 }}
      onClick={onClickCard}
    >
      {card}
    </ListItem>
  );
};

export default SmallCard;

//#region [StoryStyle]
const Wrapper = styled(ListItem)(() => ({
  width: '70%',
  flex: '0 0 70% !important'
}));

const ImageWrapper = styled(Stack)(() => ({
  position: 'relative',
  borderRadius: '10px',
  overflow: 'hidden'
}));

const CardCover = styled(Box)(() => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  background:
    'linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0) 50%), linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0) 25%)',
  zIndex: 9
}));

const ItemStory = styled(Card)(() => ({
  position: 'relative',
  width: '100%',
  margin: '0.5rem auto',
  boxShadow: 'none'
}));

const TopBtnArea = styled(CardActions)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'absolute',
  bottom: 0,
  zIndex: 99,
  boxSizing: 'border-box',
  width: '100%',
  padding: '0.3rem 0'
}));

const ButtonWrapper = styled(IconButton)(() => ({
  position: 'relative',
  width: '35px',
  height: '35px',
  padding: 0,
  color: '#fff',
  '& svg': {
    fontSize: '1rem',
    color: '#fff'
  }
}));

const TextWrapper = styled(Box)(() => ({
  marginBottom: '0.3rem'
}));

const Title = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: '1rem !important',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));

const Summary = styled(Typography)(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));

const NickName = styled(Typography)(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));

const ProfileImg = styled(Avatar)(() => ({
  width: '32px',
  height: '32px',
  border: '1px solid #fff'
}));

const ProfileButton = styled('button')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0
}));

const StyledButton = styled('button')(() => ({
  flex: 2,
  width: '50%',
  textAlign: 'left',
  marginLeft: '0.6rem',
  padding: 0,
  border: 'none',
  background: 'initial',
  '& p:nth-of-type(2)': { color: '#9c9c9c' }
}));

const BottomArea = styled(Box)(() => ({
  padding: '8px 2px !important',
  '& p': {
    fontSize: '0.75rem'
  }
}));

/* 공통 스타일 컴포넌트 */
const AlignWrapper = styled(Stack)(() => ({
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0.3rem',
  '& svg': { color: '#9c9c9c' }
}));

const LockImage = styled(Stack)(() => ({
  position: 'absolute',
  top: '5px',
  left: '5px',
  width: '40px',
  height: '40px',
  zIndex: 1
}));
