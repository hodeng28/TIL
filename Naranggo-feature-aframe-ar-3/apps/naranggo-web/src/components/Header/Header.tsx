import {
  AppBar,
  IconButton,
  Stack,
  styled,
  Toolbar,
  Typography
} from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CloseIcon from '@mui/icons-material/Close';
import ListAltIcon from '@mui/icons-material/ListAlt';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { BackIconButton } from '../Button/BackButton';
import { MenuIconButton } from '../Button/MenuButton';
import { TextButton } from '../Button/TextButton';
import CheckIcon from '@mui/icons-material/Check';
import theme from '@/utils/theme';
import { MouseEventHandler } from 'react';
import Image from 'next/image';
import { isLoggedInAtom } from '@/atoms/webLoginAtom';
import { useAtomValue } from 'jotai';

type Disabled = boolean;

interface HeaderProps {
  pageName?: string | string[];
  isSubmitBtnActive?: boolean;
  options?: {
    // left
    back?: boolean;
    close?: boolean;
    // right
    next?: boolean | [boolean, Disabled];
    complete?: boolean;
    notification?: boolean;
    storyPreview?: boolean | [boolean, Disabled];
    save?: boolean;
    addAvatar?: boolean;
    addItem?: boolean;
    deleteNotification?: [boolean, Disabled];
    menu?: boolean;
    profileEdit?: boolean;
    storyView?: boolean;
  };
  onClickBack?: () => void;
  onClickClose?: () => void;
  onClickComplete?: () => void;
  onClickSave?: () => void;
  onClickAddAvatar?: () => void;
  onClickAddItem?: () => void;
  onClickNotification?: () => void;
  onClickNext?: () => void;
  onClickStoryPreview?: () => void;
  onClickDeleteNotification?: () => void;
  onClickMenu?: MouseEventHandler<HTMLButtonElement>;
  onClickProfileEdit?: () => void;
  onClickStoryView?: () => void;
  onClickDeepBack?: () => void;
  onClickTitle?: () => void;
}

const Header = ({
  pageName,
  options,
  onClickBack,
  onClickClose,
  onClickSave,
  onClickComplete,
  onClickAddAvatar,
  onClickAddItem,
  onClickNext,
  onClickStoryPreview,
  onClickDeleteNotification,
  onClickMenu,
  onClickProfileEdit,
  onClickDeepBack,
  onClickTitle,
  onClickStoryView,
  isSubmitBtnActive
}: HeaderProps) => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  const leftButtonGroup = [
    options?.back && (
      <BackIconButton key="back" onClickBack={onClickDeepBack || onClickBack} />
    ),
    options?.close && (
      <IconButton
        key="close"
        size="large"
        edge="start"
        color="inherit"
        aria-label="backr"
        onClick={onClickClose}
      >
        <CloseIcon />
      </IconButton>
    )
  ];

  const rightButtonGroup = [
    options?.save && (
      <TextButton key="save" onClick={onClickSave}>
        저장
      </TextButton>
    ),
    options?.addAvatar && (
      <StyledIconButton
        key="addAvatar"
        size="large"
        edge="start"
        color="inherit"
        aria-label="backr"
        onClick={onClickAddAvatar}
      >
        <CreateNewFolderIcon />
      </StyledIconButton>
    ),
    options?.addItem && (
      <TextButton key="addItem" onClick={onClickAddItem}>
        추가
      </TextButton>
    ),
    options?.deleteNotification && (
      <StyledIconButton
        key="deleteNotification"
        size="large"
        edge="start"
        color="inherit"
        aria-label="backr"
        disabled={options.deleteNotification[1]}
        onClick={onClickDeleteNotification}
      >
        {options.deleteNotification[1] ? (
          <Image
            src="/images/trash_gray.svg"
            width="27px"
            height="27px"
            alt="쓰레기통"
          />
        ) : (
          <Image
            src="/images/trash.svg"
            width="27px"
            height="27px"
            alt="쓰레기통"
          />
        )}
      </StyledIconButton>
    ),
    options?.storyPreview && (
      <StyledIconButton
        key="preview"
        size="large"
        edge="start"
        color="inherit"
        aria-label="backr"
        disabled={
          typeof options.storyPreview === 'boolean'
            ? false
            : options.storyPreview[1]
        }
        onClick={onClickStoryPreview}
      >
        <ListAltIcon />
      </StyledIconButton>
    ),
    options?.next && (
      <StyledIconButton
        key="next"
        size="large"
        edge="start"
        color="inherit"
        aria-label="backr"
        disabled={typeof options.next === 'boolean' ? false : options.next[1]}
        onClick={onClickNext}
      >
        <NavigateNextIcon />
      </StyledIconButton>
    ),
    options?.menu && (window.isWebViewAccess || isLoggedIn) && (
      <MenuIconButton key="menu" onClickMenu={onClickMenu} />
    ),
    options?.complete && (
      <StyledIconButton
        key="complete"
        size="large"
        edge="start"
        color="inherit"
        aria-label="backr"
        onClick={onClickComplete}
      >
        <CheckIcon />
      </StyledIconButton>
    ),
    options?.profileEdit && (
      <StyledIconButton
        key="profileEdit"
        size="large"
        edge="start"
        color="inherit"
        aria-label="backr"
        onClick={onClickProfileEdit}
      >
        <CheckIcon color={isSubmitBtnActive ? 'inherit' : 'disabled'} />
      </StyledIconButton>
    )
  ];

  return (
    <HeaderContainer elevation={0}>
      <Toolbar>
        <LeftButtonGroup>{leftButtonGroup}</LeftButtonGroup>
        <HeaderTitleBox>
          <HeaderTitle
            variant="h6"
            onClick={() => onClickTitle && onClickTitle()}
          >
            {pageName ?? (
              // 보류
              <Image
                key={'나랑고 로고'}
                src="/images/naranggo_logo.png"
                alt="나랑고 로고"
                width={73}
                height={29}
              />
            )}
          </HeaderTitle>
        </HeaderTitleBox>
        <RightButtonGroup>{rightButtonGroup}</RightButtonGroup>
      </Toolbar>
    </HeaderContainer>
  );
};

export default Header;

export const HeaderContainer = styled(AppBar)(() => ({
  backgroundColor: theme.palette.custom.light,
  position: 'static',
  zIndex: 1000,

  '& .MuiToolbar-root': {
    padding: 0,
    borderBottom: '2px solid rgba(0, 0, 0, 0.12)'
  }
}));

export const HeaderTitleBox = styled(Stack)(() => ({
  display: 'flex',
  flexGrow: 1,
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, 0)'
}));

export const HeaderTitle = styled(Typography)(() => ({
  display: 'inline-flex',
  fontWeight: 600,
  fontSize: '1.15rem',
  textAlign: 'center',
  textOverflow: 'ellipsis',
  overflowX: 'hidden',
  whiteSpace: 'nowrap'
}));

export const LeftButtonGroup = styled(Stack)(() => ({
  position: 'absolute',
  left: 0,
  display: 'flex',
  flexDirection: 'row',
  marginLeft: '12px'
}));

export const RightButtonGroup = styled(Stack)(() => ({
  position: 'absolute',
  right: 0,
  display: 'flex',
  flexDirection: 'row',
  paddingRight: '5px'
}));

const StyledIconButton = styled(IconButton)(() => ({
  margin: '1px',
  padding: '6px'
}));
