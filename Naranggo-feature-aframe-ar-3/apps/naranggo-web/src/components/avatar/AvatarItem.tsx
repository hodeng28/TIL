import {
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  styled,
  Typography
} from '@mui/material';
import PATHS from '@/consts/paths';
import { MoreHoriz } from '@mui/icons-material';
import { useState, MouseEvent } from 'react';
import AvatarDeleteConfirmModal from '../Modal/AvatarDeleteConfirmModal';
import AvatarFolderChangeModal from '../Modal/AvatarFolderChangeModal';
import { useRouter } from 'next/router';
import { PAGES_URL } from '@/consts/constants';
import { showDate } from '@/utils/time';

interface AvatarItemProps {
  avatarname: string;
  edit_date: string;
  usingnumber: number;
  imgpath: string;
  currentFolder: string;
  avatarFolderList: AvatarFolder[];
}

const AvatarItem = ({
  avatarname,
  edit_date,
  usingnumber,
  imgpath,
  currentFolder,
  avatarFolderList
}: AvatarItemProps) => {
  const [isAvatarFolderChangeModalShown, setIsAvatarFolderChangeModalShown] =
    useState(false);
  const [isAvatarDeleteConfirmModalShown, setIsAvatarDeleteConfirmModalShown] =
    useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const handleClickAvatarEditBtn = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleCloseAvatarEditMenu = () => setAnchorEl(null);

  const handleClickAvatarFolderChangeBtn = () => {
    setAnchorEl(null);
    setIsAvatarFolderChangeModalShown(true);
  };
  const handleCloseAvatarFolderChangeModal = () =>
    setIsAvatarFolderChangeModalShown(false);

  const handleClickAvatarDeleteBtn = () => {
    setAnchorEl(null);
    setIsAvatarDeleteConfirmModalShown(true);
  };
  const handleCloseAvatarDeleteConfirmModal = () =>
    setIsAvatarDeleteConfirmModalShown(false);
  const router = useRouter();

  return (
    <Wrapper>
      <ListItemAvatar>
        <AvatarImage src={PATHS.AVATAR_IMAGE_URL + imgpath} variant="square" />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box>
            <Typography>{avatarname}</Typography>
            <Typography>{showDate(edit_date)}</Typography>
            <Typography>
              {usingnumber === 0
                ? '미사용'
                : usingnumber + '개의 스토리에서 사용중'}
            </Typography>
          </Box>
        }
      />
      <AvatarEditBtn onClick={handleClickAvatarEditBtn}>
        <MoreHoriz />
      </AvatarEditBtn>
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseAvatarEditMenu}>
        <MenuItem onClick={() => router.push('/' + PAGES_URL.AVATAR_CREATE)}>
          수정
        </MenuItem>
        <MenuItem onClick={() => router.push('/' + PAGES_URL.AVATAR_CREATE)}>
          복사
        </MenuItem>
        <MenuItem onClick={handleClickAvatarFolderChangeBtn}>
          폴더 변경
        </MenuItem>
        <MenuItem onClick={handleClickAvatarDeleteBtn}>삭제</MenuItem>
      </Menu>
      <AvatarFolderChangeModal
        isModalOpen={isAvatarFolderChangeModalShown}
        currentFolder={currentFolder}
        avatarFolderList={avatarFolderList}
        onCloseModal={handleCloseAvatarFolderChangeModal}
        onClickLeftBtn={handleCloseAvatarFolderChangeModal}
        onClickRightBtn={() => {
          // todo : 아바타 폴더 이동
        }}
      />
      <AvatarDeleteConfirmModal
        isModalOpen={isAvatarDeleteConfirmModalShown}
        onCloseModal={handleCloseAvatarDeleteConfirmModal}
        onClickLeftBtn={handleCloseAvatarDeleteConfirmModal}
        onClickRightBtn={() => {
          // todo : 아바타 삭제하기
        }}
      />
    </Wrapper>
  );
};

export default AvatarItem;

const Wrapper = styled(ListItem)(() => ({
  borderTop: `1px solid #cccccc`,
  position: 'relative',
  padding: '0.2rem 1rem'
}));

const AvatarImage = styled(Avatar)(() => ({
  width: '4rem',
  height: '4rem',
  paddingRight: '0.6rem'
}));

const AvatarEditBtn = styled(IconButton)(() => ({
  position: 'absolute',
  right: 0,
  top: 0
}));
