import React, { useState } from 'react';
import Header from '@/components/Header/Header';
import { useRouter } from 'next/router';
import AvatarSaveModal from '@/components/Modal/AvatarSaveModal';

interface AvatarCreateProps {
  avatarFolderList: AvatarFolder[];
}

const AvatarCreate: NextPageWithLayout = ({
  avatarFolderList
}: AvatarCreateProps) => {
  const router = useRouter();
  const [isAvatarSaveModalShown, setIsAvatarSaveModalShown] = useState(false);
  const handleCloseAvatarSaveModal = () => setIsAvatarSaveModalShown(false);

  return (
    <>
      <Header
        pageName="아바타 생성"
        options={{ back: true, save: true }}
        onClickBack={() => {
          router.back();
        }}
        onClickSave={() => {
          setIsAvatarSaveModalShown(true);
        }}
      />
      <AvatarSaveModal
        isModalOpen={isAvatarSaveModalShown}
        avatarFolderList={avatarFolderList}
        onCloseModal={handleCloseAvatarSaveModal}
        onClickLeftBtn={handleCloseAvatarSaveModal}
        onClickRightBtn={() => {
          // todo : 저장하기 기능 구현
        }}
      />
    </>
  );
};

export default AvatarCreate;

export const getStaticProps = async () => {
  const res = await fetch(
    'https://gist.githubusercontent.com/Ndream-KimYoungHoo/e8d840e394a3a173fdc66bcfaad864b3/raw/237e2796d1d0891b72188ea61abcf40342a49b35/gistfile1.json'
  );

  const { avatarFolderList } = await res.json();

  return {
    props: {
      avatarFolderList
    }
  };
};
