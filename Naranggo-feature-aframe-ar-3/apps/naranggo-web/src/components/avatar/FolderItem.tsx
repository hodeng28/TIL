import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
  styled,
  Box,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useState, MouseEvent } from 'react';
import AvatarItem from './AvatarItem';
import { MoreHoriz } from '@mui/icons-material';
import AvatarFolderDeleteConfirmModal from '../Modal/FolderDeleteConfirmModal';
import FolderNameChangeModal from '../Modal/FolderNameChangeModal';

interface FolderItemProps {
  idavatarfolder: number;
  foldername: string;
  avatarList: Avatar[];
  avatarFolderList: AvatarFolder[];
}

const FolderItem = ({
  idavatarfolder,
  foldername,
  avatarList,
  avatarFolderList
}: FolderItemProps) => {
  const [isAvatarListShown, setIsAvatarListShown] = useState(false);
  const [isFolderNameChangeModalShown, setIsFolderNameChangeModalShown] =
    useState(false);
  const [isFolderDeleteConfirmModalShown, setIsFolderDeleteConfirmModalShown] =
    useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClickCollapseBtn = () => setIsAvatarListShown(!isAvatarListShown);
  const handleCloseAvatarEditMenu = () => setAnchorEl(null);
  const handleClickAvatarEditBtn = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClickFolderNameChangeBtn = () => {
    setAnchorEl(null);
    setIsFolderNameChangeModalShown(true);
  };
  const handleCloseFolderNameChangeModal = () =>
    setIsFolderNameChangeModalShown(false);

  const handleClickFolderDeleteBtn = () => {
    setAnchorEl(null);
    setIsFolderDeleteConfirmModalShown(true);
  };
  const handleCloseFolderDeleteConfirmModal = () =>
    setIsFolderDeleteConfirmModalShown(false);

  const refactoredAvatarList = refactorData(avatarList, idavatarfolder);

  return (
    <Wrapper>
      <ListItemWrapper>
        <FolderCollapseBtn onClick={handleClickCollapseBtn}>
          <ListItemIcon>
            <FolderOpenIcon />
          </ListItemIcon>
          <ListItemText primary={foldername} />
          {refactoredAvatarList.length}
          {isAvatarListShown ? <ExpandLess /> : <ExpandMore />}
        </FolderCollapseBtn>
        <FolderEditBtn onClick={handleClickAvatarEditBtn}>
          <MoreHoriz />
        </FolderEditBtn>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseAvatarEditMenu}
        >
          <MenuItem onClick={handleClickFolderNameChangeBtn}>수정</MenuItem>
          <MenuItem onClick={handleClickFolderDeleteBtn}>삭제</MenuItem>
        </Menu>
      </ListItemWrapper>
      <Collapse in={isAvatarListShown} timeout="auto" unmountOnExit>
        <List component="ul" disablePadding>
          {refactoredAvatarList.map(
            ({ idavatar, avatarname, edit_date, usingnumber, imgpath }) => (
              <AvatarItem
                key={idavatar}
                avatarname={avatarname}
                edit_date={edit_date}
                usingnumber={usingnumber}
                imgpath={imgpath}
                currentFolder={foldername}
                avatarFolderList={avatarFolderList}
              />
            )
          )}
        </List>
      </Collapse>
      <AvatarFolderDeleteConfirmModal
        isModalOpen={isFolderDeleteConfirmModalShown}
        onCloseModal={handleCloseFolderDeleteConfirmModal}
        onClickLeftBtn={handleCloseFolderDeleteConfirmModal}
        onClickRightBtn={() => {
          // todo : 폴더 변경 구현
        }}
      />
      <FolderNameChangeModal
        isModalOpen={isFolderNameChangeModalShown}
        oldFolderName={foldername}
        onCloseModal={handleCloseFolderNameChangeModal}
        onClickLeftBtn={handleCloseFolderNameChangeModal}
        onClickRightBtn={() => {
          // todo : 폴더 변경 구현
        }}
      />
    </Wrapper>
  );
};

export default FolderItem;

const Wrapper = styled('li')(() => ({
  borderBottom: `1px solid #cccccc`
}));

const FolderCollapseBtn = styled(ListItemButton)(() => ({
  padding: '0.2rem 0 0.2rem 1rem',
  width: '100%'
}));

const FolderEditBtn = styled(IconButton)(() => ({}));

const ListItemWrapper = styled(Box)(() => ({
  display: 'flex'
}));

const refactorData = (avatarList: Avatar[], targetAvatarFolderId: number) =>
  avatarList.filter(
    ({ idavatarfolder }) => idavatarfolder === targetAvatarFolderId
  );
