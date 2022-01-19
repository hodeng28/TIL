import NewsCategory from '../Components/NewsCategory';
import NewsList from '../Components/NewsList';
import { useParams } from 'react-router-dom';

const NewsPage = () => {
  const { category } = useParams();
  return (
    <>
      <NewsCategory />
      <NewsList category={category} />
    </>
  );
};

export default NewsPage;
