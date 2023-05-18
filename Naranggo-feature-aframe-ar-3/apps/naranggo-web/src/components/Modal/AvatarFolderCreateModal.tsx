import { useState, ChangeEvent } from 'react';
import { InputModal } from '@naranggo/storybook';

interface AvatarFolderCreateModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
}

const AvatarFolderCreateModal = ({
  isModalOpen,
  onCloseModal,
  onClickLeftBtn,
  onClickRightBtn
}: AvatarFolderCreateModalProps) => {
  const [folderName, setFolderName] = useState('');

  const handleInputFolderName = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setFolderName(target.value);

  return (
    <InputModal
      isModalOpen={isModalOpen}
      leftBtnName="취소하기"
      rightBtnName="생성하기"
      inputName="폴더 이름"
      inputValue={folderName}
      onChangeValue={handleInputFolderName}
      onClickLeftBtn={onClickLeftBtn}
      onClickRightBtn={onClickRightBtn}
      onCloseModal={onCloseModal}
    >
      생성할 폴더 이름을 적어주세요.
    </InputModal>
  );
};

export default AvatarFolderCreateModal;
