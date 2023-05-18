import useGlobalModal from '@/hooks/useGlobalModal';
import { BaseModal } from '@naranggo/storybook';

const GlobalModal = () => {
  const {
    isModalOpen,
    leftBtnName,
    rightBtnName,
    TextComponent,
    handleClickLeftBtn,
    handleClickRightBtn
  } = useGlobalModal();

  return (
    <BaseModal
      isModalOpen={isModalOpen}
      leftBtnName={leftBtnName}
      rightBtnName={rightBtnName}
      onClickLeftBtn={handleClickLeftBtn}
      onClickRightBtn={handleClickRightBtn}
      onCloseModal={handleClickLeftBtn}
    >
      {TextComponent}
    </BaseModal>
  );
};

export default GlobalModal;
