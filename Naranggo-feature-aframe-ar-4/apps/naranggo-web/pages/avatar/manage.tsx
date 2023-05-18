import React, { useState } from 'react';
// import FolderItem from '@/components/avatar/FolderItem';
import { IconButton, styled } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useRouter } from 'next/router';
import withAuth from '@/components/withAuth';
import { PAGES_URL } from '@/consts/constants';
import Header from '@/components/Header/Header';
import AvatarFolderCreateModal from '@/components/Modal/AvatarFolderCreateModal';

interface AvatarMangeProps {
  avatarList: Avatar[];
  avatarFolderList: AvatarFolder[];
}

const AvatarManage: NextPageWithLayout = ({
  avatarList,
  avatarFolderList
}: AvatarMangeProps) => {
  const [isAvatarFolderCreateModal, setIsAvatarFolderCreateModal] =
    useState(false);
  const handleCloseAvatarFolderCreateModal = () =>
    setIsAvatarFolderCreateModal(false);
  const router = useRouter();

  return (
    <>
      <Header
        pageName="아바타 관리"
        options={{ back: true, addAvatar: true }}
        onClickBack={() => {
          router.back();
        }}
        onClickAddAvatar={() => {
          setIsAvatarFolderCreateModal(true);
        }}
      />
      {/* <AvatarFolderList aria-labelledby="nested-list-subheader">
        {avatarFolderList.map(({ idavatarfolder, foldername }) => (
          <FolderItem
            key={idavatarfolder}
            idavatarfolder={idavatarfolder}
            foldername={foldername}
            avatarList={avatarList}
            avatarFolderList={avatarFolderList}
          />
        ))}
      </AvatarFolderList> */}
      <AvatarFolderCreateModal
        isModalOpen={isAvatarFolderCreateModal}
        onCloseModal={handleCloseAvatarFolderCreateModal}
        onClickLeftBtn={handleCloseAvatarFolderCreateModal}
        onClickRightBtn={() => {
          // todo : 아바타 폴더 생성 구현
        }}
      />
      <CreateAvatarBtn
        onClick={() => {
          router.push('/' + PAGES_URL.AVATAR_CREATE);
        }}
      >
        <StyledAddCircleOutlineIcon />
      </CreateAvatarBtn>
    </>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(
    'https://gist.githubusercontent.com/Ndream-KimYoungHoo/e8d840e394a3a173fdc66bcfaad864b3/raw/237e2796d1d0891b72188ea61abcf40342a49b35/gistfile1.json'
  );

  const { avatarList, avatarFolderList } = await res.json();

  return {
    props: {
      avatarList,
      avatarFolderList
    }
  };
};

export default withAuth(AvatarManage);

// const AddAvatarBtn = styled(Button)(({ theme }) => ({
//   minWidth: 'initial',
//   padding: '0',
//   color: theme.palette.custom.light,
//   fontWeight: 'bold',
//   fontSize: '1rem'
// }));

// const AddAvatar = styled(CreateNewFolderIcon)(() => ({}));

// const AvatarFolderList = styled(List)(() => ({
//   width: '100%',
//   bgcolor: 'background.paper',
//   padding: 0
// }));

const CreateAvatarBtn = styled(IconButton)(() => ({
  position: 'fixed',
  right: '5rem',
  bottom: '1rem'
}));

const StyledAddCircleOutlineIcon = styled(AddCircleOutlineIcon)(
  ({ theme }) => ({
    fontSize: '3rem',
    color: theme.palette.custom.blue
  })
);
