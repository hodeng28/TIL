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
import { shouldNotForwardProp } from '@naranggo/shared';
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
    playable: number;
    iscomplete: 0 | 1;
    isofficial?: 0 | 1 | 2; // isofficial, idofficialcategory 은 같은 값인데 리스트 별로 키값이 다르기 때문에..
    idofficialcategory?: 0 | 1 | 2;
  };
  size?: 'medium' | 'small';
  variant?: 'none' | 'topBtn';
  representativeImageUrl: string;
  profileImageUrl: string;
  createdtime: string;
  searchKeyword?: string;
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

const BaseCard = ({
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
    publicsetting,
    playable,
    iscomplete,
    isofficial,
    idofficialcategory
  },
  size,
  variant,
  representativeImageUrl,
  createdtime,
  searchKeyword,
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
      <TopWrapper></TopWrapper>
      {children}
    </TopBtnArea>
  );

  const card = (
    <ItemStory>
      <ImageWrapper>
        {variant === 'topBtn' && topBtn}
        {playable === 1 && <PlayStoryLabel>플레이 스토리</PlayStoryLabel>}
        {iscomplete === 1 && (
          <CompletedStamp>
            <Image
              src="/images/completed.png"
              width="100px"
              height="100px"
              alt="플레이스토리 달리기"
            />
          </CompletedStamp>
        )}
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
          <CardCover searchKeyword={searchKeyword} />

          <TextWrapper>
            {idofficialcategory || isofficial ? (
              <LabelWrapper>
                <Image
                  src="/images/run.png"
                  width="16px"
                  height="16px"
                  alt="플레이스토리 달리기"
                />

                <StoryLabelText>
                  {idofficialcategory === 1
                    ? '대한 독립 만세!'
                    : '백제의 고도, 송파'}
                </StoryLabelText>
              </LabelWrapper>
            ) : (
              <></>
            )}
            <TitleWrapper direction="row">
              {searchKeyword && title.includes(searchKeyword) ? (
                <>{HighlightedText(title, searchKeyword)}</>
              ) : (
                <Title>{title}</Title>
              )}
              {distance ? (
                <Distnace>{distance && distanceMath(distance)}</Distnace>
              ) : (
                distance === 0 && <Distnace>{distanceMath(distance)}</Distnace>
              )}
            </TitleWrapper>
            {playable === 0 && (
              <div>
                {searchKeyword && summary?.includes(searchKeyword) ? (
                  <Box sx={{ display: 'inline-flex' }}>
                    {summary.includes(searchKeyword) && (
                      <Summary>
                        <span>{summary.split(searchKeyword)[0]}</span>
                        <span className="highlight">{searchKeyword}</span>
                        <span>{summary.split(searchKeyword)[1]}</span>
                      </Summary>
                    )}
                  </Box>
                ) : (
                  <Summary>{summary}</Summary>
                )}
              </div>
            )}
          </TextWrapper>
        </CardMedia>
      </ImageWrapper>
      <BottomArea
        sx={{
          padding: size === 'small' ? '0.8rem' : '1rem'
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
                {profileImageUrl && (
                  <Image
                    src={profileImageUrl}
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
                    fontWeight: 'bold',
                    color: '#000000'
                  }}
                >
                  {nickname}
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

  if (size === 'small') {
    return <Wrapper onClick={onClickCard}>{card}</Wrapper>;
  }

  return (
    <ListItem
      style={listItemStyle}
      sx={{ padding: listItemStyle ? '8px 16px' : 0, cursor: 'pointer' }}
      onClick={onClickCard}
    >
      {card}
    </ListItem>
  );
};

const HighlightedText = (text: string, query: string) => {
  if (query !== '' && text.includes(query)) {
    const parts = text
      .split(new RegExp(`(${query})`, 'gi'))
      .filter((i) => i !== '');

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <Title style={{ color: '#736DEE' }} key={index}>
              {part}
            </Title>
          ) : (
            <Title key={index}>{part}</Title>
          )
        )}
      </>
    );
  }

  return text;
};

export default BaseCard;

//#region [StoryStyle]
const Wrapper = styled(ListItem)(() => ({
  width: '70%',
  flex: '0 0 70% !important'
}));

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
  display: 'contents',
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

const Summary = styled(Typography)(() => ({
  maxWidth: '250px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '13px',

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

const Distnace = styled(Typography)(() => ({
  display: 'flex',
  alignItems: 'flex-end',
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

//#endregion [StoryStyle]

const LockImage = styled(Stack)(() => ({
  position: 'absolute',
  top: '5px',
  left: '5px',
  width: '40px',
  height: '40px',
  zIndex: 1
}));

const PlayStoryLabel = styled(Stack)(() => ({
  position: 'absolute',
  top: 0,
  left: '10px',
  padding: '2px 12px',
  background: '#FFA800',
  fontSize: '10px',
  color: '#ffffff',
  borderRadius: '0 0 5px 5px',
  zIndex: 1
}));

const CompletedStamp = styled(Stack)(() => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
  zIndex: 1
}));

const LabelWrapper = styled(Box)(() => ({
  display: 'inline-flex',
  marginBottom: '10px',
  padding: '4px 6px',
  background: 'rgba(0, 0, 0, 0.65)',
  borderRadius: '5px'
}));

const StoryLabelText = styled(Typography)(() => ({
  color: '#FFA800',
  fontSize: '10px',
  fontWeight: 'bold',
  lineHeight: '16px',
  marginLeft: '4px'
}));
