import MyStoryList from '@/components/List/MyStoryList';
import withAuth from '@/components/withAuth';
import { Stack, styled } from '@mui/material';
import Header from '@/components/Header/Header';
import { useRouter } from 'next/router';

const MyStory: NextPageWithLayout = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <Header
        pageName="내 스토리"
        options={{ back: true }}
        onClickBack={() => {
          router.back();
        }}
      />
      {/* <StoryCountText>전체 {storyList.length}개</StoryCountText> */}
      <MyStoryList />
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

// const StoryCountText = styled(ListSubheader)(() => ({
//   fontWeight: 'bold',
//   color: '#000',
//   padding: '0 .625rem'
// }));
