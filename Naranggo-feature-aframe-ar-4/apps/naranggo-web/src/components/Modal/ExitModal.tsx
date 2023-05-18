import { Box, Button, Modal, Stack, styled, Typography } from '@mui/material';

interface ExitModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  onClickLeftBtn?: () => void;
  onClickRightBtn?: () => void;
}

const ExitModal = ({
  isModalOpen,
  onCloseModal,
  onClickLeftBtn,
  onClickRightBtn
}: ExitModalProps) => {
  return (
    <Modal open={isModalOpen} onClose={onCloseModal}>
      <ModalWrapper as="div">
        <ElementChildrenWrapper>
          <BlockTextInModal>
            <Typography>변경된 내용은 저장되지 않습니다.</Typography>
            <Typography>이 페이지를 나가시겠습니까?</Typography>
          </BlockTextInModal>
        </ElementChildrenWrapper>
        <BtnWrapper>
          <ModalBtn onClick={onClickLeftBtn} variant="contained">
            취소
          </ModalBtn>
          <ModalBtn onClick={onClickRightBtn} variant="contained">
            나가기
          </ModalBtn>
        </BtnWrapper>
      </ModalWrapper>
    </Modal>
  );
};

export default ExitModal;

const ModalWrapper = styled('template')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.5rem',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '470px',
  padding: '2rem 1rem',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '20px',
  border: 'none'
}));

const ModalBtn = styled(Button)(() => ({
  boxShadow: 'none',
  '&:nth-of-type(2)': { color: '#0074DF' }
}));

const ElementChildrenWrapper = styled(Box)(() => ({
  height: '100%'
}));

const BtnWrapper = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: '1rem'
}));

const BlockTextInModal = styled(Box)(() => ({
  '& p': { fontSize: '0.875rem' }
}));
