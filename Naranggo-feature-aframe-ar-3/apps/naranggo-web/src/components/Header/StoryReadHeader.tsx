import {
  Button,
  Grow,
  IconButton,
  Menu,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';
import styled from '@emotion/styled';
import { HeaderContainer, LeftButtonGroup, RightButtonGroup } from './Header';
import { BackIconButton } from '../Button/BackButton';
import { MenuIconButton } from '../Button/MenuButton';
import { useEffect, useRef, useState, MouseEvent } from 'react';
import { isNil, shouldNotForwardProp } from '@/utils/helpers';
import {
  mainImageOpacityAtom,
  mapCenterAtom,
  markerToStoryPointInformationAtom,
  scrolledByButtonAtom
} from '@/atoms/storyReadAtom';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { HeaderTitle } from '../Modal/BottomModal';
import ReportModal from '../Modal/ReportModal';
import { useRouter } from 'next/router';
import { isPreviewOpenAtom, isPreviewPageAtom } from '@/atoms/storyWriteAtom';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import { useMutation } from 'react-query';
import axios from '@/api/axiosClient';
import { BaseModal } from '@naranggo/storybook';
// import { storyPreviewModalAtom } from '@/atoms/ModalAtom';
import useReport from '../Modal/useReport';
import menuAnchorElAtom from '@/atoms/menuAcholElAtom';
import Image from 'next/image';
import { nanoid } from 'nanoid';
import isStoryMapExpandedAtom from '@/atoms/isStoryMapExpandedAtom';
import DisplayContainer from '@/components/login/DisplayContainer';

interface StoryReadHeaderProps {
  isTooltipShown: boolean;
  isPageVisitedFirst?: boolean;
  isMapExpanded: boolean;
  idblog?: number;
  iduser?: number;
  title?: string;
  onGetClientHeight: (headerClientHeight: number) => void;
  onClickScrollToTopButton?: () => void;
}

const StoryReadHeader = ({
  title,
  iduser,
  idblog,
  isTooltipShown,
  isPageVisitedFirst,
  isMapExpanded,
  onGetClientHeight,
  onClickScrollToTopButton
}: StoryReadHeaderProps) => {
  const { iduser: loggedInUserId, accesstoken } =
    useAtomValue(loginProfileAtom);
  const router = useRouter();
  const isPreviewPage = useAtomValue(isPreviewPageAtom);

  const setIsPreviewOpen = useSetAtom(isPreviewOpenAtom);
  // const setOpenPreviewDialog = useSetAtom(storyPreviewModalAtom);

  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] =
    useState(false);

  const { mutate: deleteStory } = useMutation(
    'deleteStory',
    async () =>
      await axios.delete(
        `/apis/delStory?idblog=${idblog}&accessId=${loggedInUserId}&accesstoken=${accesstoken}`
      )
  );

  // todo : 사용자인 경우 처리
  const headerRef = useRef<HTMLDivElement>(null);
  const { isReportModalOpen, handleOpenReportModal, handleCloseReportModal } =
    useReport();

  const [anchorEl, setAnchorEl] = useAtom(menuAnchorElAtom);
  const open = Boolean(anchorEl);

  const setMapCenter = useSetAtom(mapCenterAtom);
  const markerToStoryPointInformation = useAtomValue(
    markerToStoryPointInformationAtom
  );
  const [mainImageOpacity, setMainImageOpacity] = useAtom(mainImageOpacityAtom);
  const setIsScrolledByButton = useSetAtom(scrolledByButtonAtom);
  const setIsMapExpanded = useSetAtom(isStoryMapExpandedAtom);

  const leftButton = (
    <>
      <BackIconButton
        iconColor={
          isPreviewPage ? 'black' : mainImageOpacity === 0 ? 'black' : 'white'
        }
        isShadowExist={
          isPreviewPage ? false : mainImageOpacity === 0 ? false : true
        }
        onClickBack={
          isPreviewPage
            ? () => {
                setIsPreviewOpen(false);
                router.back();
              }
            : () => {
                if (history.length === 1 && window.isWebViewAccess) {
                  router.push('/');
                  return;
                }

                router.back();
                setIsMapExpanded(false);
              }
        }
      />
      {!isPreviewPage && (
        <StyledIconButton
          sx={{
            zIndex: 100,
            filter:
              mainImageOpacity === 1
                ? 'drop-shadow(0px 0px 1px rgb(0 0 0 / 0.4))'
                : ''
          }}
          onClick={() => {
            setIsMapExpanded(false);
            router.push({
              pathname: '/',
              query: {
                id: nanoid(8)
              }
            });
          }}
        >
          <Image
            src={
              mainImageOpacity === 0
                ? '/images/story_home_bk.png'
                : '/images/story_home.png'
            }
            width={32}
            height={32}
            alt="홈버튼 image"
          />
        </StyledIconButton>
      )}
    </>
  );
  const rightButton = (
    <MenuIconButton
      iconColor={mainImageOpacity === 0 ? 'black' : 'white'}
      isShadowExist={mainImageOpacity === 0 ? false : true}
    />
  );

  useEffect(() => {
    const headerElement = headerRef.current;

    if (!isNil(headerElement)) {
      const headerClientHeight = headerElement.clientHeight;
      onGetClientHeight(headerClientHeight);
    }
  });

  const handleClickCompileButton = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(null);

  const handleClickScrollToTopButton = () => {
    if (isScrollPositionAlreadyAtTop(mainImageOpacity)) {
      return;
    }

    setMainImageOpacity(1);
    setMapCenter(
      getMarkerCoordinateOfFirstStoryPoint(markerToStoryPointInformation)
    );
    onClickScrollToTopButton && onClickScrollToTopButton();
    setIsScrolledByButton(true);
  };

  const handleClickReportButton = () => {
    handleOpenReportModal();
    handleCloseMenu();
  };

  const handleClickEditButton = () => {
    router.push({
      pathname: '/story/write',
      query: { storyId: idblog, beforePage: 'storyRead' }
    });
  };

  const handleClickDeleteStoryButton = () => {
    deleteStory();
    router.back();
  };

  return (
    <>
      <StoryReadHeaderContainer
        mainImageOpacity={mainImageOpacity}
        ref={headerRef}
        position="static"
        elevation={0}
      >
        <Toolbar>
          <LeftButtonGroup>{leftButton}</LeftButtonGroup>
          {isMapExpanded ? (
            <HeaderTitle>지도 보기</HeaderTitle>
          ) : (
            <>
              {isPreviewPage ? (
                <HeaderTitle>스토리 미리보기</HeaderTitle>
              ) : (
                <>
                  <Tooltip
                    TransitionComponent={Grow}
                    open={isPageVisitedFirst && isTooltipShown}
                    title="여기를 탭하면 맨 위로 이동해요!"
                    arrow
                  >
                    <FullWidthButton
                      onClick={handleClickScrollToTopButton}
                      mainImageOpacity={mainImageOpacity}
                    >
                      <Typography variant="h6">{title}</Typography>
                    </FullWidthButton>
                  </Tooltip>
                  {router.pathname !== '/play/[playStoryId]' && (
                    <DisplayContainer>
                      <RightButtonGroup onClick={handleClickCompileButton}>
                        {rightButton}
                      </RightButtonGroup>
                    </DisplayContainer>
                  )}
                </>
              )}
            </>
          )}
        </Toolbar>
      </StoryReadHeaderContainer>
      {!isPreviewPage && (
        <>
          <ReportModal
            type="Story"
            isModalOpen={isReportModalOpen}
            onCloseModal={handleCloseReportModal}
            storyOptions={{
              iduser,
              idblog
            }}
          />
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            {iduser === loggedInUserId ? (
              [
                <MenuItemWrapper>
                  <MenuItem onClick={handleClickEditButton} key="수정">
                    수정
                  </MenuItem>
                  <MenuItem
                    onClick={() => setIsDeleteConfirmModalOpen(true)}
                    key="삭제"
                  >
                    삭제
                  </MenuItem>
                </MenuItemWrapper>
              ]
            ) : (
              <MenuItemWrapper>
                <MenuItem onClick={handleClickReportButton}>신고</MenuItem>
              </MenuItemWrapper>
            )}
          </Menu>
        </>
      )}
      <BaseModal
        isModalOpen={isDeleteConfirmModalOpen}
        leftBtnName="취소"
        rightBtnName="삭제"
        onClickLeftBtn={() => setIsDeleteConfirmModalOpen(false)}
        onClickRightBtn={handleClickDeleteStoryButton}
        onCloseModal={() => setIsDeleteConfirmModalOpen(false)}
      >
        이 스토리를 삭제하시겠습니까?
      </BaseModal>
    </>
  );
};

