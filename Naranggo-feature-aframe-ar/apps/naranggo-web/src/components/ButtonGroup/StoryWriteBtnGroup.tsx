import TwoOptionsModal from '@/components/common/Modal/TwoOptionsModal';
import { ButtonGroup, Button, styled, Box, Typography } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import StoryWriteLoad from '../../pages/StoryLoad';

interface StoryWriteBtnGroupProps {
  hasStory: boolean;
  pointList: StoryPoint[];
  resetStory: () => void;
  handleLoadStory?: () => void;
  handlePreviewStory?: () => void;
  goPreview: () => void;
}

const StoryWriteBtnGroup = ({
  hasStory,
  resetStory,
  pointList,
  goPreview
}: StoryWriteBtnGroupProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);

  const handleResetStory = () => {
    if (hasStory) {
      setIsConfirmModalOpen(true);
    } else {
      // 새 스토리를 시작합니다.
    }
  };
  const handleLoadStory = () => {
    setIsLoadModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsConfirmModalOpen(false);
  };
  // 저장하기는 또 모달 띄워야함.
  return (
    <>
      <ButtonGroup
        variant="outlined"
        aria-label="outlined primary button group"
      >
        <Button onClick={handleResetStory}>새 스토리</Button>
        <Button onClick={handleLoadStory}>불러오기</Button>
        <Button
          onClick={() => {
            goPreview();
          }}
        >
          미리보기
        </Button>
        <Button
        // onClick={() => {
        //   router.push('/story/write/save', as, option);
        // }}
        >
          <Link
            href={{
              pathname: '/story/write/save',
              query: { pointList: JSON.stringify(pointList) }
            }}
            as={'/story/write/save'}
          >
            저장하기
          </Link>
        </Button>
      </ButtonGroup>
      <TwoOptionsModal
        isModalOpen={isConfirmModalOpen}
        onCloseModal={handleCloseModal}
        onClickLeftBtn={() => {
          setIsConfirmModalOpen(false);
        }}
        onClickRightBtn={() => {
          resetStory();
          setIsConfirmModalOpen(false);
        }}
        leftBtnName="확인"
        rightBtnName="작성 취소"
      >
        <ModalChildrenWrapper>
          <Typography align="center">
            작성중인 스토리가 있습니다. <br />
            저장하시겠습니까?
          </Typography>
        </ModalChildrenWrapper>
      </TwoOptionsModal>
      <TwoOptionsModal
        widthPx="20rem"
        isModalOpen={isLoadModalOpen}
        onCloseModal={() => {
          setIsLoadModalOpen(false);
        }}
      >
        <StoryWriteLoad />
      </TwoOptionsModal>
    </>
  );
};

export default StoryWriteBtnGroup;

const ModalChildrenWrapper = styled(Box)(() => ({
  width: '14em',
  height: '6em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));
