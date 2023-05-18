import { Button, Stack, Input, Typography, styled } from '@mui/material';
import Logout from './Logout';
import ProfileAccountLinkArea from './ProfileAccountLink';
import theme from '@/utils/theme';

const ProfileSet = () => (
  <Wrapper>
    <ProfileTextFiledWrapper>
      <ProfileTextFiled>
        <SetTypography>사용자 이름</SetTypography>
        <TextField />
      </ProfileTextFiled>
      <ProfileTextFiled>
        <SetTypography>소개</SetTypography>
        <TextField />
      </ProfileTextFiled>
      <ProfileSetSaveWrapper>
        <SaveBtn variant="contained">
          <SaveTypography>저장</SaveTypography>
        </SaveBtn>
      </ProfileSetSaveWrapper>
    </ProfileTextFiledWrapper>
    <ProfileAccountLinkArea />
    <Logout />
  </Wrapper>
);

export default ProfileSet;

const Wrapper = styled(Stack)(() => ({
  flexGrow: '1',
  background: 'url(/images/bg.png) no-repeat center top',
  backgroundColor: theme.palette.custom.orange,
  overflowY: 'scroll'
}));

const ProfileTextFiledWrapper = styled(Stack)(() => ({
  margin: '1.5rem',
  padding: '1.5rem',
  backgroundColor: theme.palette.custom.light
}));

const ProfileTextFiled = styled(Stack)(() => ({
  flexDirection: 'row'
}));

const TextField = styled(Input)(() => ({
  flex: 2
}));

const SetTypography = styled(Typography)(() => ({
  flex: 1,
  fontSize: '1rem',
  lineHeight: '3.5rem',
  textAlign: 'left'
}));

const ProfileSetSaveWrapper = styled(Stack)(() => ({
  flexDirection: 'row-reverse',
  marginTop: '.625rem'
}));

const SaveBtn = styled(Button)(() => ({
  backgroundColor: theme.palette.custom.yellow
}));

const SaveTypography = styled(Typography)(() => ({
  color: theme.palette.custom.dark,
  fontWeight: 'bold'
}));
