import { Button, Stack, styled, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState, SetStateAction, Dispatch } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TermsModal from './TermsModal';
import { BaseModal } from '@naranggo/storybook';
import { shouldNotForwardProp } from '@/utils/helpers';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  systemAccessModalAtom,
  termsOfServiceModalAtom
} from '@/atoms/ModalAtom';
import { useAtom } from 'jotai';
import { loginRoutingAtom } from '@/atoms/webLoginAtom';

interface TermsProps {
  setShowTerms: Dispatch<SetStateAction<boolean>>;
  onClickFinishTerms?: () => void;
}

const INFOR_MENUS = [
  { text: '이용 약관', path: 'https://www.ndream.com/provision.html' },
  {
    text: '개인정보 처리방침',
    path: 'https://www.ndream.com/privacy.html'
  }
];

const Terms = ({ setShowTerms, onClickFinishTerms }: TermsProps) => {
  const router = useRouter();
  const [checked, setChecked] = useState([false, false]);
  const [agreed, setAgreed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState('');
  const [loginRouting, setLoginRouting] = useAtom(loginRoutingAtom);
  const [isSystemAccessModalOpen, setIsSystemAccessModalOpen] = useAtom(
    systemAccessModalAtom
  );
  const [isTermsModalOpen, setIsTermsModalOpen] = useAtom(
    termsOfServiceModalAtom
  );

  const handleClickAllCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleClickFirstCheck = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const [isCheckTerms, setIsCheckTerms] = useLocalStorage(
    'isCheckTerms',
    false
  );

  const handleClickSecondCheck = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChecked([checked[0], event.target.checked]);
  };

  const handleClickAgreeTerms = () => {
    if (agreed) {
      setIsModalOpen(true);
      window.isWebViewAccess && setIsSystemAccessModalOpen(true);
    }
  };

  const handleClickFinishTerms = () => {
    if (!window.isWebViewAccess) {
      return onClickFinishTerms && onClickFinishTerms();
    }

    window.isWebViewAccess && setIsSystemAccessModalOpen(false);
    setIsCheckTerms(true);
    setShowTerms(false);
  };

  useEffect(() => {
    if (isCheckTerms) {
      window.localStorage.setItem('isCheckTerms', 'true');
      setShowTerms(false);
    }
  }, [isCheckTerms, setShowTerms]);

  useEffect(() => {
    checked[0] && checked[1] ? setAgreed(true) : setAgreed(false);
  }, [checked]);

  return (
    <>
      <TermsWrapper>
        <LogoWrapper>
          <Image
            key={'나랑고 로고'}
            src={'/images/term_icon.png'}
            alt="나랑고 로고"
            width={80}
            height={80}
          />
        </LogoWrapper>
        <StyledTypography>
          <Typography variant="h5">환영합니다!</Typography>
          <Typography variant="h5">서비스를 이용하기 위해</Typography>
          <Typography variant="h5">아래 약관에 동의해 주세요.</Typography>
        </StyledTypography>
        <Stack>
          <StyledFormControlLabel
            label="모두 동의"
            control={
              <Checkbox
                checked={checked[0] && checked[1]}
                indeterminate={checked[0] !== checked[1]}
                onChange={handleClickAllCheck}
              />
            }
          />
          <CheckBoxWrapper sx={{ ml: 3 }}>
            <CheckBox>
              <StyledFormControlLabel
                label={INFOR_MENUS[0].text}
                control={
                  <Checkbox
                    checked={checked[0]}
                    onChange={handleClickFirstCheck}
                  />
                }
              />
              <ContentsButton
                onClick={() => {
                  setIsInfoModalOpen(INFOR_MENUS[0].path);
                  window.isWebViewAccess && setIsTermsModalOpen(true);
                }}
              >
                <StyledArrowForwardIosIcon />
              </ContentsButton>
            </CheckBox>
            <CheckBox>
              <StyledFormControlLabel
                label={INFOR_MENUS[1].text}
                control={
                  <Checkbox
                    checked={checked[1]}
                    onChange={handleClickSecondCheck}
                  />
                }
              />
              <ContentsButton
                onClick={() => {
                  setIsInfoModalOpen(INFOR_MENUS[1].path);
                  window.isWebViewAccess && setIsTermsModalOpen(true);
                }}
              >
                <StyledArrowForwardIosIcon />
              </ContentsButton>
            </CheckBox>
          </CheckBoxWrapper>
          <AgreeButton
            disabled={agreed ? false : true}
            variant="contained"
            onClick={handleClickAgreeTerms}
          >
            동의하고 시작
          </AgreeButton>
        </Stack>
        {/* <CloseButton variant="contained">나가기</CloseButton> */}
      </TermsWrapper>
      <TermsModal
        setShowTerms={setShowTerms}
        isModalOpen={
          window.isWebViewAccess
            ? isSystemAccessModalOpen && isModalOpen
            : isModalOpen
        }
        onClickFinishTerms={handleClickFinishTerms}
        onCloseModal={() => {
          window.isWebViewAccess && router.back();
          setIsModalOpen(false);
        }}
      />
      <BaseModal
        isUsedInMyPage={true}
        isModalOpen={
          window.isWebViewAccess
            ? isTermsModalOpen && !!isInfoModalOpen.length
            : !!isInfoModalOpen.length
        }
        onCloseModal={() => {
          window.isWebViewAccess && router.back();
          setIsInfoModalOpen('');
        }}
        onClickLeftBtn={() => setIsInfoModalOpen('')}
        sx={{
          zIndex: 99999,
          '& template': {
            width: '90% !important',
            maxWidth: 'calc(470px - 3rem)',
            minWidth: 'calc(360px - 3rem)'
          }
        }}
      >
        <iframe style={{ height: '60vh' }} src={isInfoModalOpen}></iframe>
      </BaseModal>
    </>
  );
};

export default Terms;

const TermsWrapper = styled(Stack)(() => ({
  padding: '15% 1.62rem',
  paddingTop: '6rem',
  height: '100vh',
  touchAction: 'none'
}));

const LogoWrapper = styled(Stack)(() => ({
  width: '80px',
  height: '80px',
  marginBottom: '1rem'
}));

const StyledTypography = styled(Stack)(() => ({
  paddingBottom: '4rem',
  fontWeight: 'bold'
}));

const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  '& .MuiSvgIcon-root': {
    color: '#868686'
  },
  '& .Mui-checked .MuiSvgIcon-root': {
    color: '#736dee'
  },

  '& .MuiCheckbox-root': {
    borderRadius: 'initial'
  },

  '& .MuiTypography-root': {
    lineHeight: '18px'
  }
}));

const CheckBoxWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '0 !important',
  paddingLeft: '12px',
  borderTop: '.5px solid #d9d9d9'
}));

const CheckBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

const ContentsButton = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  color: '#868686',
  fontSize: '12px'
}));

const StyledArrowForwardIosIcon = styled(ArrowForwardIosIcon)(() => ({
  fontSize: '12px'
}));

const AgreeButton = styled(
  Button,
  shouldNotForwardProp('disabled')
)<{ disabled?: boolean }>(({ disabled }) => ({
  width: '100%',
  margin: '70px auto 0',
  backgroundColor: disabled ? '#dadada' : '#736dee',
  color: disabled ? '#868686' : '#ffffff',
  borderRadius: '10px',
  lineHeight: '24.5px',

  '&:hover': {
    backgroundColor: disabled ? '#dadada !important' : '#736dee !important'
  }
}));
