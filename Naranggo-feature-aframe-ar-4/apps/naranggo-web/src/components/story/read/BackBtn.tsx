import { mainImageOpacityAtom } from '@/atoms/storyReadAtom';
import { shouldNotForwardProp } from '@/utils/helpers';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { IconButton, styled } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';

const BackBtn = () => {
  const mainImageOpacity = useAtomValue(mainImageOpacityAtom);

  const router = useRouter();

  return (
    <Wrapper onClick={() => router.back()}>
      <BackIcon mainImageOpacity={mainImageOpacity} />
    </Wrapper>
  );
};

export default BackBtn;

const Wrapper = styled(IconButton)(() => ({
  position: 'absolute',
  top: '6px',
  left: '6px'
}));

const BackIcon = styled(
  ArrowBack,
  shouldNotForwardProp('mainImageOpacity')
)<{ mainImageOpacity: number }>(({ mainImageOpacity }) => ({
  fontSize: '2rem',
  color: mainImageOpacity !== 0 ? 'white' : 'black'
}));
