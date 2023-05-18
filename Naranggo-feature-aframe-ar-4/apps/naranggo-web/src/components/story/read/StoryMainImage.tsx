import Image from 'next/image';
import {
  styled,
  Box,
  Typography,
  Avatar,
  IconButton,
  Stack
} from '@mui/material';
import PATHS, { isKTOpost } from '@/consts/paths';
import { shouldNotForwardProp } from '@/utils/helpers';
import { mainImageOpacityAtom } from '@/atoms/storyReadAtom';
import { useAtomValue } from 'jotai';
import { showDate } from '@/utils/time';
import dayjs from 'dayjs';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import {
  isPreviewPageAtom,
  storyPreviewInformationAtom
} from '@/atoms/storyWriteAtom';

import { useRouter } from 'next/router';
import { ImageWithFallback } from '@naranggo/shared';
import { useFollowQuery, useUnFollowQuery } from '@/queries/FollowQueries';
import { STORY_READ_PAGE_CSS } from '@/consts/css';
import DisplayContainer from '@/components/login/DisplayContainer';

type StoryMainImageProps = {
  pointcount: number;
  headerClientHeight: number;
  iduser?: number;
  idblog?: number;
  profilepath?: string;
  nickname?: string;
  isPreviewPage?: boolean;
  title?: string;
  summary?: string;
  createdtime?: string;
  representative?: string;
  isfollow?: 0 | 1;
  idofficialcategory?: 0 | 1 | 2;
  iscomplete?: 0 | 1;
};

const StoryMainImage = ({
  representative,
  title,
  pointcount,
  summary,
  nickname,
  iduser,
  createdtime,
  isfollow,
  idblog,
  iscomplete,
  profilepath = '',
  headerClientHeight,
  idofficialcategory
}: StoryMainImageProps) => {
  const {
    profilepath: loggedInUserProfilePath,
    iduser: loggedInUserId,
    accesstoken,
    nickname: loggedInUserNickname
  } = useAtomValue(loginProfileAtom);
  const router = useRouter();
  const { query: storyId } = useRouter();

  const { mutate: follow } = useFollowQuery(['getStoryRead', idblog as number]);
  const { mutate: unfollow } = useUnFollowQuery([
    'getStoryRead',
    idblog as number
  ]);

  const isPreviewPage = useAtomValue(isPreviewPageAtom);
  const {
    representative: previewRepresentativeImage,
    title: previewTitle,
    summary: previewSummary
  } = useAtomValue(storyPreviewInformationAtom);

  const mainImageOpacity = useAtomValue(mainImageOpacityAtom);

  const handleClickFollowButton = () => {
    if (isfollow && iduser) {
      unfollow({
        accesstoken,
        accessId: loggedInUserId,
        iduser
      });
    } else if (!isfollow && iduser) {
      follow({
        accesstoken,
        accessId: loggedInUserId,
        nickname: loggedInUserNickname,
        iduser
      });
    }
  };

  const handleRoute = () => {
    if (isPreviewPage) return;

    if (iduser === loggedInUserId) {
      router.push('/mypage');
    } else {
      router.push(`/profile/${iduser}`);
    }
  };

  const getImageSrc = () => {
    if (isPreviewPage && previewRepresentativeImage.length !== 0) {
      return previewRepresentativeImage;
    }

    if (isPreviewPage && previewRepresentativeImage.length === 0) {
      return '/images/empty_photo_1.svg';
    }

    if (
      !isPreviewPage &&
      representative &&
      representative.length !== 0 &&
      isKTOpost(representative)
    ) {
      return 'https:' + representative;
    }

    if (
      !isPreviewPage &&
      representative &&
      representative.length !== 0 &&
      !isKTOpost(representative)
    ) {
      return PATHS.STORY_CONTENT_IMAGE + representative;
    }

    return '/images/empty_photo_1.svg';
  };

  const isNeedToShowEmptyPhoto = getImageSrc() === '/images/empty_photo_1.svg';

  return (
    <>
      {!!mainImageOpacity && (
        <Wrapper
          mapHeight={STORY_READ_PAGE_CSS.HEIGHT.MAP}
          headerClientHeight={headerClientHeight}
          mainImageOpacity={mainImageOpacity}
          isPreviewPage={isPreviewPage}
        >
          <ImageWithFallback
            src={getImageSrc()}
            fallbackComponent="StoryReadMainImage"
            layout="fill"
            objectFit="cover"
            alt="메인 이미지"
            priority={true}
          />
          {isNeedToShowEmptyPhoto ? <></> : <ShadowOnImage />}
          <Information isPreviewPage={isPreviewPage}>
            <Stack>
              <StoryPointCountWrapper>
                <Image
                  src="/images/point_s.svg"
                  width="20px"
                  height="20px"
                  alt="스토리 포인트 마커"
                />
                {pointcount}
              </StoryPointCountWrapper>
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
              <TextWrapper>
                {idofficialcategory ? (
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
                <Title>
                  {isPreviewPage && storyId['storyId']
                    ? previewTitle
                    : isPreviewPage && !storyId['storyId']
                    ? '작성중인 스토리의 미리보기 중입니다'
                    : title}
                </Title>
                <Description>
                  {isPreviewPage && storyId['storyId']
                    ? previewSummary
                    : isPreviewPage && !storyId['storyId']
                    ? '작성중인 스토리의 미리보기 중입니다'
                    : summary}
                </Description>
              </TextWrapper>
            </Stack>
            <Bottom
              sx={{
                '& button': {
                  cursor: isPreviewPage ? 'auto' : 'pointer'
                }
              }}
            >
              <AvatarWrapper onClick={handleRoute}>
                <Avatar
                  src={
                    isPreviewPage
                      ? loggedInUserProfilePath &&
                        loggedInUserProfilePath.length !== 0
                        ? PATHS.PROFILE + loggedInUserProfilePath
                        : '/images/profile_empty.png'
                      : (profilepath &&
                          profilepath.length &&
                          PATHS.PROFILE + profilepath) ||
                        ''
                  }
                  alt={`${nickname} 유저 프로필 이미지`}
                />
              </AvatarWrapper>
              <BottomTextWrapper>
                <NicknameWrapper>
                  <Nickname
                    onClick={handleRoute}
                    isFollowButtonVisible={
                      !isPreviewPage && loggedInUserId !== iduser
                    }
                  >
                    {isPreviewPage ? loggedInUserNickname : nickname}
                  </Nickname>
                  <DisplayContainer>
                    {!isPreviewPage && loggedInUserId !== iduser ? (
                      isfollow ? (
                        <FollowingButton onClick={handleClickFollowButton}>
                          팔로잉
                        </FollowingButton>
                      ) : (
                        <FollowButton onClick={handleClickFollowButton}>
                          팔로우
                        </FollowButton>
                      )
                    ) : (
                      <></>
                    )}
                  </DisplayContainer>
                </NicknameWrapper>
                <PostDate>
                  {isPreviewPage
                    ? dayjs().format('YYYY년 MM월 DD일')
                    : createdtime && showDate(createdtime)}
                </PostDate>
              </BottomTextWrapper>
            </Bottom>
          </Information>
        </Wrapper>
      )}
    </>
  );
};

export default StoryMainImage;

const Wrapper = styled(
  Box,
  shouldNotForwardProp(
    'isPreviewPage',
    'mainImageOpacity',
    'mapHeight',
    'headerClientHeight'
  )
)<{
  mapHeight: string;
  headerClientHeight: number;
  mainImageOpacity: number;
  isPreviewPage: boolean;
}>(({ mapHeight, headerClientHeight, mainImageOpacity, isPreviewPage }) => ({
  width: '100%',
  height: isPreviewPage
    ? '100%'
    : `calc(${mapHeight} + ${headerClientHeight}px + 10px)`, // 10px 안주면 기기에서 이미지가 맵을 다 못 덮음. 이유는 잘 모르겠음.
  position: 'absolute',
  top: isPreviewPage ? `${headerClientHeight}px` : 0,
  opacity: mainImageOpacity,
  color: 'white',
  zIndex: 1
}));

const CompletedStamp = styled(Stack)(() => ({
  position: 'absolute',
  bottom: '0px',
  right: '10px',
  opacity: '0.45'
}));

const LabelWrapper = styled(Box)(() => ({
  display: 'inline-flex',
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

const AvatarWrapper = styled(IconButton)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '10px',
  padding: 0,

  '& .MuiAvatar-root': {
    border: '1px solid #fff'
  }
}));

const Information = styled(
  Box,
  shouldNotForwardProp('isPreviewPage')
)<{ isPreviewPage: boolean }>(({ isPreviewPage }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  height: isPreviewPage ? '85%' : '50%',
  position: 'absolute',
  bottom: '10px',
  padding: '0 0 0 10px',
  paddingTop: 0
}));

const StoryPointCountWrapper = styled(Box)(() => ({
  display: 'flex'
}));

const Title = styled(Typography)(() => ({
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '18px'
}));

const Description = styled(Typography)(() => ({
  fontSize: '0.8rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}));

const TextWrapper = styled(Box)(() => ({
  zIndex: 1
}));

const BottomTextWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: '40px'
}));

const NicknameWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '17rem',

  '@media screen and (width > 360px)': {
    width: '20rem'
  },
  '@media screen and (width > 450px)': {
    width: '23rem'
  },
  '@media screen and (width > 520px)': {
    width: '32rem'
  }
}));

