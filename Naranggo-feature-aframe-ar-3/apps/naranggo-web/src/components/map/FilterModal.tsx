import {
  Box,
  Button,
  IconButton,
  Stack,
  styled,
  Typography
} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import theme from '@/utils/theme';
import FilterList from './FilterList';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useState } from 'react';

interface FilterModalProps {
  isModalOpen: boolean;
  setIsModalClose: () => void;
  setIsModalOpen: () => void;
}

const STORY_MODE = [
  { text: '블로그 스토리', id: 0, checked: true },
  { text: '플레이 스토리', id: 1, checked: true }
];
const STORY_VIEW = [
  { text: '내 스토리 보기', id: 2, checked: true },
  { text: '팔로잉 유저 스토리 보기', id: 3, checked: true },
  { text: '타인의 스토리 보기', id: 4, checked: true },
  { text: '공식 스토리 보기', id: 5, checked: true },
  { text: '한국관광공사 스토리 보기', id: 6, checked: true }
];

const FilterModal = ({
  isModalOpen,
  setIsModalClose,
  setIsModalOpen
}: FilterModalProps) => {
  const [storyModeList, setStoryModeList] = useState<FilterItem[]>(STORY_MODE);
  const [storyViewList, setStoryViewList] = useState<FilterItem[]>(STORY_VIEW);

  const handleClickStorySetApply = () => {
    // todo: 체크된 항목 적용
    setIsModalClose();
  };

  return (
    <Wrapper
      anchor="top"
      open={isModalOpen}
      onClose={setIsModalClose}
      onOpen={setIsModalOpen}
      disableSwipeToOpen
    >
      <FilterWrapper>
        <AlignWrapper direction="row">
          <AlignWrapper>
            <FillterTitle>Filter By</FillterTitle>
          </AlignWrapper>
          <CloseBtn onClick={setIsModalClose}>
            <HighlightOffIcon fontSize="large" />
          </CloseBtn>
        </AlignWrapper>
        <FilterList
          title="스토리 모드 설정"
          filterList={storyModeList}
          setFilterList={setStoryModeList}
        />
        <FilterList
          title="스토리 보기 설정"
          filterList={storyViewList}
          setFilterList={setStoryViewList}
        />
      </FilterWrapper>
      <ApplyBtn onClick={handleClickStorySetApply}>
        <ApplyBtnText>Apply</ApplyBtnText>
      </ApplyBtn>
    </Wrapper>
  );
};

export default FilterModal;

const Wrapper = styled(SwipeableDrawer)(() => ({
  '& > .MuiDrawer-paperAnchorTop': { overflowY: 'visible' }
}));

const FilterWrapper = styled(Box)(() => ({
  padding: '1rem'
}));

const FillterTitle = styled(Typography)(() => ({
  color: theme.palette.custom.dark,
  fontWeight: 900,
  fontSize: '1rem'
}));

const CloseBtn = styled(IconButton)(() => ({
  padding: 0
}));

const ApplyBtn = styled(Button)(() => ({
  position: 'absolute',
  bottom: 0,
  left: '50%',
  right: '50%',
  transform: 'translate(-50%, 60%)',
  width: '90%',
  height: '3rem',
  backgroundColor: theme.palette.custom.yellow,
  '&:hover': {
    backgroundColor: theme.palette.custom.yellow
  }
}));

const ApplyBtnText = styled(Typography)(() => ({
  color: theme.palette.custom.dark,
  fontWeight: 600,
  fontSize: '1rem'
}));

/* 공통 스타일 */
const AlignWrapper = styled(Stack)(() => ({
  justifyContent: 'space-between',
  alignSelf: 'center',
  '& *': { color: theme.palette.custom.dark }
}));
