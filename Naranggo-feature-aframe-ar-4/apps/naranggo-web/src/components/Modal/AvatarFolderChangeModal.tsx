import { MenuItem, SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import { SelectModal } from '@naranggo/storybook';

interface AvatarFolderChangeProps {
  isModalOpen: boolean;
  currentFolder: string;
  avatarFolderList: AvatarFolder[];
  onCloseModal: () => void;
  onClickLeftBtn: () => void;
  onClickRightBtn: () => void;
}

const AvatarFolderChangeModal = ({
  isModalOpen,
  currentFolder,
  avatarFolderList,
  onCloseModal,
  onClickRightBtn
}: AvatarFolderChangeProps) => {
  const [selectedFolder, setSelectedFolder] = useState(currentFolder);

  const handleChangeSelectOption = ({ target }: SelectChangeEvent<string>) =>
    setSelectedFolder(target.value);

  return (
    <SelectModal
      isModalOpen={isModalOpen}
      leftBtnName="취소하기"
      rightBtnName="생성하기"
      selectLabel="폴더 이름"
      modalTitle="옮겨갈 폴더를 선택해주세요."
      selectValue={selectedFolder}
      onChangeValue={handleChangeSelectOption}
      onClickLeftBtn={onCloseModal}
      onClickRightBtn={onClickRightBtn}
      onCloseModal={onCloseModal}
    >
      {avatarFolderList.map(({ idavatarfolder, foldername }) => (
        <MenuItem key={idavatarfolder} value={foldername}>
          {foldername}
        </MenuItem>
      ))}
    </SelectModal>
  );
};

export default AvatarFolderChangeModal;
