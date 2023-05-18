import { Box, styled } from '@mui/material';
import { BaseModal } from '@naranggo/storybook';

interface MyStoryDeleteConfirmModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
}

const MyStoryDeleteConfirmModal = ({
  isModalOpen,
  onCloseModal,
  onClickLeftBtn,
  onClickRightBtn
}: MyStoryDeleteConfirmModalProps) => {
  return (
    <BaseModal
      isModalOpen={isModalOpen}
      leftBtnName="취소"
      rightBtnName="삭제"
      onClickLeftBtn={onClickLeftBtn}
      onClickRightBtn={onClickRightBtn}
      onCloseModal={onCloseModal}
    >
      <Wrapper>이 스토리를 삭제하시겠습니까?</Wrapper>
    </BaseModal>
  );
};

export default MyStoryDeleteConfirmModal;

const Wrapper = styled(Box)(() => ({
  width: '18rem'
}));
