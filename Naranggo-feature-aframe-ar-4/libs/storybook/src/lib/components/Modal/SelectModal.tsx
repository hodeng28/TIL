import {
  Box,
  styled,
  FormControl,
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
  selectValue: string;
  modalTitle: string;
  children?: Exclude<React.ReactNode, 'string'>;
  onChangeValue: (e: SelectChangeEvent<string>) => void;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
  onCloseModal: () => void;
}

const SelectModal = ({
  isModalOpen,
  rightBtnName,
  leftBtnName,
  children,
  selectLabel,
  selectValue,
  modalTitle,
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
      <Message>{modalTitle}</Message>
      <StyledFormControl variant="standard">
        <InputLabel>{selectLabel}</InputLabel>
        <Select value={selectValue} onChange={onChangeValue}>
          {children}
        </Select>
      </StyledFormControl>
    </BaseModal>
  );
};

export default SelectModal;

const Message = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledFormControl = styled(FormControl)(() => ({
  margin: '1rem 0'
}));
