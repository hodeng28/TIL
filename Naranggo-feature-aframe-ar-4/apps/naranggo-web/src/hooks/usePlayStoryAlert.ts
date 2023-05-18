import { useEffect, useState } from 'react';
import useSnackBar from '@/hooks/useSnackBar';

const usePlayStoryAlert = (blockData: PagesBlock) => {
  const { snackBarOpen, setSnackBarOpen } = useSnackBar();
  const [centerAlert, setCenterAlert] = useState('');
  const [topAlert, setTopAlert] = useState('');

  useEffect(() => {
    const type = blockData.type;
    setSnackBarOpen(false);

    if (type === 'GPSBlockData') {
      setCenterAlert(`'${blockData.pointName}'(으)로 \n이동하세요.`);
      setSnackBarOpen(true);

      return;
    }

    if (type === 'InfoBlockData') {
      setTopAlert(blockData.text);
      setSnackBarOpen(true);

      return;
    }

    if (type === 'InfoCloseBlockData') {
      setSnackBarOpen(false);

      return;
    }

    if (type === 'ScoreBlockData') {
      setCenterAlert(`${blockData.score.toString()} 점 획득`);
      setSnackBarOpen(true);

      return;
    }
  }, [blockData, setSnackBarOpen]);

  return {
    centerAlert,
    topAlert,
    snackBarOpen
  };
};

export default usePlayStoryAlert;
