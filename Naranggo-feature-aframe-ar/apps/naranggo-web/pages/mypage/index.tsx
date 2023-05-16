import MainLayout from '@/components/layout/MainLayout';
import withAuth from '@/components/withAuth';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { PAGES_URL } from '@/consts/constants';

import theme from '@/utils/theme';
import ProfileInfoArea from '@/components/profile/ProfileInfoArea';
import { useState } from 'react';
import { BaseModal } from '@naranggo/storybook';
import { useGetProfile } from '@/components/profile/queries';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import { useAtom, useAtomValue } from 'jotai';
import { termsOfServiceModalAtom } from '@/atoms/ModalAtom';

const STORY_MENUS = [
  { text: '내 스토리', path: PAGES_URL.MY_STORY },
  {
    text: '스크랩한 스토리',
    path: PAGES_URL.SCRAP
  },
  { text: '좋아하는 스토리', path: PAGES_URL.FAVORITE }
];

const SETTING_MENUS = [
  {
    text: '차단 계정 관리',
    path: PAGES_URL.BLOCK_LIST
  }
];

const INFOR_MENUS = [
  { text: '이용약관', path: 'https://www.ndream.com/provision.html' },
  {
    text: '개인정보처리방침',
    path: 'https://www.ndream.com/privacy.html'
  }
];

const Menu: NextPageWithLayout = () => {
  const router = useRouter();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState('');
  const [isTermsModalOpen, setIsTermsModalOpen] = useAtom(
    termsOfServiceModalAtom
  );
  const currentTime = Date.now();

  const { accesstoken, iduser: loggedInUserId } =
    useAtomValue(loginProfileAtom);

  const { data, isLoading, isError, isIdle } = useGetProfile(
    {
      iduser: loggedInUserId,
      accessId: loggedInUserId,
      accesstoken,
      timeStamp: currentTime
    },
    {
      enabled: !!accesstoken && !!loggedInUserId
    }
  );

  return (
    <Wrapper>
      {!data?.data || isLoading || isError || isIdle ? (
        <div style={{ width: '470px', height: '270px' }}></div>
      ) : (
        <ProfileInfoArea data={data?.data} />
      )}
      <Box role="presentation">
        <StyledList>
          <ListTitle>스토리</ListTitle>
          {STORY_MENUS.map(({ text, path }) => (
            <StyledListItem
              key={text}
              onClick={() => {
                if (Reflect.has(router.query, 'id')) {
                  router.push({
                    pathname: path,
                    query: {
                      id: router.query.id
                    }
                  });
                  return;
                }

                router.push(path);
              }}
            >
              <StyledListItemButton>
                <StyledListItemText primary={text} />
              </StyledListItemButton>
            </StyledListItem>
          ))}
        </StyledList>
        <StyledList>
          <ListTitle>사용자 설정</ListTitle>
          {SETTING_MENUS.map(({ text, path }) => (
            <StyledListItem
              key={text}
              onClick={() => {
                if (path) {
                  router.push(path);
                }
              }}
            >
              <StyledListItemButton>
                <StyledListItemText primary={text} />
              </StyledListItemButton>
            </StyledListItem>
          ))}
        </StyledList>
        <StyledList>
          <ListTitle>약관 및 정보</ListTitle>
          {INFOR_MENUS.map(({ text, path }) => (
            <StyledListItem
              key={text}
              onClick={() => {
                path && setIsInfoModalOpen(path);
                setIsTermsModalOpen(true);
              }}
            >
              <StyledListItemButton>
                <StyledListItemText primary={text} />
              </StyledListItemButton>
            </StyledListItem>
          ))}
        </StyledList>
      </Box>
      <BaseModal
        isUsedInMyPage={true}
        isModalOpen={isTermsModalOpen && !!isInfoModalOpen.length}
        leftBtnName="임시로 아무거나 넣어놓습니다."
        rightBtnName="임시로 아무거나 넣어놓습니다"
        onCloseModal={() => {
          router.back();
          setIsInfoModalOpen('');
        }}
        onClickLeftBtn={() => setIsInfoModalOpen('')}
        onClickRightBtn={() => {
          // todo: 시간상 임시로 넣어놓음. BaseModal 대신 iframe 써야할듯
        }}
        sx={{
          '& template': {
            width: '90% !important',
            maxWidth: 'calc(470px - 3rem)',
            minWidth: 'calc(360px - 3rem)'
          }
        }}
      >
        <iframe style={{ height: '60vh' }} src={isInfoModalOpen}></iframe>
      </BaseModal>
    </Wrapper>
  );
};

Menu.getLayout = (page: React.ReactElement) => {
  return (
    <MainLayout
      pageName="마이페이지"
      options={{ notification: true, back: true }}
    >
      {page}
    </MainLayout>
  );
};

export default withAuth(Menu);

const Wrapper = styled(Stack)(() => ({
  overflowX: 'hidden'
}));

const ListTitle = styled(Typography)(() => ({
  padding: '.5rem 1rem .625rem',
  color: '#868686',
  fontSize: '.875rem',
  borderTop: `8px solid ${theme.palette.custom.grey200}`
}));

const StyledList = styled(List)(() => ({
  padding: '0'
}));

const StyledListItem = styled(ListItem)(() => ({
  padding: '0 0 0 2rem',

  '&:last-child': {
    paddingBottom: '1.25rem'
  }
}));

const StyledListItemButton = styled(ListItemButton)(() => ({
  padding: '.625rem 0',

  '& .MuiListItemText-root': {
    margin: 0
  }
}));

const StyledListItemText = styled(ListItemText)(() => ({
  '& .MuiListItemText-primary': {
    fontSize: '1rem'
  }
}));
