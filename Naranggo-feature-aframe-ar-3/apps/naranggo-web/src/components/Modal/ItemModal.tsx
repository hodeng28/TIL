import { BaseModal } from '@naranggo/storybook';
import { Stack, styled, Typography } from '@mui/material';

interface ItemModalProps {
  idproducerinventory?: number;
  itemname?: string;
  isModalOpen: boolean;
  onCloseModal: (idproducerinventory?: number) => void;
}

const ItemModal = ({
  idproducerinventory,
  itemname,
  isModalOpen,
  onCloseModal
}: ItemModalProps) => {
  const removeBlock = () => {
    onCloseModal(idproducerinventory);
  };

  return (
    <BaseModal
      isModalOpen={isModalOpen}
      leftBtnName="아이템 삭제"
      rightBtnName="취소"
      onClickLeftBtn={() => removeBlock()}
      onClickRightBtn={onCloseModal}
      onCloseModal={onCloseModal}
    >
      <ModalText>
        <ItemNameText>{itemname}</ItemNameText>
        을(를) 삭제하시겠습니까?
      </ModalText>
    </BaseModal>
  );
};

export default ItemModal;

const ModalText = styled(Stack)(() => ({
  width: '90%',
  margin: '0 auto'
}));

const ItemNameText = styled(Typography)(() => ({
  display: 'contents',
  fontWeight: 'bold'
}));
