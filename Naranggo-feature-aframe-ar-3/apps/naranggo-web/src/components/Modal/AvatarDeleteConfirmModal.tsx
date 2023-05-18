import { Box, styled } from '@mui/material';
import { BaseModal } from '@naranggo/storybook';

interface AvatarDeleteConfirmModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
}

const AvatarDeleteConfirmModal = ({
  isModalOpen,
  onCloseModal,
  onClickLeftBtn,
  onClickRightBtn
}: AvatarDeleteConfirmModalProps) => {
  return (
    <BaseModal
      isModalOpen={isModalOpen}
      leftBtnName="취소하기"
      rightBtnName="삭제하기"
      onClickLeftBtn={onClickLeftBtn}
      onClickRightBtn={onClickRightBtn}
      onCloseModal={onCloseModal}
    >
      <Wrapper>정말로 삭제하시겠습니까?</Wrapper>
    </BaseModal>
  );
};

export default AvatarDeleteConfirmModal;

const Wrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
