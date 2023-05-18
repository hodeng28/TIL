import React, { ReactElement, useEffect, useRef } from 'react';
import { Box, IconButton, Stack, styled, Toolbar } from '@mui/material';
import MenuTabs from './MenuTabs';
import Header from '../Header/Header';
import Footer from './Footer';
import SortSharpIcon from '@mui/icons-material/SortSharp';
import SearchIcon from '@mui/icons-material/Search';
import { BackIconButton } from '../Button/BackButton';
import { useRouter } from 'next/router';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { isStoryListScrollTriggeredAtom } from '@/atoms/storyPageAtom';
import { scrollTo } from '@/utils/helpers';
import mainContainerRefAtom from '@/atoms/mainContainerRefAtom';
import Image from 'next/image';
import notificationIconShowAtom from '@/atoms/notificationIconShowAtom';
import { useSessionStorage } from '@/hooks/useSessionStorage';
import {
  mainFilterIconShowAtom,
  playStoryIconShowAtom,
  storyFilterIconShowAtom
} from '@/atoms/filterIconShowAtom';
import isBottomModalOpenAtom from '@/atoms/isBottomModalOpenAtom';
import { isLoggedInAtom } from '@/atoms/webLoginAtom';
import { useWindowSize } from '@/hooks/useWindowResize';

interface MainLayoutProps {
  children: React.ReactNode;
  pageName?: string;
  options?: {
    // left
    back?: boolean;
    deepBack?: boolean;
    // right
    search?: boolean;
    storySort?: boolean;
    storySortFilter?: boolean;
    playStoryFilter?: boolean;
    notification?: boolean;
    filter?: boolean;
  };
  onClickFilterModal?: () => void;
}

