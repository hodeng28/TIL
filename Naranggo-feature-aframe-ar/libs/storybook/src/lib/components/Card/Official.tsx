import { useCallback, CSSProperties } from 'react';
import {
  styled,
  IconButton,
  Typography,
  CardMedia,
  Card,
  ListItem,
  Box,
  Stack,
  Avatar,
  CardActions
} from '@mui/material';
import Image from 'next/image';
import { shouldNotForwardProp, ImageWithFallback } from '@naranggo/shared';

interface OfficialCardProps {
  playStoryItem: {
    idblog: number;
    iduser: string;
    title: string;
    summary: string;
    lat: number;
    lng: number;
    createdtime: string;
    estimatedtime: number;
    likecount: number;
    nickname: string;
    replycountsum: number;
    iscomplete: number;
    islike: number;
    isscrap: number;
    distance: number;
  };
  children?: React.ReactNode;
  variant?: 'topBtn';
  profilepath: string;
  representative: string;
  listItemStyle?: CSSProperties;
  createdtime: string;
  onClickCard: () => void;
  onClickHeartBtn?: () => void;
  onClickPlaceBtn?: (
    e: React.MouseEvent<HTMLButtonElement>,
    contents: string
  ) => void;
  onClickProfile?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const OfficialCard = ({
  playStoryItem: {
    idblog,
    iduser,
    title,
    summary,
    lat,
    lng,
    createdtime,
    estimatedtime,
    likecount,
    nickname,
    replycountsum,
    iscomplete,
    islike,
    isscrap,
    distance
  },
  variant,
  representative,
  profilepath,
  children,
  listItemStyle,
  onClickCard,
  onClickPlaceBtn,
  onClickProfile
}: OfficialCardProps) => {
  const distanceMath = useCallback((distance: number) => {
    if (Number.isNaN(distance)) return 0;

    if (distance < 1) {
      return Math.floor(distance * 1000) + 'm';
    }
    return Math.floor(distance) + 'km';
  }, []);

  const topBtn = (
    <TopBtnArea>
      <TopWrapper></TopWrapper>
      {children}
    </TopBtnArea>
  );

  const card = (
    <ItemStory>
      <ImageWrapper>
        {variant === 'topBtn' && topBtn}
        {iscomplete === 1 && (
          <Stamp>
            <Image src="/images/stamp.png" alt="stamp" width={60} height={60} />
          </Stamp>
        )}
        <CardMedia
          sx={{
            height: 190,
            position: 'relative'
          }}
        >
          {representative ? (
            <ImageWithFallback
              src={representative}
              layout="fill"
              objectFit="cover"
              alt={nickname}
              fallbackComponent="StoryReadMainImage"
            />
          ) : (
            <></>
          )}
          <CardCover />
          {/* <CardCover searchKeyword={searchKeyword} /> */}
          <TextWrapper>
            <TitleWrapper direction="row">
              <Title>{nickname}</Title>
              {/* {searchKeyword && title.includes(searchKeyword) ? (
                  <Box sx={{ display: 'inline-flex' }}>
                    {title.includes(searchKeyword) && (
                      <>
                        <Title>{title.split(searchKeyword)[0]}</Title>
                        <Title className="highlight">{searchKeyword}</Title>
                        <Title>{title.split(searchKeyword)[1]}</Title>
                      </>
                    )}
                  </Box>
                ) : (
                  <Title>{title}</Title>
                )} */}
              {distance ? (
                <Distnace>{distance && distanceMath(distance)}</Distnace>
              ) : distance === 0 ? (
                <Distnace>{distanceMath(distance)}</Distnace>
              ) : (
                <></>
              )}
            </TitleWrapper>
          </TextWrapper>
        </CardMedia>
      </ImageWrapper>
      <BottomArea
        sx={{
          padding: '1rem'
        }}
      >
        <AlignWrapper direction="row">
          {/* todo: Avatar 클릭 시 유저 프로필로 이동 */}
          <AlignWrapper direction="row">
            <ProfileButton
              onClick={(event) => {
                event.stopPropagation();
                onClickProfile && onClickProfile(event);
              }}
            >
              <ProfileImg>
                {profilepath && (
                  <Image
                    src={profilepath}
                    width={34}
                    height={34}
                    objectFit="cover"
                    objectPosition="center"
                    alt={nickname}
                  />
                )}
              </ProfileImg>

              <Stack
                sx={{
                  textAlign: 'left',
                  marginLeft: '6px',
                  '& p:nth-of-type(2)': { color: '#9c9c9c' }
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'bold'
                  }}
                >
                  nickname
                </Typography>
                <Typography>{createdtime}</Typography>
              </Stack>
            </ProfileButton>
          </AlignWrapper>
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
        </AlignWrapper>
      </BottomArea>
    </ItemStory>
  );

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

export default OfficialCard;

const ImageWrapper = styled(Stack)(() => ({
  position: 'relative',
  borderRadius: '10px',
  overflow: 'hidden',

  '& .highlight': {
    color: '#736DEE !important'
  }
}));

const CardCover = styled(
  Box,
  shouldNotForwardProp('searchKeyword')
)<{ searchKeyword?: string }>(({ searchKeyword }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  background: searchKeyword
    ? 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0) 50%), linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0) 25%)'
    : 'linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0) 50%), linear-gradient(to top, rgba(0,0,0,0.3), rgba(0,0,0,0) 25%)',
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

const TopWrapper = styled(IconButton)(() => ({
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
  position: 'absolute',
  bottom: 0,
  marginBottom: '0.3rem',
  paddingLeft: '.5rem',
  color: '#ffffff',
  zIndex: 10
}));

const TitleWrapper = styled(Stack)(() => ({
  gap: '0.3rem'
}));

const Title = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: '1rem !important',
  lineHeight: '16px',
  maxWidth: '250px',
  whiteSpace: 'nowrap',
  overflowX: 'hidden',
  textOverflow: 'ellipsis',

  '@media screen and (width <= 380px)': {
    maxWidth: '240px'
  },
  '@media screen and (width > 400px)': {
    maxWidth: '280px'
  },
  '@media screen and (width > 435px)': {
    maxWidth: '300px'
  }
}));

const Stamp = styled(Stack)(() => ({
  position: 'absolute',
  top: '8px',
  right: '8px',
  zIndex: 1
}));

const Distnace = styled(Typography)(() => ({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '13px'
}));

const ProfileImg = styled(Avatar)(() => ({
  width: '34px',
  height: '34px',
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
