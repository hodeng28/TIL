import Image from 'next/image';
import { Stack, Typography, styled, Button } from '@mui/material';
import { getProfileImage } from '@/utils/image';
import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { useAtomValue } from 'jotai';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import axios from '@/api/axiosClient';
import produce from 'immer';
import { useRouter } from 'next/router';
import { RefObject } from 'react';

interface FollowListProp {
  listRef?: RefObject<HTMLDivElement | null>;
  followList?: ProcessedFollowItem[];
  ObservationComponent: () => JSX.Element;
  isFollowingPage?: boolean;
}

const FollowList = ({
  listRef,
  followList,
  ObservationComponent,
  isFollowingPage = false
}: FollowListProp) => {
  const {
    iduser: loggedInUserId,
    accesstoken,
    nickname: loggedInUserNickname
  } = useAtomValue(loginProfileAtom);
  const router = useRouter();

  const queryClient = useQueryClient();

  const handleClickUserLink = (iduser: number) => {
    if (Reflect.has(router.query, 'id')) {
      router.push({
        pathname: `/profile/${iduser}`,
        query: {
          id: router.query.id
        }
      });

      return;
    }

    router.push(`/profile/${iduser}`);
  };

  const { mutate: follow } = useMutation({
    mutationFn: ({ iduser }: { iduser: number; isFollowingPage?: boolean }) =>
      axios.post(`/apis/setFollow`, {
        accesstoken,
        accessId: loggedInUserId,
        nickname: loggedInUserNickname,
        iduser: iduser
      }),
    onMutate: ({ iduser, isFollowingPage }) => {
      const snapShotOfPreviousData = queryClient.getQueryData<
        InfiniteData<ProcessedFollowItem[]>
      >(isFollowingPage ? 'followingList' : 'followList');

      if (snapShotOfPreviousData) {
        queryClient.setQueryData<InfiniteData<ProcessedFollowItem[]>>(
          isFollowingPage ? 'followingList' : 'followList',
          produce(snapShotOfPreviousData, (draft) => {
            for (let i = 0; i < draft.pages.length; i++) {
              for (let j = 0; j < draft.pages[i].length; j++) {
                if (iduser === draft.pages[i][j].iduser && isFollowingPage) {
                  draft.pages[i][j].isFollowEachOther = 1;
                  break;
                }

                if (iduser === draft.pages[i][j].iduser && !isFollowingPage) {
                  draft.pages[i][j].isFollowEachOther = 1;
                  break;
                }
              }
            }
          })
        );
      }
    }
  });

  const { mutate: unfollow } = useMutation({
    mutationFn: ({ iduser }: { iduser: number; isFollowingPage?: boolean }) =>
      axios.post(`/apis/setUnFollow`, {
        accesstoken,
        accessId: loggedInUserId,
        iduser: iduser
      }),
    onMutate: ({ iduser, isFollowingPage }) => {
      const snapShotOfPreviousData = queryClient.getQueryData<
        InfiniteData<ProcessedFollowItem[]>
      >(isFollowingPage ? 'followingList' : 'followList');

      if (snapShotOfPreviousData) {
        queryClient.setQueryData<InfiniteData<ProcessedFollowItem[]>>(
          isFollowingPage ? 'followingList' : 'followList',
          produce(snapShotOfPreviousData, (draft) => {
            for (let i = 0; i < draft.pages.length; i++) {
              for (let j = 0; j < draft.pages[i].length; j++) {
                if (iduser === draft.pages[i][j].iduser && isFollowingPage) {
                  draft.pages[i][j].isFollowEachOther = 0;
                  break;
                }

                if (iduser === draft.pages[i][j].iduser && !isFollowingPage) {
                  draft.pages[i][j].isFollowEachOther = 0;
                  break;
                }
              }
            }
          })
        );
      }
    }
  });

  const handleClickFollowButton = ({
    iduser,
    isFollowEachOther,
    isFollowUser
  }: {
    iduser: number;
    isFollowEachOther: 0 | 1;
    isFollowUser: 0 | 1;
  }) => {
    if (isFollowingPage) {
      if (isFollowEachOther === 1) {
        unfollow({ iduser, isFollowingPage: true });
      } else {
        follow({ iduser, isFollowingPage: true });
      }
    } else {
      if (isFollowEachOther === 1) {
        unfollow({ iduser });
      } else {
        follow({ iduser });
      }
    }
  };

  return (
    <Wrapper ref={listRef}>
      {followList &&
        followList?.map(
          (
            {
              idfollow,
              nickname,
              profilepath,
              isFollowEachOther,
              iduser,
              isFollowUser,
              userinfo
            },
            index
          ) => (
            <FollowListWrapper key={idfollow}>
              <FollowImageWrapper
                onClick={() => {
                  handleClickUserLink(iduser);
                }}
              >
                <ProfileWrapper>
                  <FollowImage
                    width={48}
                    height={48}
                    objectFit="cover"
                    objectPosition="center"
                    alt={nickname}
                    src={getProfileImage('profile', profilepath)}
                  />
                </ProfileWrapper>
              </FollowImageWrapper>
              <StyledButton
                onClick={() => {
                  handleClickUserLink(iduser);
                }}
              >
                <InforWrapper>
                  <Nickname sx={{ color: '#000000' }}>{nickname}</Nickname>
                  {userinfo && <Infor>{userinfo}</Infor>}
                </InforWrapper>
              </StyledButton>
              {iduser !== loggedInUserId && (
                <FollowableButton
                  onClick={() =>
                    handleClickFollowButton({
                      iduser,
                      isFollowEachOther,
                      isFollowUser
                    })
                  }
                >
                  {!isFollowingPage ? (
                    isFollowEachOther === 0 ? (
                      <Follow>팔로우</Follow>
                    ) : (
                      <Following>팔로잉</Following>
                    )
                  ) : isFollowEachOther === 1 ? (
                    <Following>팔로잉</Following>
                  ) : (
                    <Follow>팔로우</Follow>
                  )}
                </FollowableButton>
              )}
              {index > followList.length - 10 ? (
                <ObservationComponent />
              ) : (
                <></>
              )}
            </FollowListWrapper>
          )
        )}
    </Wrapper>
  );
};
export default FollowList;

