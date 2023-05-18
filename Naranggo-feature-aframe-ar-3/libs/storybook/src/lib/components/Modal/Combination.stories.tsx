import { ComponentStory, ComponentMeta } from '@storybook/react';
import CombinationModal from './CombinationModal';
import {
  Button,
  Stack,
  styled,
  Box,
  Input,
  FormControl,
  MenuItem,
  Select,
  InputLabel
} from '@mui/material';

export default {
  title: 'Components/Modal',
  component: CombinationModal,
  args: {
    inputLabel: 'inputName',
    inputValue: 'inputValue',
    leftBtnName: '버튼1',
    rightBtnName: '버튼2',
    modalTitle: '문구 입력',
    selectValue: 'selectValue',
    selectLabel: 'selectLabel'
  },
  argTypes: {
    onClickLeftBtn: { control: 'clicked left button' },
    onClickRightBtn: { control: 'clicked right button' },
    onChangeValue: { control: 'changed value' },
    leftBtnName: { control: 'text' },
    rightBtnName: { control: 'text' },
    message: { control: 'text' },
    inputLabel: { control: 'text' },
    inputValue: { control: 'text' },
    modalTitle: { control: 'text' },
    selectValue: { control: 'text' },
    selectLabel: { control: 'text' }
  }
} as ComponentMeta<typeof CombinationModal>;

export const Combination: ComponentStory<typeof CombinationModal> = (args) => (
  <ModalWrapper>
    <Message>{args.modalTitle}</Message>
    <StyledFormControl variant="standard">
      <InputLabel>{args.inputLabel}</InputLabel>
      <Input value={args.inputValue} />
    </StyledFormControl>
    <StyledFormControl variant="standard">
      <Select value={args.selectValue}>
        <InputLabel>{args.selectLabel}</InputLabel>
        <MenuItem></MenuItem>
      </Select>
    </StyledFormControl>
    <BtnWrapper>
      <ModalBtn variant="contained">{args.leftBtnName}</ModalBtn>
      <ModalBtn variant="contained">{args.rightBtnName}</ModalBtn>
    </BtnWrapper>
  </ModalWrapper>
);

const ModalWrapper = styled('template')(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '1rem',
  backgroundColor: 'rgb(255, 255, 255)',
  borderRadius: '.25rem',
  opacity: 1
}));

const StyledFormControl = styled(FormControl)(() => ({
  marginTop: '1.25rem'
}));

const ModalBtn = styled(Button)(() => ({
  width: '45%',
  color: 'rgba(255, 255, 255, 1)',
  backgroundColor: 'rgba(49, 34, 174, 1)',
  borderRadius: '.25rem !important'
}));

const BtnWrapper = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: '1.25rem'
}));

const Message = styled(Box)(() => ({
  width: '15rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
