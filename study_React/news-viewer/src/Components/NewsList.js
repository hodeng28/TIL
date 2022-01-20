import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NewsItem from './NewItem';
import axios from 'axios';

const NewsListBlock = styled.div`
  width: 768px;
  margin: 2rem auto 0;
  padding-bottom: 3rem;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const NewsList = ({ category }) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const query = category === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=142fdb72ad444ee5bd624cc959e9efa1`,
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [category]);

  if (loading) {
    return <NewsListBlock>대기 중.. 잠시만 기다려 주세요!</NewsListBlock>;
  }

  if (!articles) {
    return null;
  }
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
