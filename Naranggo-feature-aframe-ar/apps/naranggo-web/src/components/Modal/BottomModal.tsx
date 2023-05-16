import {
  IconButton,
  styled,
  Toolbar,
  Typography,
  SwipeableDrawer,
  Box,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAtom } from 'jotai';
import { shouldNotForwardProp } from '@/utils/helpers';
import RefreshIcon from '@mui/icons-material/Refresh';
import isBottomModalOpenAtom from '@/atoms/isBottomModalOpenAtom';
import { useRouter } from 'next/router';
import DisplayContainer from '@/components/login/DisplayContainer';

interface StoryFilterModalProps {
  minHeight?: string;
  children: React.ReactNode;
  title: string;
  contentsTitle?: string;
  period?: StoryDateFilter[];
  onClose?: () => void;
  onClickResetButtn?: () => void;
  onClickFilterApplyButton?: () => void;
  onClickFilterData?: (id: number) => void;
}

const BottomModal = ({
  children,
  title,
  contentsTitle,
  minHeight,
  period,
  onClose,
  onClickResetButtn,
  onClickFilterApplyButton,
  onClickFilterData
}: StoryFilterModalProps) => {
  const [isBottomModalOpen, setIsBottomModalOpen] = useAtom(
    isBottomModalOpenAtom
  );

  const router = useRouter();

  return (
    <StyledSwipeableDrawer
      anchor="bottom"
      minHeight={minHeight}
      open={isBottomModalOpen}
      onClose={() => {
        onClose && onClose();
        setIsBottomModalOpen(false);
      }}
      onOpen={() => {
        setIsBottomModalOpen(true);
      }}
      disableSwipeToOpen
    >
      <Toolbar>
        <HeaderTitle variant="h6">{title}</HeaderTitle>
        <StyledIconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="backr"
          onClick={() => {
            setIsBottomModalOpen(false);
          }}
        >
          <CloseIcon />
        </StyledIconButton>
      </Toolbar>
      <DisplayContainer>
        <FilterTitle>{contentsTitle}</FilterTitle>
        <Contents>{children}</Contents>
      </DisplayContainer>
      {router.pathname !== '/play/official' && (
        <>
          <FilterTitle>등록일</FilterTitle>
          <StyledButtonBox>
            {period &&
              period.map((filterList: StoryDateFilter) => {
                const { id, checked, text } = filterList;

                return (
                  <StyledButton
                    onClick={() => {
                      onClickFilterData && onClickFilterData(id);
                    }}
                    key={id}
                    value={id}
                    checked={checked}
                  >
                    {text}
                  </StyledButton>
                );
              })}
          </StyledButtonBox>
        </>
      )}

      <ButtonWrapper>
        <ResetButton onClick={onClickResetButtn}>
          <RefreshIcon />
          <Typography>초기화</Typography>
        </ResetButton>
        <ApplyButton onClick={onClickFilterApplyButton}>적용</ApplyButton>
      </ButtonWrapper>
    </StyledSwipeableDrawer>
  );
};

export default BottomModal;

export const StyledSwipeableDrawer = styled(
  SwipeableDrawer,
  shouldNotForwardProp('minHeight')
)<{ minHeight?: string }>(({ minHeight }) => ({
  zIndex: 9997,

  '& .MuiDrawer-paper': {
    minHeight: minHeight || '13rem',
    borderTopLeftRadius: '.75rem',
    borderTopRightRadius: '.75rem',
    padding: '0 1rem 1rem 1rem'
  },

  '& .MuiToolbar-root': {
    padding: 0,
    borderBottom: '1px solid #e6e6e6'
  }
}));

export const HeaderTitle = styled(Typography)(() => ({
  flexGrow: 1,
  fontWeight: 600,
  textAlign: 'center',
  position: 'absolute',
  left: '50%',
  transform: 'translate(-50%, 0)',
  borderTopLeftRadius: '.5rem',
  borderTopRightRadius: '.5rem',
  fontSize: '1.15rem'
}));

export const Contents = styled(Box)(() => ({
  flex: 1
}));

const FilterTitle = styled(Typography)(() => ({
  margin: '20px 0 8px',
  fontSize: '14px'
}));

export const StyledIconButton = styled(IconButton)(() => ({
  position: 'absolute',
  left: '0',
  display: 'flex',
  flexDirection: 'row'
}));

const StyledButtonBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: '26px',
  gap: '15px',
  borderBottom: '1px solid #e6e6e6'
}));

const StyledButton = styled(
  Button,
  shouldNotForwardProp('checked')
)<{ checked?: boolean }>(({ checked }) => ({
  flex: 1,
  padding: '6.5px 0',
  borderRadius: '10px !important',
  border: '1px solid #e9e9e9 !important',
  color: checked ? '#ffffff' : '#7f7f7f',
  backgroundColor: checked ? '#726de6' : '#e9e9e9',
  fontSize: '13px',
  lineHeight: '13px',

  '&:hover': {
    backgroundColor: checked ? '#726de6 !important' : '#e9e9e9 !important'
  }
}));

const ButtonWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px'
}));

const ApplyButton = styled(Button)(() => ({
  width: '70%',
  background: '#726de6',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#726de6 !important'
  }
}));

const ResetButton = styled(Button)(() => ({
  justifyContent: 'center',
  width: '26%',
  background: '#e9e9e9',
  color: '#666666',

  '& p': {
    paddingLeft: '4px',
    fontSize: '14px',
    lineHeight: '14px'
  },

  '& svg': {
    width: '14px',
    height: '14px'
  },

  '&:hover': {
    backgroundColor: '#e9e9e9 !important'
  }
}));
