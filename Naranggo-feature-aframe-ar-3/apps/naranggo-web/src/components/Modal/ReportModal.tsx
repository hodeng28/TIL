import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Stack,
  styled,
  Button,
  Modal,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Checkbox,
  FormControl,
  Divider
} from '@mui/material';
import { shouldNotForwardProp } from '@/utils/helpers';
import theme from '@/utils/theme';
import snackBarAtom from '@/atoms/snackBarAtom';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  useReportStory,
  useReportReply,
  useReportUser
} from '../report/queries';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import Image from 'next/image';
import { BaseModal } from '@naranggo/storybook';

enum ReportRadio {
  Default = -1, // default 선택 없음
  ChildAbuse = 1, // '아동 학대'
  SexualContent = 2, // '음란물 및 성적인 콘텐츠'
  Abuse = 3, // '욕설, 비방'
  DiscriminatoryExpression = 4, // '종교, 장애, 성별 등 차별적 표현'
  Violence = 5, // '폭력 및 테러'
  Harassment = 6, // '따돌림 및 괴롭힘'
  Spam = 7, // '스팸 또는 도배글'
  Other = 100 // '기타'
}

const radioList = [
  { label: '아동 학대', value: ReportRadio.ChildAbuse },
  { label: '음란물 및 성적인 콘텐츠', value: ReportRadio.SexualContent },
  { label: '욕설, 비방', value: ReportRadio.Abuse },
  {
    label: '종교, 장애, 성별 등 차별적 표현',
    value: ReportRadio.DiscriminatoryExpression
  },
  { label: '폭력 및 테러', value: ReportRadio.Violence },
  { label: '따돌림 및 괴롭힘', value: ReportRadio.Harassment },
  { label: '스팸 또는 도배글', value: ReportRadio.Spam },
  { label: '기타', value: ReportRadio.Other }
];

const limitMinimumTextLength = 11;

export type ReportModalType = 'Story' | 'User' | 'Reply';

interface ReportModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  onRefetch?: (id?: number) => void;
  setSelectMarkerId?: (id?: number) => void;
  type?: ReportModalType;
  storyOptions?: ReportParamOption;
  commentOptions?: ReportCommentParamOption;
  userOptions?: ReportParamOption;
}

export interface ReportParamOption {
  [key: string]: number | undefined;
}

export interface ReportCommentParamOption {
  iduser: number;
  idreply: string;
  idrereply: string;
}

