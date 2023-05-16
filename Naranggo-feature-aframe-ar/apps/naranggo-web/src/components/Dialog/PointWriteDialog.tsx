import Header from '@/components/Header/Header';
import {
  Box,
  Dialog,
  Stack,
  CircularProgress,
  styled,
  Divider,
  Typography
} from '@mui/material';
import dynamic from 'next/dynamic';
import { Suspense, useRef, useState } from 'react';
import Image from 'next/image';
import EditorButtonGroup from '../ButtonGroup/EditorButtonGroup';
import { BaseModal } from '@naranggo/storybook';
import useExitWhileEdit from '@/hooks/useExitWhileEdit';
import { NextRouter, useRouter } from 'next/router';

const Editor = dynamic(() => import('@/components/Editor/NaranggoCKEditor'), {
  ssr: false,
  loading: () => (
    <EditorWrapper>
      <CircularProgress color="secondary" />
    </EditorWrapper>
  )
});

export type PointData = Pick<
  StoryPoint,
  'id' | 'PointName' | 'editorValue' | 'RepresentativeImagePath'
>;

export type ProcessedStoryPoint = StoryPoint & { isSubjectEditted: boolean };

interface PointWriteDialogProps {
  open: boolean;
  onClose: (pointData?: PointData) => void;
  onClosePointWrite: () => void;
  point?: ProcessedStoryPoint | null;
}

const PointWriteDialog = ({ open, onClose, onClosePointWrite, point }: PointWriteDialogProps) => {
  const router = useRouter();
  const [editorValue, setEditorValue] = useState(point?.editorValue || '');
  const [pointName, setPointName] = useState(point?.PointName.slice(0, 20));
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isSubjectEdittedAndNotsaved, setIsSubjectEdittedAndNotSaved] =
    useState(false);

  const pointNameRef = useRef<HTMLInputElement>(null);

  const handleCompleteStory = () => {
    if (!point) {
      alert('내용을 입력해주세요');
      return;
    }

    if (!pointName || (pointName && pointName.length === 0)) {
      setIsAlertModalOpen(true);
      return;
    }

    let representativeImagePath = '';

    if (document) {
      const imageTag = document
        .querySelector('.ck-content')
        ?.getElementsByTagName('img');
      if (imageTag) {
        const imageElem = imageTag[0] as HTMLImageElement;
        if (imageElem) {
          representativeImagePath = imageElem.src;
        }
      }
    }

    onClose({
      id: point?.id,
      RepresentativeImagePath: representativeImagePath,
      PointName: pointName,
      editorValue
    });
  };

  const handlePointNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 20) {
      return;
    }

    setPointName(e.target.value);
  };

  const handleClickPointSubject = () => {
    if (isNeedToClearSubject(point, isSubjectEdittedAndNotsaved)) {
      setPointName('');
      setIsSubjectEdittedAndNotSaved(true);
    }
  };

  const { isDirty, setModalInformation } = useExitWhileEdit(
    [pointName, editorValue],
    {
      modalType: 'EXIT_EDIT',
      runBeforeShowExitModal: () => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    }
  );

  // react가 아닌 toolbar를 hidden하기 위해 작성했습니다.
  if (!point) {
    return <></>;
  }

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={() => {
          onClose();
        }}
      >
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Header
            pageName="포인트 내용"
            options={{
              back: true,
              complete: true
            }}
            onClickBack={() => {
              if (isDirty && isStoryEdit(router)) {
                setModalInformation({ type: 'EXIT_EDIT', handleClickRightBtn: () => {
                  onClosePointWrite();
                }});
                return;
              }

              if (isDirty) {
                setModalInformation({ type: 'EXIT_NEW_WRITE', handleClickRightBtn: () => {
                  onClosePointWrite();
                }});
                return;
              }

              onClose();
            }}
            onClickComplete={handleCompleteStory}
          />
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'row', padding: '15px' }}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <StyledTextField
                  ref={pointNameRef}
                  placeholder="제목을 입력해 주세요.(최대 20자)"
                  value={pointName}
                  onBlur={(event) => {
                    setPointName(event.target.value.trim());
                  }}
                  onClick={handleClickPointSubject}
                  onChange={handlePointNameChange}
                />
              </Box>
              <Box
                sx={{
                  width: '90%',
                  marginTop: '0.6rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Image
                  src="/images/story_location.svg"
                  width="22px"
                  height="22px"
                  style={{
                    color: 'grey'
                  }}
                  alt="스토리 포인트 마커"
                />
                <Typography sx={{ color: 'gray' }}>
                  {point?.koAddress}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Stack>
            <StyledStack>
              <EditorButtonGroup />
            </StyledStack>
            <Suspense fallback={<CircularProgress />}>
              <Editor onChange={setEditorValue} value={editorValue} />
            </Suspense>
          </Stack>
        </Box>
      </Dialog>
      <BaseModal
        isModalOpen={isAlertModalOpen}
        rightBtnName="확인"
        onCloseModal={() => setIsAlertModalOpen(false)}
        onClickRightBtn={() => {
          setIsAlertModalOpen(false);
        }}
      >
        포인트의 제목을 입력해 주세요.
      </BaseModal>
    </>
  );
};

export default PointWriteDialog;

const EditorWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  height: '100%',
  width: '100%'
}));

const StyledTextField = styled('input')(() => ({
  border: 'none',
  fontSize: '1.15rem',
  width: '100%',
  outline: 'none',
  '&::placeholder': {
    color: '#b8b8b8'
  }
}));

const StyledStack = styled(Stack)(() => ({
  position: 'sticky',
  top: 0,
  width: '100%',
  height: '38px',
  background: '#fff',
  zIndex: 1
}));

const isNeedToClearSubject = (
  point: ProcessedStoryPoint | null | undefined,
  isSubjectEdittedAndNotsaved: boolean
) => point && !point.isSubjectEditted && !isSubjectEdittedAndNotsaved;

const isStoryEdit = (router: NextRouter) => router.asPath.includes('storyId');
