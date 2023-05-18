import {
  TextField,
  Stack,
  styled,
  Typography,
  Backdrop,
  CircularProgress,
  FormLabel,
  FormControl,
  IconButton
} from '@mui/material';
import withAuth from '@/components/withAuth';
import { useRouter } from 'next/router';
import Header from '@/components/Header/Header';
import ProfileAccountLink from '@/components/profile/ProfileAccountLink';
import { useEffect, useRef, useState } from 'react';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import { useAtom } from 'jotai';
import { getProfileImage } from '@/utils/image';
import {
  useGetProfile,
  useUploadProfileImage,
  useSetProfile
} from '@/queries/ProfileEditQueries';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import usePermission from '@/hooks/usePermission';
import useAlbumPermissionStatusChange from '@/hooks/useAlbumPermissionStatusChange';
import Image from 'next/image';
import modalInformationAtom from '@/atoms/modalInformationAtom';
import isHardwareBackButtonTriggeredAtom from '@/atoms/isHardwareBackButtonTriggeredAtom';

const schema = yup
  .object({
    nickname: yup
      .string()

      .min(2, '닉네임을 2자 이상 입력해주세요'),
    userinfo: yup.string(),
    profilepath: yup.string()
  })
  .required();

interface ProfileFormInput {
  nickname: string;
  userinfo: string;
  profilepath: string;
  backspace: boolean;
}
const ProfileEdit: NextPageWithLayout = () => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [loginProfile, setLoginProfile] = useAtom(loginProfileAtom);
  const [modalInformation, setModalInformation] = useAtom(modalInformationAtom);
  const currentTime = Date.now();

  const { mutate: uploadProfileImage, isLoading } = useUploadProfileImage();
  const { mutate: setProfile } = useSetProfile();

  const { targetPermissionStatus: ALBUM, checkIfPossibleToUseFeature } =
    usePermission('ALBUM');

  const [isErrorDuplicateCheck, setIsErrorDuplicateCheck] = useState(false);

  useAlbumPermissionStatusChange({ ALBUM });

  const {
    data,
    isLoading: getProfileLoading,
    isError,
    isIdle
  } = useGetProfile(
    {
      iduser: loginProfile.iduser,
      accessId: loginProfile.iduser,
      accesstoken: loginProfile.accesstoken,
      timeStamp: currentTime
    },
    {
      refetchOnWindowFocus: false,
      onSuccess: async (response) => {
        reset({
          nickname: response?.nickname || '',
          userinfo: response?.userinfo || '',
          profilepath: response?.profilepath || ''
        });
      },
      enabled: Boolean(loginProfile.iduser) && Boolean(loginProfile.accesstoken)
    }
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    getValues,
    setValue,
    reset
  } = useForm<ProfileFormInput>({
    resolver: yupResolver(schema),
    mode: 'onChange' || 'onSubmit',
    defaultValues: {
      nickname: data?.nickname || '',
      userinfo: data?.userinfo || '',
      profilepath: data?.profilepath || '',
      backspace: false
    }
  });

  const onClickSubmitButton = () => {
    formRef?.current?.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true })
    );
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      uploadProfileImage(
        {
          img: files[0],
          accesstoken: loginProfile.accesstoken,
          accessId: loginProfile.iduser
        },
        {
          onSuccess: (data) => {
            if (data.filename) {
              setValue('profilepath', data.filename);
            }
          },
          onError: (error) => {
            console.log(error);
          }
        }
      );
    }
  };

  const onSubmit: SubmitHandler<ProfileFormInput> = (formData) => {
    const { nickname, userinfo, profilepath } = formData;

    const profileCheck =
      loginProfile.profilepath !== profilepath &&
      loginProfile.profilepath !== null;

    if (isDirty || profileCheck) {
      setProfile(
        {
          accesstoken: loginProfile.accesstoken,
          accessId: loginProfile.iduser,
          nickname: nickname,
          userinfo: userinfo || '',
          profilepath: profilepath || ''
        },
        {
          onSuccess: (response) => {
            if (response.returnValue === -1) {
              return setIsErrorDuplicateCheck(true);
            }

            !isErrorDuplicateCheck && router.push('/mypage');

            setLoginProfile({
              ...loginProfile,
              nickname: nickname,
              userinfo: userinfo,
              profilepath: profilepath || ''
            });
          },
          onError: (error) => {
            console.log(error);
          }
        }
      );
    } else {
      router.push('/mypage');
    }
  };

  const [isHardwareBackButtonTriggered, setIsHardwareBackButtonTriggered] =
    useAtom(isHardwareBackButtonTriggeredAtom);

  useEffect(() => {
    const { profilepath } = getValues();

    const profileCheck =
      loginProfile.profilepath !== profilepath &&
      loginProfile.profilepath !== null;

    if (
      isHardwareBackButtonTriggered &&
      (isDirty || profileCheck) &&
      modalInformation?.type !== 'EXIT_EDIT'
    ) {
      setModalInformation({ type: 'EXIT_EDIT' });
      return;
    }

    if (
      isHardwareBackButtonTriggered &&
      !isDirty &&
      loginProfile.profilepath === profilepath
    ) {
      setIsHardwareBackButtonTriggered(false);

      router.back();
    }
  }, [
    getValues,
    isDirty,
    isHardwareBackButtonTriggered,
    loginProfile.profilepath,
    modalInformation,
    router,
    setIsHardwareBackButtonTriggered,
    setModalInformation
  ]);

  if (!data || getProfileLoading || isError || isIdle) {
    return <></>;
  }

  return (
    <Wrapper>
      <Header
        pageName="정보 수정"
        options={{ back: true, profileEdit: true }}
        onClickBack={() => {
          const { profilepath } = getValues();

          const profileCheck =
            loginProfile.profilepath !== profilepath &&
            loginProfile.profilepath !== null;

          if (isDirty || profileCheck) {
            setModalInformation({ type: 'EXIT_EDIT' });
            return;
          }

          router.back();
        }}
        isSubmitBtnActive={
          !(!!errors.nickname?.message || isErrorDuplicateCheck)
        }
        onClickProfileEdit={onClickSubmitButton}
      />
      <ProfileWrapper>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <Content>
            <ImageFormControl>
              <FormLabel id="profilepath"></FormLabel>
              <Controller
                name="profilepath"
                control={control}
                render={({ field }) => {
                  const { value, ...remainField } = field;

                  return (
                    <ImageWrapper>
                      <ProfileImage>
                        <Image
                          src={getProfileImage('profile', value || '')}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          alt="프로필 이미지"
                        />
                      </ProfileImage>
                      <ImageSetButton>
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          sx={{ padding: 0 }}
                          component="label"
                          htmlFor="camera-button-file"
                          onClick={(e) => {
                            if (!checkIfPossibleToUseFeature()) {
                              e.preventDefault();
                            }
                          }}
                        >
                          <Image
                            src="/images/camera.png"
                            width={40}
                            height={40}
                            alt="프로필 이미지"
                          />
                        </IconButton>
                        <input
                          hidden
                          id="camera-button-file"
                          type="file"
                          accept="image/*"
                          {...remainField}
                          onChange={handleChangeImg}
                        />
                      </ImageSetButton>
                    </ImageWrapper>
                  );
                }}
              />
            </ImageFormControl>
            <TextFormControl>
              <TextFormLabel id="nickname">닉네임</TextFormLabel>
              <Controller
                name="nickname"
                control={control}
                rules={{
                  maxLength: 20
                }}
                render={({ field }) => {
                  const { onChange, value } = field;
                  const { nickname } = getValues();
                  const { backspace } = watch();

                  return (
                    <>
                      <Input
                        id="text-field"
                        type="text"
                        variant="standard"
                        InputProps={{
                          disableUnderline: true
                        }}
                        {...field}
                        value={value.replace(/(\s*)/g, '')}
                        error={
                          !!errors.nickname?.message || isErrorDuplicateCheck
                        }
                        helperText={
                          (errors.nickname?.message &&
                            errors.nickname?.message) ||
                          (isErrorDuplicateCheck && '사용 중인 닉네임입니다.')
                        }
                        inputProps={{
                          minLength: 1,
                          maxLength: 12
                        }}
                        onChange={(e) => {
                          setIsErrorDuplicateCheck(false);

                          if (/\s/.exec(e.target.value)) {
                            e.target.value = e.target.value.replace(' ', '');
                          }

                          if (e.target.value.length > 12 && !backspace) {
                            e.target.value = e.target.value.slice(0, 12);
                            return;
                          }

                          onChange(e);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Backspace') {
                            return setValue('backspace', true);
                          }

                          setValue('backspace', false);
                        }}
                      />
                      <Typography sx={{ textAlign: 'right' }}>
                        {nickname?.length}/12
                      </Typography>
                    </>
                  );
                }}
              />
            </TextFormControl>
            <TextFormControl>
              <TextFormLabel id="userinfo">자기소개</TextFormLabel>
              <Controller
                name="userinfo"
                control={control}
                render={({ field }) => {
                  const { onChange } = field;
                  const { userinfo } = getValues();

                  return (
                    <>
                      <Input
                        type="text"
                        variant="standard"
                        {...field}
                        InputProps={{ disableUnderline: true }}
                        placeholder="자기소개를 입력해 주세요."
                        error={!!errors.userinfo?.message}
                        helperText={errors.userinfo?.message}
                        multiline
                        inputProps={{
                          minLength: 0,
                          maxLength: 50
                        }}
                        onChange={(e) => {
                          if (/\n/.exec(e.target.value)) {
                            return;
                          }

                          if (e.target.value.length > 50) {
                            e.target.value = e.target.value.slice(0, 50);
                            return;
                          }

                          onChange(e);
                        }}
                      />
                      <Typography sx={{ textAlign: 'right' }}>
                        {userinfo?.length}/50
                      </Typography>
                    </>
                  );
                }}
              />
            </TextFormControl>
          </Content>
        </form>
        <ProfileAccountLink />
      </ProfileWrapper>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Wrapper>
  );
};

