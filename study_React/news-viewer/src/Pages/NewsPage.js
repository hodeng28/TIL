import NewsCategory from '../Components/NewsCategory';
import NewsList from '../Components/NewsList';
import { useParams } from 'react-router-dom';

const NewsPage = () => {
  const { categoryName } = useParams();
  return (
    <>
      <NewsCategory />
      <NewsList category={categoryName || 'all'} />
    </>
  );
};

export default NewsPage;
