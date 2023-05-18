import {
  SetStateAction,
  Dispatch,
  useEffect,
  RefObject,
  useState
} from 'react';
import { Stack, styled, IconButton } from '@mui/material';
import Search from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface SearchTextFieldProps {
  searchType?: string;
  searchKeyword?: string;
  searchInputData?: string;
  setSearchInputData: Dispatch<SetStateAction<string>>;
  handleClickSearch: () => void;
  handleSearchInputInit: () => void;
  handleClickKeydownSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  searchBoxRef: RefObject<HTMLInputElement>;
}

const SearchTextField = ({
  searchType,
  searchBoxRef,
  searchKeyword,
  searchInputData,
  setSearchInputData,
  handleClickSearch,
  handleClickKeydownSearch,
  handleSearchInputInit
}: SearchTextFieldProps) => {
  const [checkSpecialCharacters, setCheckSpecialCharacters] = useState(true);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchInputData(e.target.value);
  };

  useEffect(() => {
    if (searchKeyword && searchType === 'story') {
      setSearchInputData(searchKeyword);
    }

    if (searchKeyword && searchType === 'user') {
      setSearchInputData(`@${searchKeyword}`);
    }

    // searchBoxRef.current && searchBoxRef.current?.focus();
  }, [searchBoxRef, searchKeyword, searchType, setSearchInputData]);

  // todo: 다른방법으로 해야할듯. // JHY
  useEffect(() => {
    if (searchInputData?.includes('@')) {
      setCheckSpecialCharacters(false);
    } else {
      setCheckSpecialCharacters(true);
    }
  }, [searchInputData]);

  return (
    <SearchInputWrapper>
      <StyledInput
        type="text"
        placeholder="스토리 제목 또는 @닉네임 검색"
        value={searchInputData}
        ref={searchBoxRef}
        onChange={onChangeSearch}
        maxLength={checkSpecialCharacters ? 10 : 13}
        onKeyDown={handleClickKeydownSearch}
      />
      {searchInputData && (
        <IconButton
          key="close"
          size="large"
          edge="start"
          color="inherit"
          aria-label="back"
          onClick={handleSearchInputInit}
        >
          <StyledHighlightOffIcon />
        </IconButton>
      )}

      <IconButton
        key="search"
        size="large"
        edge="start"
        color="inherit"
        aria-label="back"
        onClick={handleClickSearch}
      >
        <Search />
      </IconButton>
    </SearchInputWrapper>
  );
};

export default SearchTextField;

const SearchInputWrapper = styled(Stack)({
  flexDirection: 'row',
  margin: '1rem 1rem 1.5rem',
  backgroundColor: '#f5f5f5',
  borderRadius: '.5rem'
});

const StyledInput = styled('input')(() => ({
  width: '100%',
  paddingLeft: '16px',
  border: 'none',
  backgroundColor: '#f5f5f5',
  zIndex: 9998,
  '&:focus': {
    outline: 'none'
  }
}));

const StyledHighlightOffIcon = styled(HighlightOffIcon)({
  width: '20px',
  height: '20px'
});
