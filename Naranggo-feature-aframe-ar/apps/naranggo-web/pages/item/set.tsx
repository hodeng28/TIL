import ItemSet from '@/components/item/ItemSet';
import { Stack, styled } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import withAuth from '@/components/withAuth';
import Header from '@/components/Header/Header';
import snackBarAtom from '@/atoms/snackBarAtom';
import { useSetAtom } from 'jotai';

const Set: NextPageWithLayout = () => {
  const router = useRouter();
  const { itemname, contents, imgpath } = router.query;
  const setSnackBar = useSetAtom(snackBarAtom);

  const [itemInputs, setItemInputs] = useState({
    itemname: itemname || '',
    contents: contents || '',
    imgpath: imgpath || ''
  });

  const [selectedIconPath, setSelectedIconImagePath] = useState(imgpath || '');

  const onChangeItemInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setItemInputs({
      ...itemInputs,
      [name]: value
    });
  };

  const handleClickSaveBtn = () => {
    setSnackBar({
      isSnackBarOpen: true,
      message: getMessage(selectedIconPath, itemInputs),
      vertical: 'bottom'
    });
  };

  return (
    <Wrapper>
      <Header
        pageName="아이템 제작"
        options={{ back: true, addItem: true }}
        onClickBack={() => {
          router.back();
        }}
        onClickAddItem={handleClickSaveBtn}
      />
      <ItemSet
        {...itemInputs}
        imgpath={selectedIconPath}
        onChangeItemInputValue={onChangeItemInputValue}
        setSelectedIconImagePath={setSelectedIconImagePath}
      />
    </Wrapper>
  );
};

export default withAuth(Set);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh'
}));

const getMessage = (
  selectedIconPath: string | string[],
  {
    itemname,
    contents
  }: { itemname: string | string[]; contents: string | string[] }
) => {
  if (selectedIconPath) {
    return '아이템 아이콘을 선택해주세요.';
  }

  if (itemname) {
    return '아이템 이름을 입력해주세요.';
  }

  if (contents) {
    return '아이템 설명을 입력해주세요.';
  }

  return '';
};
