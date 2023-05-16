import { SelectChangeEvent, MenuItem } from '@mui/material';
import { useState, ChangeEvent } from 'react';
import { CombinationModal } from '@naranggo/storybook';

interface AvatarSaveModalProps {
  isModalOpen: boolean;
  avatarFolderList: AvatarFolder[];
  onCloseModal: () => void;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
}

const AvatarSaveModal = ({
  isModalOpen,
  avatarFolderList,
  onCloseModal,
  onClickLeftBtn,
  onClickRightBtn
}: AvatarSaveModalProps) => {
  const [avatarName, setAvatarName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');

  const handleChangeAvatarName = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setAvatarName(target.value);

  const handleChangeSelectOption = ({ target }: SelectChangeEvent<string>) =>
    setSelectedFolder(target.value);

  return (
    <CombinationModal
      isModalOpen={isModalOpen}
      leftBtnName="취소하기"
      rightBtnName="저장하기"
      modalTitle="아바타 이름과 폴더를 결정해주세요."
      inputValue={avatarName}
      inputLabel="아바타 이름"
      selectLabel="폴더 선택"
      selectValue={selectedFolder}
      onChangeSelectValue={handleChangeSelectOption}
      onChangeInputValue={handleChangeAvatarName}
      onClickLeftBtn={onClickLeftBtn}
      onClickRightBtn={onClickRightBtn}
      onCloseModal={onCloseModal}
    >
      {avatarFolderList.map(({ idavatarfolder, foldername }) => (
        <MenuItem key={idavatarfolder} value={foldername}>
          {foldername}
        </MenuItem>
      ))}
    </CombinationModal>
  );
};

export default AvatarSaveModal;
