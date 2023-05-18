import { IconButton } from '@mui/material';
import Image from 'next/image';
import { sendMessageToDevice } from '@/utils/helpers';
import { WEBVIEW_MESSAGE_TYPE } from '@naranggo/shared';
import snackBarAtom from '@/atoms/snackBarAtom';
import { useSetAtom } from 'jotai';

export const LinkShareButton = () => {
  const setSnackBar = useSetAtom(snackBarAtom);

  const handleClickLinkShareButton = () => {
    if (!window.isWebViewAccess) {
      navigator.clipboard.writeText(location.href);

      setSnackBar({
        isSnackBarOpen: true,
        message: `링크가 복사되었습니다.`,
        vertical: 'bottom'
      });
      return;
    }

    sendMessageToDevice(WEBVIEW_MESSAGE_TYPE.COPY_URL, location.href);

    if (!(window.platform === 'android' && +window.platformVersion >= 33)) {
      setSnackBar({
        isSnackBarOpen: true,
        message: `링크가 복사되었습니다.`,
        vertical: 'bottom'
      });
    }
  };

  return (
    <>
      <IconButton
        size="large"
        color="inherit"
        onClick={handleClickLinkShareButton}
      >
        <Image
          src="/images/share.png"
          width="22px"
          height="22px"
          alt="sharebutton"
        />
      </IconButton>
    </>
  );
};
