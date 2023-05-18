import { useRef } from 'react';
import { Button, Stack, styled, Modal, SxProps } from '@mui/material';

interface ModalProps {
  sx?: SxProps;
  isUsedInMyPage?: boolean;
  isModalOpen: boolean;
  leftBtnName?: string;
  rightBtnName?: string;
  rightBtnColor?: string;
  leftBtnColor?: string;
  children?: Exclude<React.ReactNode, 'string'>;
  onClickLeftBtn?: (() => void) | null;
  onClickRightBtn?: (() => void) | null;
  onCloseModal: (() => void) | null;
}

const BaseModal = ({
  sx,
  isUsedInMyPage = false,
  isModalOpen,
  rightBtnColor,
  rightBtnName,
  leftBtnName,
  leftBtnColor,
  children,
  onClickLeftBtn,
  onClickRightBtn,
  onCloseModal
}: ModalProps) => {
  const modalWrapperRef = useRef(null);
  return (
    <Modal
      sx={sx}
      open={isModalOpen}
      onClose={() => onCloseModal && onCloseModal()}
    >
      <ModalWrapper isUsedInMyPage={isUsedInMyPage} ref={modalWrapperRef}>
        <ElementChildrenWrapper>{children}</ElementChildrenWrapper>
        {!isUsedInMyPage && (
          <BtnWrapper>
            <LeftModalBtn
              sx={{ color: leftBtnColor }}
              onClick={(e) => {
                e.stopPropagation();
                onClickLeftBtn && onClickLeftBtn();
              }}
            >
              {leftBtnName}
            </LeftModalBtn>
            <RightModalBtn
              sx={{ color: rightBtnColor }}
              onClick={(e) => {
                e.stopPropagation();
                onClickRightBtn && onClickRightBtn();
              }}
            >
              {rightBtnName}
            </RightModalBtn>
          </BtnWrapper>
        )}
      </ModalWrapper>
    </Modal>
  );
};
export default BaseModal;

const ModalWrapper = styled('template', {
  shouldForwardProp: (prop) => prop !== 'isUsedInMyPage'
})<{ isUsedInMyPage?: boolean }>(({ theme, isUsedInMyPage }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: isUsedInMyPage ? 'none' : '1rem',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '470px',
  width: isUsedInMyPage ? '100%' : '80%',
  height: isUsedInMyPage ? '60%' : 'none',
  padding: isUsedInMyPage ? 'none' : '2rem 1rem',
  backgroundColor: theme.palette.background.paper,
  borderRadius: isUsedInMyPage ? 'none' : '20px',
  border: 'none',
  '&:focus': {
    outline: 0,
    outlineColor: 'transparent',
    outlineStyle: 'none'
  }
}));

const LeftModalBtn = styled(Button)(() => ({
  marginRight: '.5rem',
  color: '#8a8a8a',
  boxShadow: 'none'
}));

const RightModalBtn = styled(Button)(() => ({
  color: '#da2828',
  boxShadow: 'none'
}));

const ElementChildrenWrapper = styled(Stack)(() => ({
  height: '100%'
}));

const BtnWrapper = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  gap: '1rem',
  height: '36.5px'
}));
