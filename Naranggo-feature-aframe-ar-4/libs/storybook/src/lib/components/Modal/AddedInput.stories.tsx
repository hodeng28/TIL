import { ComponentStory, ComponentMeta } from '@storybook/react';
import InputModal from './InputModal';
import {
  Button,
  Stack,
  styled,
  Box,
  Input,
  FormControl,
  InputLabel
} from '@mui/material';

export default {
  title: 'Components/Modal',
  component: InputModal,
  args: {
    inputName: 'inputName',
    children: '문구 입력',
    leftBtnName: '버튼1',
    rightBtnName: '버튼2',
    inputValue: 'inputValue'
  },
  argTypes: {
    onClickLeftBtn: { control: 'clicked left button' },
    onClickRightBtn: { control: 'clicked right button' },
    leftBtnName: { control: 'text' },
    rightBtnName: { control: 'text' },
    message: { control: 'text' },
    inputName: { control: 'text' }
  }
} as ComponentMeta<typeof InputModal>;

export const AddedInput: ComponentStory<typeof InputModal> = (args) => (
  <ModalWrapper>
    <Message>{args.children}</Message>
    <StyledFormControl variant="standard">
      <InputLabel>{args.inputName}</InputLabel>
      <Input value={args.inputValue} />
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
