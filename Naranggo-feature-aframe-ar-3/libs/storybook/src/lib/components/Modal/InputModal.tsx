import { Box, styled, FormControl, InputLabel, Input } from '@mui/material';
import BaseModal from './Base';

interface ModalProps {
  isModalOpen: boolean;
  leftBtnName: string;
  rightBtnName: string;
  inputName: string;
  inputValue: string;
  onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: Exclude<React.ReactNode, 'string'>;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
  onCloseModal: () => void;
}

const InputModal = ({
  isModalOpen,
  rightBtnName,
  leftBtnName,
  children,
  inputName,
  inputValue,
  onChangeValue,
  onClickLeftBtn,
  onClickRightBtn,
  onCloseModal
}: ModalProps) => {
  return (
    <BaseModal
      isModalOpen={isModalOpen}
      leftBtnName={leftBtnName}
      rightBtnName={rightBtnName}
      onClickLeftBtn={onClickLeftBtn}
      onClickRightBtn={onClickRightBtn}
      onCloseModal={onCloseModal}
    >
      <Message>{children}</Message>
      <StyledFormControl variant="standard">
        <InputLabel>{inputName}</InputLabel>
        <Input value={inputValue} onChange={onChangeValue} />
      </StyledFormControl>
    </BaseModal>
  );
};

export default InputModal;

const Message = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledFormControl = styled(FormControl)(() => ({
  margin: '1rem 0'
}));
