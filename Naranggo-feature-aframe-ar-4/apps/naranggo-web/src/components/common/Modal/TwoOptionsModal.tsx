import { useRef, MouseEvent } from 'react';
import { Stack, styled, Button, Modal, Box } from '@mui/material';
import theme from '@/utils/theme';

interface TwoOptionsModalProps {
  isModalOpen: boolean;
  leftBtnName?: string;
  rightBtnName?: string;
  isForm?: boolean;
  children?: Exclude<React.ReactNode, 'string'>;
  onCloseModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickLeftBtn?: () => void;
  onClickRightBtn?: (e: MouseEvent<HTMLButtonElement>) => void;
  widthPx?: string;
}

const TwoOptionsModal = ({
  isModalOpen,
  leftBtnName,
  rightBtnName,
  isForm = false,
  children,
  onCloseModal,
  onClickLeftBtn,
  onClickRightBtn,
  widthPx
}: TwoOptionsModalProps) => {
  const modalWrapperRef = useRef(null);

  return (
    <Modal open={isModalOpen} onClose={onCloseModal}>
      {isForm ? (
        <ModalWrapper as="form" ref={modalWrapperRef} onSubmit={onClickLeftBtn}>
          {children}
          <BtnWrapper>
            <ModalBtn variant="contained">{leftBtnName}</ModalBtn>
            <ModalBtn
              onClick={onClickRightBtn}
              variant="contained"
              type="button"
            >
              {rightBtnName}
            </ModalBtn>
          </BtnWrapper>
        </ModalWrapper>
      ) : (
        <ModalWrapper
          as="div"
          ref={modalWrapperRef}
          sx={{ width: widthPx ? widthPx : 'auto' }}
        >
          <ElementChildrenWrapper>{children}</ElementChildrenWrapper>
          <BtnWrapper>
            {leftBtnName && onClickLeftBtn && (
              <ModalBtn onClick={onClickLeftBtn} variant="contained">
                {leftBtnName}
              </ModalBtn>
            )}
            {rightBtnName && onClickRightBtn && (
              <ModalBtn onClick={onClickRightBtn} variant="contained">
                {rightBtnName}
              </ModalBtn>
            )}
          </BtnWrapper>
        </ModalWrapper>
      )}
    </Modal>
  );
};

export default TwoOptionsModal;

const ModalWrapper = styled('template')(() => ({
  display: 'flex',
  flexDirection: 'column',
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

  '&:nth-of-type(2)': { color: '#DA2828' }
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
