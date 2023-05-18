import MyStoryList from '@/components/List/MyStoryList';
import withAuth from '@/components/withAuth';
import { Stack, styled } from '@mui/material';
import Header from '@/components/Header/Header';
import { useRouter } from 'next/router';
import { useRef } from 'react';
const MyStory: NextPageWithLayout = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  return (
    <Wrapper>
      <Header
        pageName="내 스토리"
        options={{ back: true }}
        onClickBack={() => {
          router.back();
        }}
        onClickTitle={() => listRef.current?.scrollTo(0, 0)}
      />
      <MyStoryList listRef={listRef} />
    </Wrapper>
  );
};

export default withAuth(MyStory);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  height: '100vh',

  '& .css-1eblgbs-MuiContainer-root': {
    padding: 0
  }
}));
