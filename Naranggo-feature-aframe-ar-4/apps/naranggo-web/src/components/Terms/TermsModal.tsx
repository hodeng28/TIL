import { Stack, Typography, styled, Modal, Box, Button } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';

interface ModalProps {
  isModalOpen: boolean;
  setShowTerms: Dispatch<boolean>;
  onCloseModal: (value: SetStateAction<boolean>) => void;
  onClickFinishTerms: () => void;
}

const TermsModal = ({
  isModalOpen,
  setShowTerms,
  onClickFinishTerms,
  onCloseModal
}: ModalProps) => {
  const handleClickFinishTerms = () => {
    setShowTerms(false);
    onClickFinishTerms();
  };

  return (
    <Modal open={isModalOpen} onClose={onCloseModal} sx={{ zIndex: 99999 }}>
      <ContentsWrapper>
        <TitleWrapper>
          <Title variant="h6">편리한 나랑고 이용을 위해</Title>
          <Title variant="h6">
            <StrongTypography>접근권한</StrongTypography>을 허용해 주세요.
          </Title>
        </TitleWrapper>
        <TextWrapper>
          <Subject>사진 촬영(선택)</Subject>
          <Contents>
            스토리 또는 프로필에 남길 사진을 촬영할 때 사용됩니다.
          </Contents>
          <Subject>기기의 사진 및 미디어(선택)</Subject>

          <Contents>
            스토리 또는 프로필에 남길 사진을 앨범에서 선택할 때 사용됩니다.
          </Contents>
          <Subject>내 기기 위치에 엑세스(선택)</Subject>
          <Contents>
            내 근처 스토리를 탐색하거나 내 위치에 스토리를 남길 때 사용됩니다.
          </Contents>
        </TextWrapper>
        <SubTitle>
          허용하지 않으셔도 서비스의 다른 기능을 사용할 수 있습니다.
        </SubTitle>
        <AgreeButton variant="contained" onClick={handleClickFinishTerms}>
          계속하기
        </AgreeButton>
      </ContentsWrapper>
    </Modal>
  );
};

export default TermsModal;

const ContentsWrapper = styled(Stack)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: '470px',
  width: '85%',
  padding: '28px',
  backgroundColor: '#ffffff',
  borderRadius: '20px'
}));

const TitleWrapper = styled(Box)(() => ({
  paddingBottom: '30px'
}));

const Title = styled(Typography)(() => ({
  fontWeight: 'bold'
}));

const StrongTypography = styled(Typography)(() => ({
  display: 'inline-block',
  boxShadow: 'inset 0 -8px 0 #BAB5FF',
  lineHeight: '21px',
  fontSize: '20px',
  fontWeight: 'bold'
}));

const Subject = styled(Typography)(() => ({
  padding: '16px 0 8px',
  fontWeight: 'bold'
}));

const TextWrapper = styled(Box)(() => ({
  paddingBottom: '16px',
  borderTop: '1px solid #eeeeee',
  borderBottom: '1px solid #eeeeee'
}));

const Contents = styled(Typography)(() => ({
  color: '#868686',
  fontSize: '14px'
}));

const SubTitle = styled(Typography)(() => ({
  margin: '16px auto 14px',
  fontSize: '12px',
  fontWeight: 'bold'
}));

const AgreeButton = styled(Button)(() => ({
  width: '100%',
  margin: '10px auto 0',
  background: '#736dee',
  color: '#ffffff',
  borderRadius: '10px',

  '&:hover': {
    backgroundColor: '#736dee !important'
  }
}));
