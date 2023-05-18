import { useEffect, RefObject } from 'react';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { Box, Button, Stack, Typography } from '@mui/material';
import AlarmIcon from '@mui/icons-material/Alarm';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import useStoryContent from '@/hooks/useStoryContent';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { storyReadScrollPositionsAtom } from '@/atoms/isCurrentPageVisitedByBackspaceAtom';

interface StoryContentProps {
  summary?: string;
  scrollElementRef: RefObject<HTMLDivElement>;
  storyContentRef: RefObject<HTMLDivElement>;
  headerClientHeight: number;
  storyPointsWithBlockKey: StoryPointWithBlockKey[];
  estimatedtime?: number;
  onClickPlayStory: () => void;
}

const DetailContents = ({
  summary,
  scrollElementRef,
  storyContentRef,
  storyPointsWithBlockKey,
  estimatedtime,
  onClickPlayStory
}: StoryContentProps) => {
  const router = useRouter();
  const calcurateElementInformation = useStoryContent({
    storyContentRef,
    storyPointsWithBlockKey
  });

  const storyReadScrollPositions = useAtomValue(storyReadScrollPositionsAtom);

  const pathWithoutOrigin = router.asPath;
  const wrapperHeight = pathWithoutOrigin
    ? storyReadScrollPositions[pathWithoutOrigin]?.height
    : undefined;

  const getEstimatedTimeNumberToString = (estimatedtime?: number) => {
    switch (estimatedtime) {
      case 0:
        return '예상 소요시간 1시간 이내';
      case 1:
        return '예상 소요시간 1시간 이상';
      default:
        return '예상 소요시간 3시간 이상';
    }
  };

  const estimatedTimeNumberToString =
    getEstimatedTimeNumberToString(estimatedtime);

  useEffect(() => {
    calcurateElementInformation();
  }, [scrollElementRef, calcurateElementInformation]);

  return (
    <Wrapper ref={storyContentRef} height={wrapperHeight}>
      <Box>
        <StartButtonBox>
          <Typography sx={{ fontSize: '13px' }}>{summary}</Typography>
          <Text sx={{ fontSize: '12px', width: '85%', marginTop: '16px' }}>
            <AlarmIcon sx={{ fontSize: 'large', marginRight: '6px' }} />
            {estimatedTimeNumberToString}
          </Text>
          <StartButton variant="contained" onClick={onClickPlayStory}>
            시작하기
            <PlayArrowIcon />
          </StartButton>
          <Text sx={{ color: '#DA2828', fontSize: '12px' }}>
            <VolumeUpIcon sx={{ fontSize: 'large', marginRight: '6px' }} />
            음성 오디오가 출력될 수 있습니다. 볼륨을 확인해 주세요.
          </Text>
        </StartButtonBox>
        <Box>
          <Typography sx={{ padding: '18px 0 0 18px', fontWeight: 'bold' }}>
            전체 여정
          </Typography>
          <>
            {storyPointsWithBlockKey.map((playStoryitem, index: number) => {
              const { PointName, koAddress, Latitude } = playStoryitem;

              return (
                <AddressWrapper key={`${Latitude} + ${index}`}>
                  <MarkerIconWrapper className="story-point">
                    <Image
                      alt="마커 아이콘"
                      layout="fixed"
                      width="20px"
                      height="20px"
                      src="/images/story_point.svg"
                    />
                  </MarkerIconWrapper>
                  <Stack>
                    <PointNameText>{PointName}</PointNameText>
                    <Address>{koAddress}</Address>
                  </Stack>
                </AddressWrapper>
              );
            })}
          </>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default DetailContents;

const Wrapper = styled(Box)<{ height: number | undefined }>(({ height }) => ({
  height: height ? height : 'auto'
}));

const StartButtonBox = styled(Stack)(() => ({
  alignItems: 'center',
  padding: '20px',
  borderTop: '5px solid #e6e6e6',
  borderBottom: '10px solid #e6e6e6'
}));

const Text = styled(Typography)(() => ({
  display: 'flex'
}));

const StartButton = styled(Button)(() => ({
  width: '75%',
  height: '45px',
  margin: '16px 0 20px',
  background: '#726DE6',
  color: '#ffffff',
  borderRadius: '10px',

  '&:hover': {
    backgroundColor: '#736dee !important'
  }
}));

const AddressWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  padding: '20px 0 16px 18px',

  '&:not(:last-of-type)': {
    borderBottom: '5px solid #e6e6e6'
  }
}));

const MarkerIconWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flexStart',
  justifyContent: 'center',
  padding: '4px 10px 0 0'
}));

const PointNameText = styled(Typography)(() => ({}));

const Address = styled(Typography)(() => ({
  color: '#868686',
  fontSize: '12px'
}));
