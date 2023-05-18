import { styled, Stack, Typography, SxProps, Box } from '@mui/material';
import BottomSheetHeader from './BottomSheetHeader';
import theme from '@/utils/theme';
import { BottomSheetInfo } from '@/components/common/BottomSheet/useBottomSheet';
import { shouldNotForwardProp } from '@/utils/helpers';
import { PropsWithChildren, useEffect } from 'react';

interface BottomSheetProps {
  title?: string;
  rightbuttons?: string;
  bottomSheetInfo: BottomSheetInfo;
  bottomSheetSx?: SxProps;
  onLastContents?: () => void;
  rightbuttonsDisplay?: boolean;
}

const BottomSheet = ({
  title,
  rightbuttons,
  bottomSheetInfo,
  bottomSheetSx,
  onLastContents,
  rightbuttonsDisplay,
  children
}: PropsWithChildren<BottomSheetProps>) => {
  const {
    bottomSheetHeight,
    bottomSheetRef,
    contentRef,
    handleRef,
    initialTranslateY,
    onClickOpenSheet,
    setEditing
  } = bottomSheetInfo;

  // const [isLastContents, setIsLastContents] = useState(false);

  useEffect(() => {
    const onScroll = (ev: Event) => {
      if (contentRef.current?.offsetHeight !== undefined) {
        if (
          contentRef.current.scrollTop + 200 >=
          contentRef.current?.scrollHeight - contentRef.current?.clientHeight
        ) {
          onLastContents && onLastContents();
        }
      }
    };

    contentRef.current?.addEventListener('scroll', onScroll);
    return () => {
      contentRef.current?.removeEventListener('scroll', onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentRef, contentRef.current]);

  useEffect(() => {
    if (!rightbuttonsDisplay) {
      setEditing(false);
    }
  }, [rightbuttonsDisplay, onClickOpenSheet, setEditing]);

  if (!initialTranslateY || initialTranslateY < 0) {
    return <></>;
  }

  return (
    <Wrapper
      ref={bottomSheetRef}
      height={bottomSheetHeight}
      initialTranslateY={initialTranslateY}
    >
      <HeaderWrapper ref={handleRef}>
        <BottomSheetHeader />
        <Box>
          <Title variant="h6">{title}</Title>
          <RightBtn
            onClick={() => {
              onClickOpenSheet();
            }}
          >
            {rightbuttonsDisplay && rightbuttons}
          </RightBtn>
        </Box>
      </HeaderWrapper>
      <Contents ref={contentRef} sx={bottomSheetSx}>
        {children}
      </Contents>
    </Wrapper>
  );
};

export default BottomSheet;

const Wrapper = styled(
  Stack,
  shouldNotForwardProp('initialTranslateY')
)<{ initialTranslateY?: number }>(({ initialTranslateY }) => ({
  display: 'flex',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 300,
  margin: '0 auto',
  padding: '1rem 0.5rem 0',
  borderTopLeftRadius: '.5rem',
  borderTopRightRadius: '.5rem',
  backgroundColor: theme.palette.custom.light,
  boxShadow: '1px 2px 5px rgba(0, 0, 0, 0.25)',
  transition: 'transform 0.3s ease-out',
  transform: `translateY(${initialTranslateY}px)`
}));

const HeaderWrapper = styled(Stack)(() => ({
  marginBottom: '1.25rem'
}));

const Title = styled(Typography)(() => ({
  margin: '0 auto',
  fontWeight: 'bold'
}));

const RightBtn = styled(Box)(() => ({
  position: 'absolute',
  justifyContent: 'center',
  right: '1rem',
  color: '#736DEE'
}));

const Contents = styled(Stack)(() => ({
  overflow: 'auto',
  webkitOverflowScrolling: 'touch'
}));
