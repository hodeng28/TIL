import { Box, styled } from '@mui/material';
import { BaseModal } from '@naranggo/storybook';

interface CommentEditModalModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
}

const CommentEditModal = ({
  isModalOpen,
  onCloseModal,
  onClickLeftBtn,
  onClickRightBtn
}: CommentEditModalModalProps) => {
  return (
    <BaseModal
      isModalOpen={isModalOpen}
      leftBtnName="취소"
      rightBtnName="확인"
      onClickLeftBtn={onClickLeftBtn}
      onClickRightBtn={onClickRightBtn}
      onCloseModal={onCloseModal}
    >
      <Wrapper>작성 중인 내용이 모두 사라집니다.</Wrapper>
      <Wrapper>계속하시겠습니까?</Wrapper>
    </BaseModal>
  );
};

export default CommentEditModal;

const Wrapper = styled(Box)(() => ({
  width: '18rem'
}));