export default StoryReadHeader;

const StoryReadHeaderContainer = styled(
  HeaderContainer,
  shouldNotForwardProp('mainImageOpacity')
)<{ mainImageOpacity: number }>(({ mainImageOpacity }) => ({
  position: 'relative',
  backgroundColor: 'transparent',

  '& .MuiToolbar-root div': {
    margin: 0,
    paddingLeft: '20px'
  },

  '& .MuiToolbar-root div:first-of-type': {
    '& button:first-of-type': {
      width: '36px',
      height: '36px',
      marginRight: '4px'
    },

    '& button': {
      backgroundColor: `rgba(255,255,255, ${mainImageOpacity - 0.7})`
    },

    '& button:last-of-type': {
      '& svg': {
        width: '26px',
        height: '26px'
      }
    }
  }
}));

const FullWidthButton = styled(
  Button,
  shouldNotForwardProp('mainImageOpacity')
)<{ mainImageOpacity: number }>(({ mainImageOpacity }) => ({
  fontWeight: 'bold',
  color: `rgba(0,0,0, ${1 - mainImageOpacity})`,
  flexGrow: 1,
  height: '2.6rem',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  padding: '0',
  margin: '0 1.5rem',

  '& h6': {
    display: 'block',
    position: 'initial',
    maxWidth: '176px',
    width: '100%',
    margin: '0 auto',
    fontSize: '1.15rem',
    whiteSpace: 'nowrap',
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'center'
  }
}));

const MenuItemWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column'
}));

const MenuItem = styled('button')(() => ({
  backgroundColor: 'transparent',
  fontSize: '16px',
  padding: '10px 20px',
  color: 'black',
  textAlign: 'left',
  fontFamily: 'SeoulNamsanM, sans-serif !important',
  border: 'none'
}));

const StyledIconButton = styled(IconButton)(() => ({
  padding: '1px 2px 3px'
}));

const getMarkerCoordinateOfFirstStoryPoint = (
  markerToStoryPointInformation: MarkerToStoryPointInformation
) => {
  const [firstStoryPointInformation] = Object.values(
    markerToStoryPointInformation
  ).sort(
    (
      { scrollYPosition: firstScrollYPosition },
      { scrollYPosition: secondScrollYPosition }
    ) => {
      return firstScrollYPosition - secondScrollYPosition;
    }
  );

  return {
    lat: firstStoryPointInformation.lat,
    lng: firstStoryPointInformation.lng
  };
};

const isScrollPositionAlreadyAtTop = (mainImageOpacity: number) =>
  mainImageOpacity === 1;
