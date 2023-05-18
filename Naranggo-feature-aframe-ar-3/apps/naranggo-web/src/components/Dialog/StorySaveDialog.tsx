/* eslint-disable @next/next/no-img-element */
import TwoOptionsModal from '@/components/common/Modal/TwoOptionsModal';
import {
  Stack,
  FormControl,
  FormLabel,
  Box,
  styled,
  Switch,
  Dialog,
  Backdrop,
  CircularProgress,
  Typography
} from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { ChangeEvent, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import StoryLoad from '@/pages/StoryLoad';
import {
  StoryWriteParam,
  useUploadRepresentativeStoryImage,
  useWritingStory
} from '@/components/story/queries';
import Header from '@/components/Header/Header';
import { useAtomValue, useSetAtom } from 'jotai';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CachedIcon from '@mui/icons-material/Cached';
import { useRouter } from 'next/router';
import { storyPreviewInformationAtom } from '@/atoms/storyWriteAtom';
import usePermission from '@/hooks/usePermission';
import useAlbumPermissionStatusChange from '@/hooks/useAlbumPermissionStatusChange';
import { BaseModal } from '@naranggo/storybook';
import createdStoryIdblogAtom from '@/atoms/createdStoryIdblogAtom';

const schema = yup.object({
  title: yup.string().required('스토리의 제목을 입력해 주세요.(필수)'),
  summary: yup.string(),
  publicsetting: yup.boolean().required(),
  representativeImage: yup.string()
});

interface StorySaveFormInput {
  title: string;
  representativeImage: string;
  summary: string;
  publicsetting: number;
}

interface PointSaveDialogProps {
  open: boolean;
  storyWriteData: StoryWriteParam;
  pointList: StoryPoint[];
}

const PointSaveDialog = ({
  open,
  storyWriteData,
  pointList
}: PointSaveDialogProps) => {
  // 스토리 이미지, 제목, 설명 공개여부가 default 일 수 있음. 수정시엔. 근데 일단 신경안써도될듯.
  const router = useRouter();
  const { storyId } = router.query;
  const loginProfile = useAtomValue(loginProfileAtom);
  const [uploadingImage, setUpLoadingImage] = useState(false);
  const { mutate: writeStory, isLoading } = useWritingStory();
  const { mutate: uploadImage } = useUploadRepresentativeStoryImage();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubjectInputAlertOpen, setIsSubjectInputAlertOpen] = useState(false);
  const [
    isRepresentativeImageInputAlertOpen,
    setIsRepresentativeImageInputAlertOpen
  ] = useState(false);

  const { targetPermissionStatus: ALBUM, checkIfPossibleToUseFeature } =
    usePermission('ALBUM');
  const setCreatedStoryIdblog = useSetAtom(createdStoryIdblogAtom);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch
  } = useForm<StorySaveFormInput>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: storyWriteData.title,
      representativeImage: storyWriteData.representative,
      summary: storyWriteData.summary,
      publicsetting: storyWriteData.publicsetting
    }
  });

  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);

  const onClickSubmitButton = () => {
    if (watch('title').length === 0) {
      setIsSubjectInputAlertOpen(true);
      return;
    }

    formRef?.current?.dispatchEvent(
      new Event('submit', { cancelable: true, bubbles: true })
    );
  };

  useAlbumPermissionStatusChange({ ALBUM });

  const onSubmit: SubmitHandler<StorySaveFormInput> = (formData) => {
    const { title, summary, publicsetting, representativeImage } = formData;

    requestWriteStory({
      title,
      summary,
      representativeImage,
      publicsetting
    });
  };

  const handleUploadImageClick = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setUpLoadingImage(true);
      uploadImage(
        {
          img: files[0],
          accesstoken: loginProfile.accesstoken,
          accessId: loginProfile.iduser
        },
        {
          onSuccess: (data) => {
            setUpLoadingImage(false);
            setValue('representativeImage', getURLPathToImage(data.filename));
          },
          onError: () => {
            setUpLoadingImage(false);
          }
        }
      );
    }
  };

  const requestWriteStory = (formData: StorySaveFormInput) => {
    const { title, summary, representativeImage, publicsetting } = formData;

    const contents = {
      intro: { 'blocks': [] },
      interactive: { 'pages': [] },
      storyPoints: [...pointList]
    };

    const repPoint = pointList[0];

    writeStory(
      {
        ...storyWriteData,
        title: title,
        representative: getImageFilename(representativeImage),
        summary: summary,
        publicsetting: publicsetting ? 1 : 0,
        lat: repPoint?.Latitude || 0,
        lng: repPoint?.Longitude || 0,
        pointcount: pointList.length,
        contents: JSON.stringify(contents),
        accesstoken: loginProfile.accesstoken,
        accessId: loginProfile.iduser
      },
      {
        onSuccess: (response) => {
          if (router.query.beforePage === 'storyRead') {
            setCreatedStoryIdblog(+response.data.idblog);
            history.go(-3);
            return;
          }

          setCreatedStoryIdblog(+response.data.idblog);
          history.go(-2);
        },
        onError: (error) => {
          console.log(error);
        }
      }
    );
  };

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={() => {
          router.back();
        }}
      >
        <Header
          pageName={storyId ? '스토리 수정' : '스토리 저장'}
          options={{ back: true, complete: true }}
          onClickBack={() => router.back()}
          onClickComplete={() => {
            onClickSubmitButton();
          }}
        />
        <ContentWrapper>
          <form
            ref={formRef}
            style={{ height: '100%' }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Content>
              <ImageFormControl>
                <FormLabel id="representativeImage"></FormLabel>
                <Controller
                  name="representativeImage"
                  control={control}
                  render={({ field }) => {
                    const { value, ...remainField } = field;

                    return (
                      <StyledImageBox>
                        <img
                          src={
                            value.length !== 0
                              ? value
                              : '/images/empty_photo_1.svg'
                          }
                          alt="대표 이미지"
                        />
                        <ImageChangeButtonWrapper></ImageChangeButtonWrapper>
                        <input
                          style={{
                            display: 'none'
                          }}
                          accept="image/*"
                          type="file"
                          id="contained-button-file"
                          {...remainField}
                          onChange={handleUploadImageClick}
                        />
                        <label
                          htmlFor="contained-button-file"
                          onClick={(event) => {
                            if (!checkIfPossibleToUseFeature()) {
                              event.preventDefault();
                            }
                          }}
                        >
                          <ImageChangeButton>
                            <CachedIcon />
                            <Typography sx={{ padding: '0 1rem' }}>
                              대표 이미지 변경
                            </Typography>
                          </ImageChangeButton>
                        </label>
                      </StyledImageBox>
                    );
                  }}
                />
              </ImageFormControl>
              <TextFormControl>
                <StyledFormLabel id="title">스토리 제목 (필수)</StyledFormLabel>
                <Controller
                  name="title"
                  control={control}
                  rules={{
                    maxLength: 20
                  }}
                  render={({ field }) => {
                    const { value, onChange, onBlur } = field;

                    return (
                      <>
                        <StyledTextField
                          id="text-field"
                          type="text"
                          variant="standard"
                          InputProps={{
                            disableUnderline: true
                          }}
                          {...field}
                          placeholder="스토리의 제목을 입력해 주세요.(필수)"
                          inputProps={{
                            minLength: '1',
                            maxLength: '20'
                          }}
                          onBlur={() => {
                            setValue('title', value.trim());
                            onBlur();
                          }}
                          onChange={(event) => {
                            if (event.target.value.length > 20) {
                              event.target.value = event.target.value.slice(
                                0,
                                20
                              );

                              return;
                            }

                            onChange(event);
                          }}
                        />
                        <Typography sx={{ textAlign: 'right' }}>
                          {value.length}/20
                        </Typography>
                      </>
                    );
                  }}
                />
              </TextFormControl>
              <TextFormControl>
                <StyledFormLabel id="summary">스토리 설명</StyledFormLabel>
                <Controller
                  name="summary"
                  control={control}
                  render={({ field }) => {
                    const { value, onChange } = field;

                    return (
                      <>
                        <StyledTextField
                          type="text"
                          variant="standard"
                          {...field}
                          InputProps={{ disableUnderline: true }}
                          placeholder="내용을 입력하세요."
                          error={!!errors.summary?.message}
                          helperText={errors.summary?.message}
                          inputProps={{
                            minLength: 0,
                            maxLength: 30
                          }}
                          onChange={(event) => {
                            if (event.target.value.length > 30) {
                              event.target.value = event.target.value.slice(
                                0,
                                30
                              );
                              return;
                            }

                            onChange(event);
                          }}
                        />
                        <Typography sx={{ textAlign: 'right' }}>
                          {value.length}/30
                        </Typography>
                      </>
                    );
                  }}
                />
              </TextFormControl>
              <SwitchFormControl>
                <StyledFormLabel id="publicsetting">공개 여부</StyledFormLabel>
                <Controller
                  name="publicsetting"
                  control={control}
                  render={({ field }) => {
                    return (
                      <StyledSwitch
                        {...field}
                        checked={!!field.value}
                        color="secondary"
                        disabled={!watch('representativeImage').length}
                      />
                    );
                  }}
                />
              </SwitchFormControl>
              {!watch('representativeImage').length && (
                <StyledErrorMessage>
                  대표 이미지가 없어 비공개 스토리로 저장됩니다.
                </StyledErrorMessage>
              )}
            </Content>
          </form>
        </ContentWrapper>
        <TwoOptionsModal
          widthPx="20rem"
          isModalOpen={isLoadModalOpen}
          onCloseModal={() => {
            setIsLoadModalOpen(false);
          }}
        >
          <StoryLoad />
        </TwoOptionsModal>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading || uploadingImage}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Dialog>
      <BaseModal
        isModalOpen={isSubjectInputAlertOpen}
        rightBtnName="확인"
        onCloseModal={() => setIsSubjectInputAlertOpen(false)}
        onClickRightBtn={() => {
          setIsSubjectInputAlertOpen(false);
        }}
      >
        스토리의 제목을 입력해 주세요.
      </BaseModal>
      <BaseModal
        isModalOpen={isRepresentativeImageInputAlertOpen}
        rightBtnName="확인"
        onCloseModal={() => setIsRepresentativeImageInputAlertOpen(false)}
        onClickRightBtn={() => {
          setIsRepresentativeImageInputAlertOpen(false);
        }}
      >
        대표 이미지를 등록해 주세요.
      </BaseModal>
    </>
  );
};