const MainLayout = ({ children, pageName, options }: MainLayoutProps) => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const router = useRouter();
  const setIsBottomModalOpen = useSetAtom(isBottomModalOpenAtom);
  const windowHeight = useWindowSize()[1];
  const mainLayoutRef = useRef<HTMLDivElement>(null);

  const setMainContainerRef = useSetAtom(mainContainerRefAtom);
  const isShowNotification = useAtomValue(notificationIconShowAtom);
  const isShowMainFilterAppled = useAtomValue(mainFilterIconShowAtom);
  const isShowStoryFilterAppled = useAtomValue(storyFilterIconShowAtom);
  const isShowPlayStoryFilterAppled = useAtomValue(playStoryIconShowAtom);

  const [isStoryListScrollTriggered, setIsStoryListScrollTriggered] = useAtom(
    isStoryListScrollTriggeredAtom
  );

  const [searchState, setSearchState] = useSessionStorage('SeachInformaiton', {
    type: 'none',
    scroll: 0,
    keyword: ''
  });

  const leftButtonGroup = [
    options?.back && (
      <IconButton
        key="back"
        color="inherit"
        onClick={() => {
          router.back();
        }}
      >
        <BackIconButton />
      </IconButton>
    )
  ];

  const rightButtonGroup = [
    options?.search && (
      <StyledIconButton
        key="search"
        size="large"
        edge="start"
        color="inherit"
        aria-label="backr"
        onClick={() => {
          router.push('/search');

          if (searchState.type !== 'none') {
            setSearchState({
              type: 'none',
              scroll: 0,
              keyword: ''
            });
          }
        }}
      >
        <SearchIcon sx={{ width: '27px', height: '27px', color: 'black' }} />
      </StyledIconButton>
    ),
    options?.storySort && (
      <StyledIconButton
        key="storySort"
        size="large"
        edge="start"
        color="inherit"
        aria-label="backr"
        onClick={() => {
          setIsBottomModalOpen(true);
        }}
        sx={{ padding: 0 }}
      >
        <SortSharpIcon />
      </StyledIconButton>
    ),
    options?.filter && (
      <StyledIconButton
        key="filter"
        size="large"
        edge="start"
        color="inherit"
        aria-label="backr"
        onClick={() => {
          setIsBottomModalOpen(true);
        }}
      >
        {isShowMainFilterAppled ? (
          <Image
            src="/images/filter_on.png"
            width="24px"
            height="24px"
            alt="필터on"
          />
        ) : (
          <Image
            src="/images/filter_off.png"
            width="24px"
            height="24px"
            alt="필터off"
          />
        )}
      </StyledIconButton>
    ),
    options?.storySortFilter && (
      <StyledIconButton
        key="storySortFilter"
        size="large"
        edge="start"
        color="inherit"
        aria-label="backr"
        onClick={() => {
          setIsBottomModalOpen(true);
        }}
      >
        {isShowStoryFilterAppled ? (
          <Image
            src="/images/filter_on.png"
            width="24px"
            height="24px"
            alt="필터on"
          />
        ) : (
          <Image
            src="/images/filter_off.png"
            width="24px"
            height="24px"
            alt="필터off"
          />
        )}
      </StyledIconButton>
    ),
    options?.playStoryFilter && (
      <StyledIconButton
        key="playStoryFilter"
        size="large"
        edge="start"
        color="inherit"
        aria-label="backr"
        onClick={() => {
          setIsBottomModalOpen(true);
        }}
      >
        {isShowPlayStoryFilterAppled ? (
          <Image
            src="/images/filter_on.png"
            width="24px"
            height="24px"
            alt="필터on"
          />
        ) : (
          <Image
            src="/images/filter_off.png"
            width="24px"
            height="24px"
            alt="필터off"
          />
        )}
      </StyledIconButton>
    ),
    options?.notification && (window.isWebViewAccess || isLoggedIn) && (
      <StyledIconButton
        key="notification"
        size="large"
        edge="start"
        color="inherit"
        aria-label="backr"
        onClick={() => {
          router.push('mypage/alarm');
        }}
      >
        {isShowNotification ? (
          <Image
            src="/images/alarm_on.png"
            width="27px"
            height="27px"
            alt="새 알림"
          />
        ) : (
          <Image
            src="/images/alarm_off.png"
            width="27px"
            height="27px"
            alt="알림"
          />
        )}
      </StyledIconButton>
    )
  ];

  useEffect(() => {
    if (isStoryListScrollTriggered) {
      scrollTo(mainLayoutRef);
      setIsStoryListScrollTriggered(false);
    }
  }, [isStoryListScrollTriggered, setIsStoryListScrollTriggered]);

  useEffect(() => {
    setMainContainerRef(mainLayoutRef);
  }, [setMainContainerRef]);

  return (
    <MainLayoutStack sx={{ height: windowHeight }}>
      <Toolbar>
        <LeftButtonGroup>{leftButtonGroup}</LeftButtonGroup>
        <Header
          options={{
            back: options?.deepBack
          }}
          pageName={pageName}
          onClickDeepBack={options?.deepBack ? () => router.back() : undefined}
        />
        <RightButtonGroup>{rightButtonGroup}</RightButtonGroup>
      </Toolbar>
      <MainContainer ref={mainLayoutRef}>
        {pageName !== '스토리'
          ? children
          : React.cloneElement(children as ReactElement, {
              containerRef: mainLayoutRef
            })}
      </MainContainer>
      <Footer>
        <MenuTabs />
      </Footer>
    </MainLayoutStack>
  );
};

export default MainLayout;

const MainLayoutStack = styled(Stack)(() => ({
  position: 'static',
  overflow: 'hidden',
  touchAction: 'none',

  '& .MuiToolbar-root': {
    padding: 0
  }
}));

const StyledIconButton = styled(IconButton)(() => ({
  margin: '1px',
  padding: '6px'
}));

const MainContainer = styled(Box)(() => ({
  flex: 1,
  overflowY: 'auto'
}));

export const LeftButtonGroup = styled(Stack)(() => ({
  position: 'absolute',
  left: 0,
  display: 'flex',
  flexDirection: 'row',
  zIndex: 1001
}));

export const RightButtonGroup = styled(Stack)(() => ({
  position: 'absolute',
  right: 0,
  display: 'flex',
  flexDirection: 'row',
  zIndex: 1000,
  color: '#7f7f7f',
  paddingRight: '5px'
}));
