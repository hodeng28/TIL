import useAlbumPermissionStatusChange from '@/hooks/useAlbumPermissionStatusChange';
import usePermission from '@/hooks/usePermission';
import { IconButton, Stack, styled } from '@mui/material';
import Image from 'next/image';

interface AvaterSetProps {
  profilepath: string;
  onChangeImgBtn?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickImgBtn?: () => void;
}

const AvatarSet = ({
  profilepath,
  onChangeImgBtn,
  onClickImgBtn
}: AvaterSetProps) => {
  const { targetPermissionStatus: ALBUM, checkIfPossibleToUseFeature } =
    usePermission('ALBUM');

  useAlbumPermissionStatusChange({ ALBUM });

  return (
    <Wrapper>
      <ProfileImgWrapper>
        <ProfileAvatarEdit>
          {profilepath && (
            <Image
              src={profilepath}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              alt="프로필 이미지"
            />
          )}
        </ProfileAvatarEdit>
        <Edit>
          <IconButton
            color="primary"
            aria-label="upload picture"
            sx={{ padding: 0 }}
            component="label"
            onClick={(event) => {
              if (!checkIfPossibleToUseFeature()) {
                event.preventDefault();
                return;
              }

              onClickImgBtn && onClickImgBtn();
            }}
          >
            <input
              hidden
              className="user-profile-image-set"
              accept="image/*"
              type="file"
              onChange={onChangeImgBtn}
            />
            <Image
              src="/images/camera.png"
              width={40}
              height={40}
              alt="프로필 이미지"
            />
          </IconButton>
        </Edit>
      </ProfileImgWrapper>
    </Wrapper>
  );
};

export default AvatarSet;

const Wrapper = styled(Stack)(() => ({
  position: 'relative',
  padding: '1rem'
}));

const ProfileImgWrapper = styled(Stack)(() => ({
  position: 'relative',
  justifyContent: 'space-around',
  width: '100px',
  height: '100px'
}));

const ProfileAvatarEdit = styled(Stack)(() => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  borderRadius: '50%',
  border: '3px solid #fff'
}));

const Edit = styled(Stack)(() => ({
  justifyContent: 'center',
  position: 'absolute',
  bottom: 0,
  right: 0,
  padding: '0.3rem',
  width: '40px',
  height: '40px',
  color: '#fff',
  borderRadius: '50%'
}));
