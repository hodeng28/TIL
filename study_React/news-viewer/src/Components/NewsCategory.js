import styled, { css } from 'styled-components';

const cateogories = [
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

  @media screnn and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
  }
`;

const Cateogory = styled.div`
  padding-bottom: 0.25rem;
  font-size: 1.25rem;
  color: inherit;

  &:hover {
    color: #495057;
  }

  ${(props) =>
    props.active &&
    css`
      color: #22b8cf;
      border-bottom: 2px solid #22b8cf;
      &:hover {
        color: #3bc9db;
      }
    `}

  & + & {
    margin-left: 1rem;
  }
`;
const NewsCateogory = ({ onSelect, category }) => {
  return (
    <CategoryBlock>
      {cateogories.map((e) => (
        <Cateogory
          key={e.name}
          active={category === e.name}
          onClick={() => onSelect(e.name)}
        >
          {e.text}
        </Cateogory>
      ))}
    </CategoryBlock>
  );
};

export default NewsCateogory;
