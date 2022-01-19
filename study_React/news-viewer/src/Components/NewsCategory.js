import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const categories = [
  {
    name: 'all',
    text: '전체보기',
  },
  {
    name: 'business',
    text: '비즈니스',
  },
  {
    name: 'entertainment',
    text: '연예',
  },
  {
    name: 'health',
    text: '건강 의학',
  },
  {
    name: 'science',
    text: '과학',
  },
  {
    name: 'sports',
    text: '스포츠',
  },
  {
    name: 'technology',
    text: '기술',
  },
];

const CategoryBlock = styled.div`
  display: flex;
  width: 768px;
  margin: 0 auto;
  padding: 1rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Category = styled(NavLink)`
  padding-bottom: 0.25rem;
  font-size: 1.25rem;

  &:hover {
    color: #495057;
  }

  &.active {
    border-bottom: 2px solid #22b8cf;
    &:hover {
      color: #3bc9db;
    }
  }
  & + & {
    margin-left: 1rem;
  }
`;
const NewsCategory = () => {
  return (
    <CategoryBlock>
      {categories.map((e) => (
        <Category
          key={e.name}
          style={({ isActive }) => ({
            color: isActive ? '#22b8cf' : 'inherit',
          })}
          exact={e.name === 'all'}
          to={e.name === 'all' ? '/' : `/${e.name}`}
        >
          {e.text}
        </Category>
      ))}
    </CategoryBlock>
  );
};

export default NewsCategory;
