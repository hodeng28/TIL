import { styled, Stack } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ITEM_IMAGE } from '@/ItemImage';
import { useSetAtom } from 'jotai';
import snackBarAtom from '@/atoms/snackBarAtom';

interface ItemAddBlockProps {
  block: ItemAddBlockData;
}
const ItemAddBlock = ({ block }: ItemAddBlockProps) => {
  const itemBoxImage = '/images/gift7.gif';
  const [itemImageUrl, setiIemImageUrl] = useState(itemBoxImage);
  const { ImageIndex, ItemName } = block;
  const setSnackBar = useSetAtom(snackBarAtom);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ImageIndex === -1) {
        setiIemImageUrl(`/images/items/${ITEM_IMAGE[1].imgpath}.png`);
      } else {
        setiIemImageUrl(`/images/items/${ITEM_IMAGE[ImageIndex].imgpath}.png`);
      }
      setSnackBar({
        isSnackBarOpen: true,
        message: `${ItemName}아이템 을 획득했습니다.`,
        vertical: 'bottom'
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [ImageIndex, ItemName, setSnackBar]);

  return (
    <>
      <ImageWrapper>
        <Image
          src={itemImageUrl}
          alt={`${block.ItemName}이미지`}
          width={300}
          height={300}
        />
      </ImageWrapper>
    </>
  );
};

export default ItemAddBlock;

const ImageWrapper = styled(Stack)(() => ({
  position: 'fixed',
  top: 'calc(100vw - 3rem)',
  left: '50%',
  transform: 'translateX(-50%)',
  maxHeight: '350px'
}));
