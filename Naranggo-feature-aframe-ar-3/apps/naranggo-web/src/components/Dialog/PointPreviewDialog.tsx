import { reformatStoryPoints } from '@/utils/storyRead';
import { Dialog } from '@mui/material';
import StoryRead from '../story/read/StoryRead';

interface PointWriteDialogProps {
  open: boolean;
  pointList: StoryPoint[];
}

const PointPreviewDialog = ({
  open = false,
  pointList
}: PointWriteDialogProps) => {
  return (
    <Dialog fullScreen open={open}>
      <StoryRead storyPointsWithBlockKey={reformatStoryPoints(pointList)} />
    </Dialog>
  );
};

export default PointPreviewDialog;
