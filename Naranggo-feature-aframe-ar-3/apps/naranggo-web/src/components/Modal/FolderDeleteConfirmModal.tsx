import { Box, styled, Typography } from '@mui/material';
import { BaseModal } from '@naranggo/storybook';

interface FolderDeleteConfirmModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
}

const FolderDeleteConfirmModal = ({
  isModalOpen,
  onCloseModal,
  onClickLeftBtn,
  onClickRightBtn
}: FolderDeleteConfirmModalProps) => {
  return (
    <BaseModal
      isModalOpen={isModalOpen}
      leftBtnName="취소하기"
      rightBtnName="삭제하기"
      onClickLeftBtn={onClickLeftBtn}
      onClickRightBtn={onClickRightBtn}
      onCloseModal={onCloseModal}
    >
      <Wrapper>
        <Typography>폴더 안의 아바타가 전부 삭제됩니다.</Typography>
        <Typography>정말로 삭제하시겠습니까?</Typography>
      </Wrapper>
    </BaseModal>
  );
};

export default FolderDeleteConfirmModal;

const Wrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  margin: '1rem 0',

  '& .MuiTypography-root': {
    fontSize: '.875rem'
  }
}));
