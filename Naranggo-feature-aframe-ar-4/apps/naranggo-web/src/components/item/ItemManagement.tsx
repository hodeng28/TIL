import { Stack, Avatar, styled, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ItemModal from '../Modal/ItemModal';
import { useState } from 'react';
import theme from '@/utils/theme';
import { useRouter } from 'next/router';

interface ItemListProps {
  itemList: Item[];
}

const ItemManagement = ({ itemList }: ItemListProps) => {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemManagementList, setItemManagementList] = useState(itemList);
  const [selectedItem, setSelectedItem] = useState<Item>();

  const handleItemList = (item: Item) => {
    setIsModalOpen(true);
    setSelectedItem(item);
  };

  // 모달창 close, 차단해제
  const callRemoveItem = (idproducerinventory: number) => {
    setItemManagementList(
      itemManagementList.filter(
        (i) => i.idproducerinventory !== idproducerinventory
      )
    );
  };

  return (
    <>
      <Wrapper>
        {itemManagementList.map((item: Item) => {
          const { idproducerinventory, itemname, contents, imgpath } = item;
          return (
            <ItemWrapper key={idproducerinventory}>
              <ItemImageWrapper>
                <Avatar
                  src={`/images/items/${imgpath}.png`}
                  alt={`${itemname} 아이템 이미지`}
                />
              </ItemImageWrapper>
              <ItemContentWrapper>
                <ItemNameWrapper>
                  <ItemName>{itemname}</ItemName>
                  <IconWrapper>
                    <StyledEditIcon
                      color="disabled"
                      onClick={() => {
                        router.push(
                          `/item/set?idproducerinventory=${idproducerinventory}&itemname=${itemname}&contents=${contents}&imgpath=${imgpath}`
                        );
                      }}
                    />
                    <DeleteIcon
                      color="disabled"
                      onClick={() => handleItemList(item)}
                    />
                  </IconWrapper>
                </ItemNameWrapper>
                <ItemContents>{contents}</ItemContents>
              </ItemContentWrapper>
            </ItemWrapper>
          );
        })}
      </Wrapper>
      <ItemModal
        isModalOpen={isModalOpen}
        onCloseModal={(idproducerinventory) => {
          setIsModalOpen(false);
          if (idproducerinventory) {
            callRemoveItem(idproducerinventory);
          }
        }}
        idproducerinventory={selectedItem?.idproducerinventory}
        itemname={selectedItem?.itemname}
      />
    </>
  );
};
export default ItemManagement;

const Wrapper = styled(Stack)(() => ({
  padding: '.5rem',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none'
  }
}));

const ItemWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  padding: '.5rem',
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const ItemContentWrapper = styled(Stack)(() => ({
  width: '100%'
}));

const ItemNameWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between'
}));

const ItemName = styled(Stack)(() => ({
  width: '100%',
  fontWeight: 'bold',
  fontSize: '.9rem'
}));

const ItemImageWrapper = styled(Stack)(() => ({
  paddingRight: '.5rem'
}));

const IconWrapper = styled(Stack)(() => ({
  flexDirection: 'row'
}));

const ItemContents = styled(Typography)(() => ({
  paddingTop: '.25rem',
  fontSize: '.8rem'
}));

const StyledEditIcon = styled(EditIcon)(() => ({
  marginRight: '.5rem'
}));