const FollowingButton = styled('button')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.9rem',
  width: '6rem',
  marginLeft: '1rem',
  borderRadius: '8px',
  border: '2px solid #736DEE',
  backgroundColor: 'white',
  cursor: 'pointer',
  color: '#736DEE'
}));

const FollowButton = styled('button')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.9rem',
  marginLeft: '1rem',
  width: '6rem',
  border: '2px solid #736DEE',
  borderRadius: '8px',
  backgroundColor: '#736DEE',
  cursor: 'pointer',
  color: 'white'
}));

const Nickname = styled(
  'button',
  shouldNotForwardProp('isFollowButtonVisible')
)<{ isFollowButtonVisible: boolean }>(({ isFollowButtonVisible }) => ({
  alignItems: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: 'white',
  padding: 0,
  fontSize: '16px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'left',
  width: isFollowButtonVisible ? 'auto' : '100%',
  // '@media screen and (width > 400px)': {
  //   width: isFollowButtonVisible ? '13rem' : '100%'
  // },
  // '@media screen and (width > 470px)': {
  //   width: isFollowButtonVisible ? '17rem' : '100%'
  // },
  '@media screen and (min-device-width: 410px)': {
    width: 'auto'
  }
}));

const PostDate = styled(Typography)(() => ({
  fontSize: '0.8rem'
}));

const Bottom = styled(Box)(() => ({
  display: 'flex',
  flexDireciton: 'row',
  alignItems: 'center'
}));

const ShadowOnImage = styled('div')(() => ({
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.45)',
  position: 'absolute'
}));
