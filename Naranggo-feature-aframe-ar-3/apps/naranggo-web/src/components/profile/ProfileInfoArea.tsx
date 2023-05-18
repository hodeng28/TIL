import { Avatar, Stack, Typography, styled, Button, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { getProfileImage } from '@/utils/image';
import { Dispatch, useEffect, useRef } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { isNil } from '@/utils/helpers';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import { useAtomValue } from 'jotai';
import DisplayContainer from '../login/DisplayContainer';

interface ProfileInfoAreaProps {
  data: {
    nickname: string;
    profilepath: string;
    userinfo: string;
    storycount: number;
    isfollow: 0 | 1;
    iduser: number;
    followercount: number;
    followingcount: number;
    isblock: 0 | 1;
  };
  onSetProfileInfoAreaClientHeight?: Dispatch<number>;
  onClickUnBlockButton?: () => void;
  onClickStoryButton?: () => void;
  onClickFollowButton?: (
    nickname: string,
    userId: number,
    isfollow: 0 | 1
  ) => void;
}

const ProfileInfoArea = ({
  data: {
    nickname,
    profilepath,
    userinfo,
    storycount,
    isfollow,
    iduser,
    followercount,
    followingcount,
    isblock
  },
  onSetProfileInfoAreaClientHeight,
  onClickUnBlockButton,
  onClickStoryButton,
  onClickFollowButton
}: ProfileInfoAreaProps) => {
  const router = useRouter();
  const profileInfoAreaRef = useRef<HTMLDivElement>(null);

  const { iduser: loggedInUserId } = useAtomValue(loginProfileAtom);

  let {
    query: { userId }
  } = useRouter();

  if (Array.isArray(userId)) {
    userId = userId.join('');
  }

  const onClickProfileStoryButton = () => {
    if (iduser === loggedInUserId) {
      router.push('mypage/story');
    }
    if (userId) {
      return !isblock && router.push(`/profile/${iduser}`);
    }
  };

  useEffect(() => {
    if (!isNil(profileInfoAreaRef.current)) {
      onSetProfileInfoAreaClientHeight &&
        onSetProfileInfoAreaClientHeight(
          profileInfoAreaRef.current.scrollTop +
            profileInfoAreaRef.current.clientHeight
        );
    }
  }, [onSetProfileInfoAreaClientHeight]);

  return (
    <Wrapper ref={profileInfoAreaRef}>
      <ProfileAvatarWrapper>
        <ProfileAvatar>
          <AvatarImage
            alt={nickname}
            src={getProfileImage('profile', profilepath)}
          />
        </ProfileAvatar>
        <Stack>
          <NickName>{nickname}</NickName>
          {isblock ? (
            <NoUserInfoTypography>-</NoUserInfoTypography>
          ) : userinfo && userinfo.length > 0 ? (
            <UserInfoTypography>{userinfo}</UserInfoTypography>
          ) : (
            <NoUserInfoTypography>
              작성된 자기소개가 없습니다.
            </NoUserInfoTypography>
          )}
        </Stack>
        {router.pathname === '/mypage' ? (
          <EditButton
            onClick={() => {
              router.push('/mypage/edit');
            }}
          >
            <Typography>정보수정</Typography>
            <StyledArrowForwardIosIcon />
          </EditButton>
        ) : (
          <DisplayContainer>
            <ButtonWrapper>
              {isblock ? (
                <BlockButton onClick={onClickUnBlockButton}>
                  차단 해제
                </BlockButton>
              ) : isfollow ? (
                <FollowingButton
                  onClick={async () =>
                    onClickFollowButton &&
                    (await onClickFollowButton(
                      nickname,
                      userId ? +userId : 0,
                      isfollow
                    ))
                  }
                >
                  팔로잉
                </FollowingButton>
              ) : (
                <FollowButton
                  onClick={async () =>
                    onClickFollowButton &&
                    (await onClickFollowButton(
                      nickname,
                      userId ? +userId : 0,
                      isfollow
                    ))
                  }
                >
                  팔로우
                </FollowButton>
              )}
            </ButtonWrapper>
          </DisplayContainer>
        )}
      </ProfileAvatarWrapper>
      <ProfileTextWrapper>
        <FollowCountWrapper>
          <MemberInfoCountWrapper
            onClick={() => {
              onClickProfileStoryButton && onClickProfileStoryButton();
            }}
          >
            <MemberInfoCountTypography>
              {isblock ? 0 : storycount}
            </MemberInfoCountTypography>
            <FollowCountsTypography onClick={onClickProfileStoryButton}>
              스토리
            </FollowCountsTypography>
          </MemberInfoCountWrapper>
          <DisplayContainer
            modal
            pathName={`/follower/${iduser}?nickname=${nickname}`}
          >
            <MemberInfoCountWrapper
              onClick={() => {
                if (Reflect.has(router.query, 'id')) {
                  !isblock &&
                    router.push({
                      pathname: `/follower/${iduser}`,
                      query: {
                        nickname,
                        id: router.query.id
                      }
                    });

                  return;
                }

                !isblock &&
                  router.push(`/follower/${iduser}?nickname=${nickname}`);
              }}
            >
              <MemberInfoCountTypography>
                {isblock ? 0 : followercount}
              </MemberInfoCountTypography>
              <FollowCountsTypography>팔로워</FollowCountsTypography>
            </MemberInfoCountWrapper>
          </DisplayContainer>
          <DisplayContainer
            modal
            pathName={`/following/${iduser}?nickname=${nickname}`}
          >
            <MemberInfoCountWrapper
              onClick={() => {
                if (Reflect.has(router.query, 'id')) {
                  !isblock &&
                    router.push({
                      pathname: `/following/${iduser}`,
                      query: {
                        nickname,
                        id: router.query.id
                      }
                    });

                  return;
                }

                !isblock &&
                  router.push(`/following/${iduser}?nickname=${nickname}`);
              }}
            >
              <MemberInfoCountTypography>
                {isblock ? 0 : followingcount}
              </MemberInfoCountTypography>
              <FollowCountsTypography>팔로잉</FollowCountsTypography>
            </MemberInfoCountWrapper>
          </DisplayContainer>
        </FollowCountWrapper>
      </ProfileTextWrapper>
    </Wrapper>
  );
};

export default ProfileInfoArea;

const Wrapper = styled(Stack)(() => ({
  position: 'relative',
  justifyContent: 'space-between',
  padding: '24px',
  paddingTop: '16px',
  height: '270px',
  background: '#EBEBEB'
}));

const ProfileAvatarWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  gap: '1rem',
  width: '100%',
  paddingTop: '2rem'
}));

