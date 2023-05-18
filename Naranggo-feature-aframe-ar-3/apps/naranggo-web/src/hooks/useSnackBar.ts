import { useState } from 'react';

const useSnackBar = () => {
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  };

  return { snackBarOpen, setSnackBarOpen, handleClose };
};

export default useSnackBar;
