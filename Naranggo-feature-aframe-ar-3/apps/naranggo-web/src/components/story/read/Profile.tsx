import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import AddIcon from '@mui/icons-material/Add';
import { Avatar, Typography, Button, Box, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import PATH from '@/consts/paths';
import { useEffect, useRef } from 'react';
import { elementInformationAtom } from '@/atoms/storyReadAtom';
import { useSetAtom } from 'jotai';
import { showDate } from '@/utils/time';

type ProfileProps = Pick<
  StoryItem,
  'profilepath' | 'nickname' | 'isfollow' | 'createdtime'
>;

const Profile = ({
  isfollow,
  profilepath,
  nickname,
  createdtime
}: ProfileProps) => {
  const router = useRouter();
  // todo : 프로필 클릭시 프로필 페이지 라우팅
  const handleClickProfileBtn = () => router.push('/profile/userid');

  const profileRef = useRef<HTMLDivElement>(null);

  const setElementInformation = useSetAtom(elementInformationAtom);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setElementInformation((prevState) => ({
        ...prevState,
        mainImageVisibility: entries[0].target.clientHeight
      }));
    });

    profileRef.current && observer.observe(profileRef.current);
    return () => observer.disconnect();
  }, [setElementInformation]);

  return (
    <Wrapper ref={profileRef}>
      <LeftWrapper onClick={handleClickProfileBtn}>
        <Avatar
          src={PATH.PROFILE + profilepath}
          alt={`${nickname} 유저 프로필 이미지`}
        />
      </LeftWrapper>
      <RightWrapper>
        <Nickname>{nickname}</Nickname>
        <PostDate>{showDate(createdtime)}</PostDate>
      </RightWrapper>
      {isfollow ? (
        <Btn variant="contained" startIcon={<Icon as={CheckIcon} />}>
          팔로잉
        </Btn>
      ) : (
        <Btn variant="contained" startIcon={<Icon as={AddIcon} />}>
          팔로우
        </Btn>
      )}
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '20px 15px',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: theme.palette.custom.grey2
}));

const LeftWrapper = styled(IconButton)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: '10px',
  padding: 0
}));

const RightWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: 8
}));

const Nickname = styled(Typography)(() => ({
  fontSize: '1rem',
  fontWeight: 'bold'
}));

const PostDate = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  color: theme.palette.custom.grey3
}));

const Btn = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.custom.blue,
  borderRadius: '25px'
}));

const Icon = styled('template')(({ theme }) => ({
  marginRight: '5px',
  color: theme.palette.custom.light
}));
