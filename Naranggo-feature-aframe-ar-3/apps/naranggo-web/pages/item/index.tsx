import withAuth from '@/components/withAuth';
import ItemManagement from '@/components/item/ItemManagement';
import Header from '@/components/Header/Header';
import { Stack, styled } from '@mui/material';
import { useRouter } from 'next/router';

interface ItemProps {
  itemList: Item[];
}

const Item: NextPageWithLayout = ({ itemList }: ItemProps) => {
  const router = useRouter();

  return (
    <Wrapper>
      <Header
        pageName="아이템 관리"
        options={{ back: true, addItem: true }}
        onClickBack={() => {
          router.back();
        }}
        onClickAddItem={() => {
          router.push('item/set');
        }}
      />
      <ItemManagement itemList={itemList} />
    </Wrapper>
  );
};

export default withAuth(Item);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh'
}));

export const getServerSideProps = async () => {
  const res = await fetch(
    'https://gist.githubusercontent.com/Ndream-JeongHoYoung/2d8c291919e8b7be79124f8a51d657eb/raw/c019829c64f95fb226abdb8dc5c6ac0759248075/gistfile1.json'
  );

  const { ItemListData } = await res.json();

  return {
    props: { itemList: ItemListData }
  };
};
