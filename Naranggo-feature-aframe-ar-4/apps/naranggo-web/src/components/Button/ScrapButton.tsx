import { IconButton, Portal, Snackbar, styled } from '@mui/material';
import { useState } from 'react';
import Image from 'next/image';

interface ScrapButtonProps {
  isScrapped: 0 | 1;
  isPreviewPage: boolean;
  onClick?: () => void;
}

export const ScrapButton = ({
  isScrapped,
  isPreviewPage = false,
  onClick
}: ScrapButtonProps) => {
  const [isScrapSnackBarOpen, setIsScrapSnackBarOpen] = useState(false);
  const [isUnscrapSnackBarOpen, setIsUnscrapSnackBarOpen] = useState(false);

  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        onClick={() => {
          if (!isPreviewPage) {
            isScrapped && setIsUnscrapSnackBarOpen(true);
            !isScrapped && setIsScrapSnackBarOpen(true);
          }

          onClick && onClick();
        }}
      >
        {isScrapped ? (
          <Image
            src="/images/scrap_on.png"
            width="25px"
            height="25px"
            alt="scrapbutton"
          />
        ) : (
          <Image
            src="/images/scrap_off.png"
            width="25px"
            height="25px"
            alt="scrapbutton"
          />
        )}
      </IconButton>
      <Portal>
        <StyledSnackBar
          open={isScrapSnackBarOpen}
          autoHideDuration={2000}
          message={'스크랩 되었습니다'}
          onClose={() => setIsScrapSnackBarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
        <StyledSnackBar
          open={isUnscrapSnackBarOpen}
          autoHideDuration={2000}
          message={'스크랩 해제되었습니다'}
          onClose={() => setIsUnscrapSnackBarOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
      </Portal>
    </>
  );
};

const StyledSnackBar = styled(Snackbar)(() => ({
  position: 'fixed',
  '&.MuiSnackbar-anchorOriginTopCenter': {
    top: '30%'
  },

  '&.MuiSnackbar-anchorOriginBottomCenter': {
    bottom: '90px'
  },
  zIndex: 9999
}));
