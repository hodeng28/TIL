import { useRouter } from 'next/router';
import { styled, Container, Typography, Box } from '@mui/material';

interface OfficialStoryProps {
  title: string;
  pageUrl: string;
  isMore?: boolean;
  isFirst?: boolean;
  official?: PlayStoryItemData[];
  storyList?: StoryItem[];
  children?: React.ReactNode;
}

const SectionTitle = ({
  title,
  pageUrl,
  isMore,
  children
}: OfficialStoryProps) => {
  const router = useRouter();

  const handleClickRouteMove = () => {
    router.push(pageUrl);
  };

  return (
    <>
      <ListTitleContainer>
        <ListTitle>{title}</ListTitle>
        {isMore && (
          <ListMoreBtn onClick={handleClickRouteMove}>더보기</ListMoreBtn>
        )}
      </ListTitleContainer>
      {children}
    </>
  );
};

export default SectionTitle;

const ListTitleContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '1.5rem',
  color: theme.palette.custom.dark
}));

const ListMoreBtn = styled(Box)(({ theme }) => ({
  justifyContent: 'flex-end',
  padding: 0,
  color: theme.palette.custom.dark
}));

const ListTitle = styled(Typography)(() => ({
  fontSize: '1rem',
  fontWeight: 'bold'
}));