const ReportModal = ({
  isModalOpen,
  onCloseModal,
  setSelectMarkerId,
  type,
  storyOptions,
  commentOptions,
  userOptions
}: ReportModalProps) => {
  const [radioValue, setRadioValue] = useState(ReportRadio.Default);
  const [inputText, setInputText] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isActiveReportBtn, setIsActiveReportBtn] = useState(false);
  const [isReportedModal, setIsReportedModal] = useState(false);
  const setIsReportedModalClose = () => setIsReportedModal(false);

  // todo: 로직 hook으로 분리예정
  const setSnackBar = useSetAtom(snackBarAtom);
  const { iduser: accessId, accesstoken } = useAtomValue(loginProfileAtom);

  const { mutate: reportStory } = useReportStory();
  const { mutate: reportReply } = useReportReply();
  const { mutate: reportUser } = useReportUser();

  const inputAreaRef = useRef<HTMLTextAreaElement>();
  const modalWrapperRef = useRef(null);

  const radioOther = radioValue === ReportRadio.Other;
  const radioNotSelected = radioValue === ReportRadio.Default;

  const openSnackbarIfNeeded = () => {
    if (radioValue === -1) {
      return setSnackBar({
        isSnackBarOpen: true,
        message: '신고하시는 이유를 선택해 주세요.',
        vertical: 'bottom'
      });
    }

    if (inputText.length < limitMinimumTextLength && radioOther) {
      return setSnackBar({
        isSnackBarOpen: true,
        message: '내용을 10자 이상 작성해 주세요.',
        vertical: 'bottom'
      });
    }
  };

  const showReportCompleteSnackbar = (res: { returnValue: number }) => {
    if (res.returnValue === 2) {
      return setIsReportedModal(true);
    }

    setSnackBar({
      isSnackBarOpen: true,
      message: '신고 접수가 완료되었습니다.',
      vertical: 'bottom'
    });

    setSelectMarkerId && setSelectMarkerId(storyOptions?.idblog);
  };

  const validateReportValues = useCallback(() => {
    if (radioNotSelected) {
      return false;
    }

    if (radioOther && inputText.length < limitMinimumTextLength) {
      return false;
    }

    return true;
  }, [inputText.length, radioNotSelected, radioOther]);

  const report = () => {
    switch (type) {
      case 'Story':
        if (!storyOptions?.idblog || !storyOptions?.iduser) {
          return;
        }
        reportStory(
          {
            idblog: storyOptions.idblog,
            iduser: storyOptions.iduser,
            accessId,
            accesstoken,
            iswithblock: isChecked ? 1 : 0,
            message: inputText,
            reporttype: radioValue
          },
          { onSuccess: showReportCompleteSnackbar }
        );
        break;
      case 'User':
        if (!userOptions?.iduser) {
          return;
        }
        reportUser(
          {
            iduser: userOptions.iduser,
            accessId,
            accesstoken,
            iswithblock: isChecked ? 1 : 0,
            message: inputText,
            reporttype: radioValue
          },
          { onSuccess: showReportCompleteSnackbar }
        );
        break;
      case 'Reply':
        if (!commentOptions?.iduser) {
          return;
        }
        reportReply(
          {
            idreply: commentOptions.idreply,
            iduser: commentOptions.iduser,
            idrereply: commentOptions.idrereply,
            accessId,
            accesstoken,
            iswithblock: isChecked ? 1 : 0,
            message: inputText,
            reporttype: radioValue
          },
          { onSuccess: showReportCompleteSnackbar }
        );
        break;

      default:
        break;
    }
  };

  const handleChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setRadioValue(Number(e.target.value));
  };

  const handleChangeTextArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleClickReportBtn = () => {
    openSnackbarIfNeeded();

    if (isActiveReportBtn) {
      onCloseModal();
      return report();
    }
  };

  useEffect(() => {
    setIsActiveReportBtn(validateReportValues());
  }, [validateReportValues]);

  useEffect(() => {
    if (!isModalOpen) {
      setRadioValue(ReportRadio.Default);
      setInputText('');
    }
  }, [isModalOpen]);

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={onCloseModal}
        sx={{ zIndex: 99999 }}
        onClick={(e) => e.stopPropagation()}
      >
        <ModalWrapper
          as="form"
          ref={modalWrapperRef}
          onSubmit={handleClickReportBtn}
        >
          <Title variant="h6" sx={{ textAlign: 'left' }}>
            신고하기
          </Title>
          <Typography sx={{ marginBottom: '0.5rem' }}>
            신고하시는 이유를 아래에서 선택해 주세요.
          </Typography>
          <Divider orientation="horizontal" flexItem />
          <FormControl>
            <RadioGroup
              defaultValue="기타"
              name="report-radio-group"
              value={radioValue}
              onChange={handleChangeRadio}
            >
              {radioList.map(({ label, value }) => (
                <FormControlLabel
                  key={value}
                  label={label}
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: '#aaa',
                        '&.Mui-checked': {
                          color: '#736dee'
                        }
                      }}
                    />
                  }
                  value={value}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <OtherTextField
            type="text"
            multiline
            minRows={3}
            maxRows={3}
            size="small"
            placeholder="구체적인 사유를 입력해주세요. (최대 200자)"
            inputProps={{
              maxLength: 200,
              minLength: 10,
              ref: inputAreaRef
            }}
            value={inputText}
            onChange={handleChangeTextArea}
            onFocus={() => setRadioValue(ReportRadio.Other)}
            sx={{
              paddingLeft: '1rem',
              '& textarea::placeholder': { fontSize: '0.875rem' },
              '& > div': { p: 1 }
            }}
          />
          <FormControlLabel
            sx={{ m: 0, pt: 2 }}
            labelPlacement="end"
            control={
              <Checkbox
                color="default"
                icon={
                  <Image
                    src="/images/terms_checkbox_off.png"
                    alt="checked"
                    layout="fixed"
                    width={25}
                    height={25}
                  />
                }
                checkedIcon={
                  <Image
                    src="/images/terms_checkbox_on.png"
                    alt="checked"
                    layout="fixed"
                    width={25}
                    height={25}
                  />
                }
                sx={{ p: 0, pr: 0.5, color: '#3122AE' }}
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
            }
            label="이 사용자 차단하기"
          />
          <Stack
            sx={{ pb: 3, pt: 1, pl: 3.5, '& > p': { fontSize: '0.75rem' } }}
          >
            <Typography>
              이 사용자의 모든 스토리와 댓글이 보이지 않게 되고,
            </Typography>
            <Typography>회원님의 스토리와 댓글을 볼 수 없게 돼요.</Typography>
          </Stack>
          <BtnWrapper>
            <ModalLeftBtn variant="contained" onClick={onCloseModal}>
              취소
            </ModalLeftBtn>
            <ModalRightBtn
              onClick={handleClickReportBtn}
              variant="contained"
              type="button"
              isActiveReportBtn={isActiveReportBtn}
            >
              신고
            </ModalRightBtn>
          </BtnWrapper>
        </ModalWrapper>
      </Modal>
      <BaseModal
        isModalOpen={isReportedModal}
        rightBtnName="확인"
        rightBtnColor="#8a8a8a"
        onCloseModal={setIsReportedModalClose}
        onClickRightBtn={setIsReportedModalClose}
      >
        {type === 'Story'
          ? '이미 신고한 스토리입니다.'
          : type === 'Reply'
          ? '이미 신고한 댓글입니다.'
          : '이미 신고한 사용자입니다.'}
      </BaseModal>
    </>
  );
};

