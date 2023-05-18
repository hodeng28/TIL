import PlayStoryContents from '@/components/playStory/PlayStoryContents';
import PlayStoryMap from '@/components/playStory/PlayStoryMap';
import { useState } from 'react';
import { styled, Snackbar, Stack } from '@mui/material';
import usePlayStoryAlert from '@/hooks/usePlayStoryAlert';
import styles from 'styles/Keyframes.module.css';
import { shouldNotForwardProp } from '@/utils/helpers';
import { useRouter } from 'next/router';
import ProgressBars from '../ProgressBar/ProgressBar';
import { useMutation } from 'react-query';
import axios from '@/api/axiosClient';
import { useAtomValue } from 'jotai';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import PATH from '@/consts/paths';

interface PlayStoryProps {
  contents: PlayStoryContentsData;
}

const PlayStory = ({ contents }: PlayStoryProps) => {
  const { storyPoints, interactive } = contents;
  const { pages } = interactive;
  const playStoryLength = pages.length - 1;
  const router = useRouter();
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [currentPagesIndex, setCurrentPagesIndex] = useState(0);
  const [checkedPrevBlock, setCheckedPrevBlock] = useState(false);
  const {
    query: { playStoryId }
  } = useRouter();

  const { iduser: accessId, accesstoken } = useAtomValue(loginProfileAtom);

  const { mutate: setPlayStoryComplete } = useMutation(
    async () =>
      await axios.post(`/apis/playStoryComplete`, {
        accesstoken,
        accessId,
        idblog: playStoryId
      })
  );

  const blockData = pages[currentPagesIndex].blocks[currentBlockIndex];
  const { centerAlert, topAlert, snackBarOpen } = usePlayStoryAlert(blockData);
  const centerAlertType =
    blockData.type === 'GPSBlockData' || blockData.type === 'ScoreBlockData';
  const topAlertType =
    blockData.type === 'GPSBlockData' || blockData.type === 'InfoBlockData';

  if (blockData.type === 'GotoBlockData') {
    pages.forEach((page, index) => {
      if (page.pageName === blockData.gotoPage) {
        setCurrentPagesIndex(index);
        setCurrentBlockIndex(0);
      }
    });
  }

  const finishPlayStory = () => {
    setPlayStoryComplete();
    router.back();
  };

  const handleClickNextBtn = () => {
    blockData.type === 'FinishBlockData'
      ? finishPlayStory()
      : setCurrentBlockIndex(currentBlockIndex + 1);

    if (blockData.type === 'GPSBlockData') {
      pages.forEach((page, index) => {
        if (page.pageName === blockData.gotoPage) {
          setCurrentPagesIndex(index);
          setCurrentBlockIndex(0);
        }
      });
    }

    // "패턴 인식 실패" 시 이동하는 block으로 설정
    // todo: 인식 성공 로직 구현

    if (blockData.type === 'ImagePatternBlockData') {
      pages.forEach((page, index) => {
        // if (blockData.patternCancel === page.pageName) {
        //   setCurrentBlockIndex(index);
        //   setCurrentBlockIndex(0);
        // }

        if (blockData.patternFound === page.pageName) {
          setCurrentPagesIndex(index);
          setCurrentBlockIndex(0);
        }
      });
    }

    setCheckedPrevBlock(false);
  };

  const handleClickPrevBtn = () => {
    if (currentBlockIndex !== 0) {
      setCurrentBlockIndex(currentBlockIndex - 1);
    } else {
      const prevBlock = pages[currentPagesIndex - 1].blocks.length;

      setCurrentPagesIndex(currentPagesIndex - 1);
      setCurrentBlockIndex(prevBlock - 1);
    }

    if (blockData.type === 'InfoCloseBlockData') {
      setCurrentPagesIndex(currentPagesIndex - 1);
    }

    setCheckedPrevBlock(true);
  };

  if (!checkedPrevBlock && blockData.type === 'InfoCloseBlockData') {
    setCurrentBlockIndex(currentBlockIndex + 1);
  }

  if (!blockData) {
    return <></>;
  }

  return (
    <>
      <ProgressBarWrapper>
        <ProgressBars
          playStoryLength={playStoryLength}
          currentPagesIndex={currentPagesIndex}
        />
      </ProgressBarWrapper>
      {blockData.type === 'ImagePatternBlockData' && (
        <ImageContent
          src={PATH.STORY_CONTENT_IMAGE + blockData.src}
          alt="picture"
        />
      )}
      <PlayStoryMap storyPoints={storyPoints} blockData={blockData} />
      <PlayStoryContents
        interactive={interactive}
        pages={pages}
        blockData={blockData}
        currentBlockIndex={currentBlockIndex}
        setCurrentBlockIndex={setCurrentBlockIndex}
        setCurrentPagesIndex={setCurrentPagesIndex}
        handleClickNextBtn={handleClickNextBtn}
        handleClickPrevBtn={handleClickPrevBtn}
      />
      {centerAlert && centerAlertType && (
        <Alert
          open={snackBarOpen}
          message={centerAlert}
          className="centerAlert"
        />
      )}
      {topAlert && topAlertType && (
        <Alert open={snackBarOpen} message={topAlert} infoBlock={true} />
      )}
    </>
  );
};

export default PlayStory;

const Alert = styled(
  Snackbar,
  shouldNotForwardProp('infoBlock')
)<{ infoBlock?: boolean }>(({ infoBlock }) => ({
  position: 'absolute',
  top: infoBlock ? '10%' : '30%',
  left: '50% !important',
  transform: 'translateX(-50%)',
  width: infoBlock ? 'max-content' : '60%',
  height: 'max-content',
  textAlign: 'center',
  wordBreak: 'break-word',
  whiteSpace: 'pre-line',
  opacity: 0.9,
  zIndex: 9998,
  animation: infoBlock
    ? ''
    : `${styles.snackbar_bounce} 0.5s ease-in-out alternate`,

  '& > div': {
    justifyContent: 'center',
    color: '#ffffff',
    backgroundColor: 'rgba(44, 44, 44, 0.6)'
  },

  '&.centerAlert > div': {
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  }
}));

const ProgressBarWrapper = styled(Stack)(() => ({
  position: 'absolute',
  left: '50%',
  width: '90%',
  transform: 'translate(-50%, 70px)',
  zIndex: 1
}));

const ImageContent = styled('img')(() => ({
  position: 'absolute',
  top: '7rem',
  left: '50%',
  transform: 'translateX(-50%)',
  maxHeight: '10rem',
  margin: 'auto 0',
  borderRadius: '.625rem',
  zIndex: 10
}));
