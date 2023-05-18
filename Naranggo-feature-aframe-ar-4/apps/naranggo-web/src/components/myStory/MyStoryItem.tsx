import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import MyStoryDeleteConfirmModal from '../Modal/MyStoryDeleteConfirmModal';
import { useRouter } from 'next/router';

interface MyStoryItemsProps {
  children: React.ReactNode;
}

const MyStoryItems = ({ children }: MyStoryItemsProps) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [isMyStoryDeleteConfirmModalOpen, setIsMyStoryDeleteConfirmModalOpen] =
    useState(false);

  const handleCloseStoryMenu = () => setAnchorEl(null);

  const handleClickStoryDeleteConfirmModal = () => {
    setIsMyStoryDeleteConfirmModalOpen(true);
  };

  const handleClickStoryDelete = () => {
    // todo 리스트에서 삭제
    setIsMyStoryDeleteConfirmModalOpen(false);
  };

  const handleClickStoryEditMove = () => {
    // todo : 해당 스토리의 제작페이지로 이동
    router.push('/story/write');
  };

  return (
    <>
      {children}
      <MyStoryDeleteConfirmModal
        isModalOpen={isMyStoryDeleteConfirmModalOpen}
        onCloseModal={() => setIsMyStoryDeleteConfirmModalOpen(false)}
        onClickLeftBtn={() => setIsMyStoryDeleteConfirmModalOpen(false)}
        onClickRightBtn={handleClickStoryDelete}
      />
      <Menu anchorEl={anchorEl} open={open} onClose={handleCloseStoryMenu}>
        <MenuItem onClick={handleClickStoryEditMove}>수정</MenuItem>
        <MenuItem onClick={handleClickStoryDeleteConfirmModal}>삭제</MenuItem>
      </Menu>
    </>
  );
};

export default MyStoryItems;