export default withAuth(ProfileEdit);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh',

  '& p': {
    color: '#aaa'
  }
}));

const ProfileWrapper = styled(Stack)(() => ({
  height: '100%',
  overflowY: 'auto'
}));

const ImageFormControl = styled(FormControl)(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '30px 0',
  backgroundColor: '#ebebeb'
}));

const Content = styled(Stack)(() => ({
  height: '100%'
}));

const ImageWrapper = styled(Stack)(() => ({
  position: 'relative',
  justifyContent: 'space-around',
  width: '7rem',
  height: '7rem'
}));

const ProfileImage = styled(Stack)(() => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  borderRadius: '50%',
  border: '2px solid #fff'
}));

const ImageSetButton = styled(Stack)(() => ({
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

const TextFormControl = styled(FormControl)(() => ({
  padding: '2rem'
}));

const TextFormLabel = styled(FormLabel)(() => ({
  fontSize: '1rem',
  lineHeight: '20px',
  color: 'grey',
  marginBottom: '7px',
  '& .MuiFormLabel-root': {
    '&.Mui-focused': {
      color: 'black'
    }
  }
}));

const Input = styled(TextField)(({ error }) => ({
  marginLeft: '1rem',

  '&>div': {
    borderBottom: error ? '1px solid red' : '1px solid #aaa'
  }
}));
