import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import MenuIcon from '@mui/icons-material/Menu';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { styled } from '@mui/material/styles';
import { NextRouter, useRouter } from 'next/router';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { isStoryListScrollTriggeredAtom } from '@/atoms/storyPageAtom';
import isBottomModalOpenAtom from '@/atoms/isBottomModalOpenAtom';
import { visitedPageInformationAtom } from '@/atoms/visitedPageInformationAtom';
import produce from 'immer';
import DisplayContainer from '../login/DisplayContainer';
import { isLoggedInAtom } from '@/atoms/webLoginAtom';

const MENU_PATH = {
  map: '/',
  story: '/story',
  storyWrite: '/story/write',
  menu: '/avatar',
  play: '/play/official'
} as const;

const MenuTabs = () => {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(router.asPath);
  const setIsBottomModalOpen = useSetAtom(isBottomModalOpenAtom);
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const setIsStoryListScrollTriggered = useSetAtom(
    isStoryListScrollTriggeredAtom
  );

  const [visitedPageInformation, setVisitedPageInformation] = useAtom(
    visitedPageInformationAtom
  );

  const restoredInformation =
    'id' in router.query
      ? visitedPageInformation.FOOTER[router.query.id as string]
      : null;

  useEffect(() => {
    setTabValue(router.asPath);
    setIsBottomModalOpen(false);
  }, [router.asPath, setIsBottomModalOpen]);

  useLayoutEffect(() => {
    if (!restoredInformation && router.query.id) {
      const nextState = produce(visitedPageInformation, (draft) => {
        draft.FOOTER[router.query.id as string] = router.query.id as string;
      });

      setVisitedPageInformation(nextState);
    }
  }, [
    restoredInformation,
    router.asPath,
    router.query,
    setVisitedPageInformation,
    visitedPageInformation
  ]);

  return (
    <StyledMenuTabs value={tabValue}>
      <MenuTab
        value={getPath(router, MENU_PATH.map)}
        onClick={() => {
          router.push(getPath(router, MENU_PATH.map));

          if (tabValue === getPath(router, MENU_PATH.map)) {
            setIsStoryListScrollTriggered(true);
          }
        }}
        icon={<HomeIcon />}
        isActive={tabValue === getPath(router, MENU_PATH.map)}
      />
      <MenuTab
        value={getPath(router, MENU_PATH.story)}
        onClick={() => {
          router.push(getPath(router, MENU_PATH.story));

          if (tabValue === getPath(router, MENU_PATH.story)) {
            setIsStoryListScrollTriggered(true);
          }
        }}
        icon={storyIcon}
        isActive={tabValue === getPath(router, MENU_PATH.story)}
      />
      {isLoggedIn || window.isWebViewAccess ? (
        <MenuTab
          value={MENU_PATH.storyWrite}
          onClick={() => {
            router.push(MENU_PATH.storyWrite);
          }}
          icon={<AddLocationIcon />}
          isActive={tabValue === MENU_PATH.storyWrite}
        />
      ) : (
        <DisplayContainer pathName={MENU_PATH.storyWrite}>
          <MenuTab
            value={MENU_PATH.storyWrite}
            onClick={() => {
              router.push(MENU_PATH.storyWrite);
            }}
            icon={<AddLocationIcon />}
            isActive={tabValue === MENU_PATH.storyWrite}
          />
        </DisplayContainer>
      )}
      <MenuTab
        value={MENU_PATH.play}
        onClick={() => {
          router.push(MENU_PATH.play);

          if (tabValue === getPath(router, MENU_PATH.play)) {
            setIsStoryListScrollTriggered(true);
          }
        }}
        icon={<DirectionsRunIcon />}
        isActive={tabValue === MENU_PATH.play}
      />
      {isLoggedIn || window.isWebViewAccess ? (
        <MenuTab
          value={getPath(router, MENU_PATH.menu)}
          onClick={() => {
            router.push(getPath(router, MENU_PATH.menu));
          }}
          icon={<MenuIcon />}
          isActive={tabValue === getPath(router, MENU_PATH.menu)}
        />
      ) : (
        <DisplayContainer
          pathName={MENU_PATH.menu}
          value={getPath(router, MENU_PATH.menu)}
        >
          <MenuTab
            value={getPath(router, MENU_PATH.menu)}
            onClick={() => {
              router.push(getPath(router, MENU_PATH.menu));
            }}
            icon={<MenuIcon />}
            isActive={tabValue === getPath(router, MENU_PATH.menu)}
          />
        </DisplayContainer>
      )}
    </StyledMenuTabs>
  );
};

export default MenuTabs;

const StyledMenuTabs = styled(Tabs)(() => ({
  position: 'relative',
  width: '100%',
  height: '72px',
  flexDirection: 'row',
  alignItems: 'center'
}));

const MenuTab = styled(Tab, {
  shouldForwardProp: (prop) => prop !== 'isActive'
})<{ isActive?: boolean }>(({ isActive }) => ({
  width: '20%',
  color: '#7f7f7f',
  minWidth: 'initial',
  opacity: 1,

  '& .MuiSvgIcon-root': {
    width: '2rem',
    height: '2rem'
  },
  '&.Mui-selected': {
    color: isActive ? '#4843bd' : '#7f7f7f',

    '& path': {
      fill: isActive ? '#4843bd' : '#7f7f7f'
    }
  }
}));

const getPath = (router: NextRouter, defaultPath: string) => {
  if ('id' in router.query) {
    return `${defaultPath}?id=${router.query.id}`;
  }

  return defaultPath;
};

const storyIcon = (
  <svg
    width="22"
    height="25"
    viewBox="0 0 22 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 0H1.31579V25H0V0ZM2.63158 25V6.52514e-05H21.0526V25H2.63158ZM5.26316 3.28947V5.26316H18.4211V3.28947H5.26316ZM5.26316 8.55263V10.5263H7.23684V8.55263H5.26316ZM9.21053 8.55263V10.5263H17.7632V8.55263H9.21053ZM5.26316 13.8158V15.7895H7.23684V13.8158H5.26316ZM9.21053 13.8158V15.7895H17.1053V13.8158H9.21053ZM5.26316 19.0789V21.0526H7.23684V19.0789H5.26316ZM9.21053 19.0789V21.0526H18.4211V19.0789H9.21053Z"
      fill="#7f7f7f"
    />
  </svg>
);
