import snackBarAtom from '@/atoms/snackBarAtom';
import { Snackbar, styled } from '@mui/material';
import { useAtom } from 'jotai';

const SnackBarAlert = () => {
  const [{ isSnackBarOpen, message, vertical }, setSnackBar] =
    useAtom(snackBarAtom);

  return (
    <StyledSnackBar
      open={isSnackBarOpen}
      autoHideDuration={2000}
      message={message}
      onClose={() => {
        setSnackBar({ isSnackBarOpen: false, message: '', vertical: 'bottom' });
      }}
      anchorOrigin={{ vertical, horizontal: 'center' }}
    />
  );
};
export default SnackBarAlert;

const StyledSnackBar = styled(Snackbar)(() => ({
  '&.MuiSnackbar-anchorOriginTopCenter': {
    top: '30%'
  },

  '&.MuiSnackbar-anchorOriginBottomCenter': {
    bottom: '90px'
  },
  zIndex: 99999999
}));
