import theme from '@/utils/theme';
import { Box, Button, Stack, styled, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';

// 최근 검색어 임시
const ReactSearchData = [
  { text: 'React', date: '08.16' },
  { text: 'JavaScript', date: '08.13' },
  { text: 'TypeScript', date: '08.01' },
  { text: 'Mui', date: '07.21' },
  { text: '나랑고', date: '07.13' }
];

const RecentSearch = () => {
  const [recentSearchData, setRecentSearchData] = useState(ReactSearchData);

  const handleClickSearchResultDelete = (text: string) => {
    setRecentSearchData(recentSearchData.filter((item) => item.text !== text));
  };

  const handleClickWholeSearchResultDelete = () => {
    setRecentSearchData([]);
  };

  return (
    <Wrapper>
      {recentSearchData.length > 0 ? (
        <DeleteBtnWrapper>
          <Heading>최근 검색어</Heading>
          <WholeDeleteBtn onClick={handleClickWholeSearchResultDelete}>
            전체삭제
          </WholeDeleteBtn>
        </DeleteBtnWrapper>
      ) : null}

      {recentSearchData.map(({ text, date }) => (
        <RecentSearchResult key={date}>
          <RecentSearchDataWapper>
            <SearchIconWrapper>
              <StyledSearchIcon />
            </SearchIconWrapper>
            <SearchTitle>{text}</SearchTitle>
          </RecentSearchDataWapper>
          <RecentSearchDataWapper>
            <SearchDate>{date}</SearchDate>
            <StyledDeleteBtn
              onClick={() => handleClickSearchResultDelete(text)}
            >
              <StyledDeleteIcon />
            </StyledDeleteBtn>
          </RecentSearchDataWapper>
        </RecentSearchResult>
      ))}
    </Wrapper>
  );
};

export default RecentSearch;

const Wrapper = styled(Box)(() => ({
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  padding: '.625rem'
}));

const DeleteBtnWrapper = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '.625rem'
}));

const Heading = styled(Typography)(() => ({
  fontWeight: 600,
  color: theme.palette.custom.grey4,
  lineHeight: '2.25rem'
}));

const WholeDeleteBtn = styled(Button)(() => ({
  color: theme.palette.custom.grey4
}));

const RecentSearchResult = styled(Stack)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '.5rem',
  paddingBottom: '.5rem',
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const RecentSearchDataWapper = styled(Stack)(() => ({
  flexDirection: 'row'
}));

const SearchTitle = styled(Stack)(() => ({
  margin: 'auto .5rem',
  fontWeight: '600'
}));

const SearchDate = styled(Typography)(() => ({
  margin: 'auto .5rem',
  color: theme.palette.custom.grey3
}));

const SearchIconWrapper = styled(Stack)(() => ({
  padding: '.25rem',
  background: theme.palette.custom.grey200,
  borderRadius: '50%'
}));

const StyledSearchIcon = styled(SearchIcon)(() => ({
  margin: 'auto 0',
  color: theme.palette.custom.light
}));

const StyledDeleteBtn = styled(Button)(() => ({
  minWidth: 'initial'
}));

const StyledDeleteIcon = styled(ClearIcon)(() => ({
  margin: 'auto 0',
  color: theme.palette.custom.grey3
}));
