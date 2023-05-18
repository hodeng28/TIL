import { Box, Divider, IconButton } from '@mui/material';
import Image from 'next/image';
import usePermission from '@/hooks/usePermission';
import useAlbumPermissionStatusChange from '@/hooks/useAlbumPermissionStatusChange';

const clickEvent = new MouseEvent('click', {
  'view': window,
  'bubbles': true,
  'cancelable': false
});

const EditorButtonGroup = () => {
  const { targetPermissionStatus: ALBUM, checkIfPossibleToUseFeature } =
    usePermission('ALBUM');

  useAlbumPermissionStatusChange({ ALBUM });

  const handleClickUploadImageButton = () => {
    // === 주석 지우기 금지 === image upload picker 사용시 주석 풀면 됨. by 최대욱
    // document
    //   .querySelectorAll(
    //     '.ck.ck-toolbar.ck-toolbar_grouping .ck.ck-toolbar__items div'
    //   )[1]
    //   .children[0].dispatchEvent(clickEvent);
    document
      .querySelector('.ck-file-dialog-button')
      ?.children[0].dispatchEvent(clickEvent);
  };

  return (
    <>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <IconButton
          onClick={checkIfPossibleToUseFeature(handleClickUploadImageButton)}
        >
          <Image
            src="/images/Button_photo.svg"
            width="22px"
            height="22px"
            style={{
              color: 'grey'
            }}
            alt="스토리 포인트 마커"
          />
        </IconButton>
        <IconButton
          onClick={() => {
            // down toolbar
            document
              .querySelectorAll(
                '.ck.ck-toolbar.ck-toolbar_grouping .ck.ck-toolbar__items div'
              )[0]
              .children[1].dispatchEvent(clickEvent);
          }}
        >
          <Image
            src="/images/edit_photo_down_off.svg"
            width="22px"
            height="22px"
            style={{
              color: 'grey'
            }}
            alt="스토리 포인트 마커"
          />
        </IconButton>
        <IconButton
          onClick={() => {
            // up toolbar
            document
              .querySelectorAll(
                '.ck.ck-toolbar.ck-toolbar_grouping .ck.ck-toolbar__items div'
              )[0]
              .children[0].dispatchEvent(clickEvent);
          }}
        >
          <Image
            src="/images/edit_photo_up_off.svg"
            width="22px"
            height="22px"
            style={{
              color: 'grey'
            }}
            alt="스토리 포인트 마커"
          />
        </IconButton>
      </Box>
      <Divider />
    </>
  );
};

export default EditorButtonGroup;