const Wrapper = styled(Stack)(() => ({}));

const FollowListWrapper = styled(Stack)(() => ({
  position: 'relative',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  padding: '.625rem',
  alignItems: 'center'
}));

const FollowImageWrapper = styled(Stack)(() => ({
  flexDirection: 'row',

  '& span': {
    flex: '0 0 max-content'
  }
}));

const ProfileWrapper = styled(Stack)(() => ({
  width: '50px',
  height: '50px',
  border: '1px solid #fff',
  borderRadius: '50%'
}));

const FollowImage = styled(Image)(() => ({
  borderRadius: '50%'
}));

const StyledButton = styled('button')(() => ({
  flex: 2,
  width: '55%',
  textAlign: 'left',
  margin: '0 86px 0 16px',
  padding: 0,
  border: 'none',
  background: 'initial'
}));

const InforWrapper = styled(Stack)(() => ({
  justifyContent: 'center',
  width: '100%'
}));

const Nickname = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: '14px',
  whiteSpace: 'nowrap',
  overflowX: 'hidden',
  textOverflow: 'ellipsis'
}));

const Infor = styled(Typography)(() => ({
  fontSize: '12px',
  color: '#a7a7a7',
  whiteSpace: 'nowrap',
  overflowX: 'hidden',
  textOverflow: 'ellipsis'
}));

const FollowableButton = styled(Button)(() => ({
  flex: '0 0 max-content',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  right: 0,
  fontSize: '.875rem',
  margin: 0,
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  color: '#000000'
}));

const Following = styled('div')(() => ({
  backgroundColor: '#ffffff',
  border: '1px solid #736dee',
  color: '#736dee',
  borderRadius: '5px',
  fontSize: '.875rem',
  padding: '1px 16px',
  '&:hover': {
    backgroundColor: '#ffffff !important'
  }
}));

const Follow = styled('div')(() => ({
  backgroundColor: '#736dee',
  color: '#ffffff',
  borderRadius: '5px',
  fontSize: '.875rem',
  padding: '1px 16px',
  '&:hover': {
    backgroundColor: '#736dee !important'
  }
}));
