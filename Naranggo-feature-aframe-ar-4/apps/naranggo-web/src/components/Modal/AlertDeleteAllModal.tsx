import { BaseModal } from '@naranggo/storybook';
import { Stack, styled } from '@mui/material';
import { useAllDelAlert } from '../follow/queries';
import { useAtomValue } from 'jotai';
import loginProfileAtom from '@/atoms/loginProfileAtom';

interface BlockModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  alarmRefetching: () => void;
}

const AlertDeleteAllModal = ({
  isModalOpen,
  onCloseModal,
  alarmRefetching
}: BlockModalProps) => {
  const { accesstoken, iduser: loggedInUserId } =
    useAtomValue(loginProfileAtom);

  const { mutate: delAlert } = useAllDelAlert();

  const handleClickDeleteAllAlert = () => {
    onCloseModal();
    return delAlert(
      {
        accesstoken,
        accessId: loggedInUserId
      },
      {
        onSuccess: alarmRefetching
      }
    );
  };

  return (
    <BaseModal
      isModalOpen={isModalOpen}
      leftBtnName="취소"
      rightBtnName="삭제"
      onClickRightBtn={() => handleClickDeleteAllAlert()}
      onClickLeftBtn={onCloseModal}
      onCloseModal={onCloseModal}
    >
      <ModalText>전체 알림을 삭제하시겠습니까?</ModalText>
    </BaseModal>
  );
};

export default AlertDeleteAllModal;

const ModalText = styled(Stack)(() => ({
  width: '90%',
  margin: '0 auto'
}));
