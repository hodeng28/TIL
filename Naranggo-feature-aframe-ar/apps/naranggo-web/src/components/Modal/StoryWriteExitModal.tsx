import { Box, styled } from '@mui/material';
import { BaseModal } from '@naranggo/storybook';

interface MyStoryDeleteConfirmModalProps {
  isModalOpen: boolean;
  onCloseModal?: () => void;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
}

const StoryWriteExitModal = ({
  isModalOpen,
  onCloseModal,
  onClickLeftBtn,
  onClickRightBtn
}: MyStoryDeleteConfirmModalProps) => {
  return (
    <BaseModal
      isModalOpen={isModalOpen}
      leftBtnName="취소"
      rightBtnName="나가기"
      onClickLeftBtn={onClickLeftBtn}
      onClickRightBtn={onClickRightBtn}
      onCloseModal={() => {
        onCloseModal && onCloseModal();
      }}
    >
      <Wrapper>작성 중인 내용이 모두 사라집니다.</Wrapper>
      <Wrapper>그래도 이 페이지를 나가시겠습니까?</Wrapper>
    </BaseModal>
  );
};

export default StoryWriteExitModal;

const Wrapper = styled(Box)(() => ({
  width: '18rem'
}));