export default ReportModal;

const ModalWrapper = styled('template')(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  padding: '0.875rem',
  paddingTop: '2rem',
  width: '90%',
  maxWidth: 'calc(470px - 3rem)',
  minWidth: 'calc(360px - 3rem)',
  backgroundColor: theme.palette.background.paper,
  borderRadius: '20px',
  border: 'none',

  '& span, & p': {
    fontSize: '0.875rem',
    fontWeight: 'bold'
  }
}));

const Title = styled(Typography)(() => ({
  textAlign: 'center',
  fontWeight: 'bold'
}));

const OtherTextField = styled(TextField)(() => ({
  '& > div': { borderRadius: '5px', backgroundColor: '#F4F4F4' },
  '& fieldset': { display: 'none' }
}));

const ModalLeftBtn = styled(Button)(() => ({
  width: '45%',
  color: '#736dee',
  border: '1px solid #736dee',
  borderRadius: '10px',
  boxShadow: 'none',

  '&:hover': {
    boxShadow: 'none'
  }
}));

const ModalRightBtn = styled(
  Button,
  shouldNotForwardProp('isActiveReportBtn')
)<{ isActiveReportBtn?: boolean }>(({ isActiveReportBtn }) => ({
  width: '45%',
  borderRadius: '10px',
  boxShadow: 'none',
  backgroundColor: isActiveReportBtn ? '#736dee' : '#f4f4f4',
  color: isActiveReportBtn ? '#fff' : '#7f7f7f',
  '&:hover': {
    backgroundColor: isActiveReportBtn
      ? '#736dee !important'
      : '#f4f4f4 !important',
    boxShadow: 'none'
  }
}));

const BtnWrapper = styled(Stack)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}));