const ProfileAvatar = styled(Stack)(() => ({
  position: 'relative',
  justifyContent: 'space-around',
  borderRadius: '50%'
}));

const AvatarImage = styled(Avatar)(() => ({
  width: '5rem',
  height: '5rem',
  border: '1px solid #fff'
}));

const FollowCountWrapper = styled(Stack)(() => ({
  flex: '1',
  flexDirection: 'row',
  justifyContent: 'space-around',
  gap: '1rem',

  '& > div': {
    width: 'max-content'
  }
}));

const MemberInfoCountWrapper = styled(Stack)(() => ({
  justifyContent: 'center',
  textAlign: 'center',
  cursor: 'pointer'
}));

const MemberInfoCountTypography = styled(Typography)(() => ({
  paddingBottom: '0.7rem',
  fontSize: '1rem',
  fontWeight: 'bold'
}));

const FollowCountsTypography = styled(Typography)(() => ({
  fontSize: '.875rem',
  fontWeight: 'bold'
}));

const ProfileTextWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '1.2rem 0',
  backgroundColor: '#fff',
  borderRadius: '10px'
}));

const NickName = styled(Typography)(() => ({
  fontWeight: 'bold'
}));

const UserInfoTypography = styled(Typography)(() => ({
  display: '-webkit-flex',
  height: '3.6rem',
  fontSize: '.875rem',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  wordBreak: 'break-word',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  lineHeight: '1.3'
}));

const NoUserInfoTypography = styled(Typography)(() => ({
  fontSize: '.875rem',
  color: '#b3b3b3'
}));

const EditButton = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  top: '5px',
  right: '5px',
  padding: '1rem .75rem 0 0',
  color: '#736DEE',
  borderRadius: '.25rem',
  cursor: 'pointer',

  '& p': {
    fontWeight: 'bold'
  }
}));

const StyledArrowForwardIosIcon = styled(ArrowForwardIosIcon)(() => ({
  fontSize: '12px',
  marginLeft: '.5rem'
}));

const ButtonWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  position: 'absolute',
  top: '1rem',
  right: '1.5rem'
}));

const FollowingButton = styled(Button)(() => ({
  fontSize: '.875rem',
  borderRadius: '5px',
  padding: '2px 25px',
  color: '#736DEE',
  border: '1px solid #736DEE'
}));

const FollowButton = styled(Button)(() => ({
  fontSize: '.875rem',
  backgroundColor: '#736DEE',
  borderRadius: '5px',
  padding: '2px 25px',

  '&: hover': {
    backgroundColor: '#736DEE !important'
  }
}));

const BlockButton = styled(Button)(() => ({
  fontSize: '.875rem',
  backgroundColor: '#736DEE',
  borderRadius: '5px',
  padding: '2px 25px',

  '&: hover': {
    backgroundColor: '#736DEE !important'
  }
}));
