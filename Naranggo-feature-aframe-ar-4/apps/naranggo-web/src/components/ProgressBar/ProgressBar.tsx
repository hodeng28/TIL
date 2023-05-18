import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress';

interface ProgressBarProps {
  playStoryLength: number;
  currentPagesIndex: number;
}

const ProgressBars = ({
  playStoryLength,
  currentPagesIndex
}: ProgressBarProps) => {
  const progressBarGauge = (100 / playStoryLength) * currentPagesIndex;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <BorderLinearProgress variant="determinate" value={progressBarGauge} />
    </Box>
  );
};

export default ProgressBars;

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#000000' : '#000000'
  }
}));
