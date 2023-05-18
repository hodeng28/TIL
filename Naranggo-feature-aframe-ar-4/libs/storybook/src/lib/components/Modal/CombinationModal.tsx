import {
  Box,
  styled,
  FormControl,
  Input,
  InputLabel,
  Select,
  SelectChangeEvent
} from '@mui/material';
import BaseModal from './Base';

interface ModalProps {
  isModalOpen: boolean;
  leftBtnName: string;
  rightBtnName: string;
  selectLabel: string;
  inputLabel: string;
  inputValue: string;
  selectValue: string;
  modalTitle: string;
  children?: Exclude<React.ReactNode, 'string'>;
  onChangeSelectValue: (e: SelectChangeEvent<string>) => void;
  onChangeInputValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
  onCloseModal: () => void;
}

const CombinationModal = ({
  isModalOpen,
  rightBtnName,
  leftBtnName,
  children,
  inputValue,
  inputLabel,
  selectLabel,
  selectValue,
  modalTitle,
  onChangeSelectValue,
  onChangeInputValue,
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
      <Message>{modalTitle}</Message>
      <StyledNameFormControl variant="standard">
        <InputLabel>{inputLabel}</InputLabel>
        <Input value={inputValue} onChange={onChangeInputValue} />
      </StyledNameFormControl>
      <StyledFormControl variant="standard">
        <InputLabel>{selectLabel}</InputLabel>
        <Select value={selectValue} onChange={onChangeSelectValue}>
          {children}
        </Select>
      </StyledFormControl>
    </BaseModal>
  );
};

export default CombinationModal;

const Message = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledNameFormControl = styled(FormControl)(() => ({
  margin: '1rem 0'
}));

const StyledFormControl = styled(FormControl)(() => ({
  margin: '1rem 0'
}));
