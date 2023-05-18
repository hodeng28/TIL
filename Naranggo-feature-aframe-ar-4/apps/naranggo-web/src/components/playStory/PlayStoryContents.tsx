import { useEffect, useRef, useState } from 'react';
import { Box, Stack, styled } from '@mui/material';
import ItemAddBlock from './contents/ItemAddBlock';
import PictureBlock from './contents/PictureBlock';
import SelectionBlock from './contents/SelectionBlock';
import AvatarBlock from './contents/AvatarBlock';
import ImagePatternBlock from './contents/ImagePatternBlock';
import TextBlock from './contents/TextBlock';
import NextBtn from './button/NextBtn';
import PrevBtn from './button/PrevBtn';
import SkipBlock from './contents/Skipblock';

interface PlayStoryContentsProps {
  pages: interactivePagesData[];
  blockData: PagesBlock;
  currentBlockIndex: number;
  interactive: interactiveData;
  setCurrentPagesIndex: React.Dispatch<React.SetStateAction<number>>;
  setCurrentBlockIndex: React.Dispatch<React.SetStateAction<number>>;
  handleClickNextBtn: () => void;
  handleClickPrevBtn: () => void;
}

const PlayStoryContents = ({
  pages,
  blockData,
  handleClickNextBtn,
  handleClickPrevBtn,
  setCurrentPagesIndex,
  setCurrentBlockIndex
}: PlayStoryContentsProps) => {
  const wrapperRef = useRef<HTMLFormElement>(null);
  const wrapperRefHeight = wrapperRef.current?.clientHeight;
  const nextBtnHiddlenBlocks = ['Selection4BlockData', 'Selection2BlockData'];
  const fullScreenMapBlocks =
    [
      'ItemAddBlockData',
      'GPSBlockData',
      'ScoreBlockData',
      'FinishBlockData',
      'GotoBlockData',
      'InfoBlockData',
      'InfoCloseBlockData'
    ].indexOf(blockData.type) !== -1;
  const [checkBlockType, setCheckBlockType] = useState(fullScreenMapBlocks);
  const [nextButton, setNextButton] = useState(false);

  const getBlockTypeToComponents = () => {
    switch (blockData.type) {
      case 'TextBlockData':
        return (
          <TextBlock wrapperRefHeight={wrapperRefHeight} block={blockData} />
        );
      case 'PictureBlockData':
        return (
          <PictureBlock wrapperRefHeight={wrapperRefHeight} block={blockData} />
        );
      case 'Selection4BlockData':
      case 'Selection2BlockData':
        return (
          <SelectionBlock
            handleSelectBlockData={handleSelectBlockData}
            block={blockData}
            pages={pages}
          />
        );
      case 'ItemAddBlockData':
        return <ItemAddBlock block={blockData} />;
      case 'AvatarBlockData':
        return !window.isWebViewAccess ? (
          <SkipBlock />
        ) : (
          <AvatarBlock block={blockData} />
        );

      case 'ImagePatternBlockData':
        return !window.isWebViewAccess ? (
          <SkipBlock />
        ) : (
          <ImagePatternBlock block={blockData} />
        );
      default:
        return <></>;
    }
  };

  const handleSelectBlockData = (selectionResult: string) => {
    pages.forEach((page, index) => {
      if (page.pageName === selectionResult) {
        setCurrentPagesIndex(index);
        setCurrentBlockIndex(0);
      }
    });
  };

  useEffect(() => {
    setCheckBlockType(fullScreenMapBlocks);
  }, [fullScreenMapBlocks]);

  useEffect(() => {
    if (pages[0].blocks[0] !== blockData) {
      setNextButton(true);
    } else {
      setNextButton(false);
    }
  }, [blockData, pages]);

  useEffect(() => {
    if (blockData.type === 'ImagePatternBlockData') {
      // 간혹 여러개의 video tag가 쌓이는 경우가 있어서 querySelectorAll로 사용
      const webcamEl = document.querySelectorAll('video');

      for (let i = 0; i < webcamEl.length; i++) {
        webcamEl[i].remove();
      }
    }
  }, [blockData.type]);

  return (
    <Wrapper ref={wrapperRef}>
      <BlockContents>{getBlockTypeToComponents()}</BlockContents>
      <ButtonWrapper isActive={checkBlockType}>
        {nextButton && <PrevBtn handleClickPrevBtn={handleClickPrevBtn} />}
        {!nextBtnHiddlenBlocks.includes(blockData.type) && (
          <NextBtn
            blockData={blockData}
            handleClickNextBtn={handleClickNextBtn}
          />
        )}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default PlayStoryContents;

const Wrapper = styled(Stack)(() => ({
  justifyContent: 'space-between',
  position: 'relative',
  width: '100%',

  '& .css-nen11g-MuiStack-root': {
    height: '10rem',
    maxHeight: '10rem'
  }
}));

const ButtonWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive'
})<{ isActive: boolean }>(({ isActive }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
  width: '100%',
  margin: '0 auto',
  padding: '0 1rem',
  paddingBottom: '1rem',
  position: isActive ? 'absolute' : 'initial',
  bottom: isActive ? '0' : 'initial',
  left: isActive ? '50%' : 'initial',
  transform: isActive ? 'translateX(-50%)' : 'initial',

  '& button': {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height: '45px',
    padding: '0.4rem .625rem',
    color: '#ffffff',
    borderRadius: '10px',
    zIndex: 1
  }
}));

const BlockContents = styled(Stack)(() => ({}));