export default PointSaveDialog;

const ContentWrapper = styled(Stack)(() => ({
  height: '100%',
  padding: '0 1.2rem'
}));

const Content = styled(Stack)(() => ({
  height: '100%'
}));

const ImageFormControl = styled(FormControl)(() => ({
  height: '225px',
  padding: '16px 0 16px 0',

  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}));

const StyledImageBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  position: 'relative',
  height: '100%',
  borderRadius: '1rem',
  overflow: 'hidden'
}));

const ImageChangeButtonWrapper = styled('div')(() => ({
  position: 'absolute',
  bottom: 0,
  height: '35%',
  width: '100%',
  backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.6) 65.94%)`
}));

const TextFormControl = styled(FormControl)(() => ({
  padding: '16px'
}));

const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
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

const StyledTextField = styled(TextField)(({ error }) => ({
  height: '40px',
  borderBottom: error ? '1px solid red' : '1px solid black',
  '& .MuiInputBase-root': {
    '& > *': {
      paddingTop: '8px'
    }
  }
}));

const SwitchFormControl = styled(FormControl)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px'
}));

const StyledSwitch = styled(Switch)(() => ({
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#736dee'
      }
    }
  }
}));

const ImageChangeButton = styled(Stack)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
  position: 'absolute',
  left: '50%',
  bottom: '5%',
  transform: 'translateX(-50%)',
  height: '47px',
  background: '#fff',
  borderRadius: '40px',
  width: '60%',
  cursor: 'pointer',

  '& .MuiTypography-root': {
    fontSize: '14px',
    marginLeft: '6px'
  },

  '&:hover': {
    backgroundColor: '#fff !important'
  }
}));

const StyledErrorMessage = styled('strong')(() => ({
  color: '#f2284f',
  textAlign: 'right',
  fontWeight: 'normal',
  fontSize: '0.75rem'
}));

export const getURLPathToImage = (filename: string) =>
  filename.length
    ? `https://resources-cf.naranggo.com/thumbnails50/${filename}`
    : '';

export const getImageFilename = (representative: string) =>
  representative.length
    ? representative.replace(
        'https://resources-cf.naranggo.com/thumbnails50/',
        ''
      )
    : '';
