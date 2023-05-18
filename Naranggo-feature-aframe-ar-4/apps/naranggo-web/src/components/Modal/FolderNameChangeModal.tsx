import { ChangeEvent, useState } from 'react';
import { InputModal } from '@naranggo/storybook';

interface FolderNameChangeModalProps {
  isModalOpen: boolean;
  oldFolderName: string;
  onCloseModal: () => void;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
}

const FolderNameChangeModal = ({
  isModalOpen,
  oldFolderName,
  onCloseModal,
  onClickLeftBtn,
  onClickRightBtn
}: FolderNameChangeModalProps) => {
  const [newFolderName, setNewFolderName] = useState(oldFolderName);

  const handleChangeFolderName = (event: ChangeEvent<HTMLInputElement>) =>
    setNewFolderName(event.target.value);

  return (
    <InputModal
      isModalOpen={isModalOpen}
      leftBtnName="취소하기"
      rightBtnName="수정하기"
      inputName="폴더 이름"
      inputValue={newFolderName}
      onChangeValue={handleChangeFolderName}
      onClickLeftBtn={onClickLeftBtn}
      onClickRightBtn={onClickRightBtn}
      onCloseModal={onCloseModal}
    >
      폴더 이름을 적어주세요
    </InputModal>
  );
};

export default FolderNameChangeModal;
