import { Box, Stack, styled, IconButton } from '@mui/material';
import Search from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Header from '@/components/Header/Header';
import { shouldNotForwardProp } from '@/utils/helpers';

interface SearchTextFieldProps {
  searchPlaceholder?: string;
  searchData: string;
  onChangeSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;

  searchBoxRef: React.RefObject<HTMLInputElement>;
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchInputInit: () => void;
  isSearchBarOpen: boolean;
}

const StoryMapSearch = ({
  onClose,
  handleSearchInputChange,
  searchBoxRef,
  searchData,
  handleSearchInputInit,
  isSearchBarOpen
}: SearchTextFieldProps) => {
  return (
    <>
      <SearchWrapper isSearchBarOpen={isSearchBarOpen}>
        <Header
          pageName="장소 검색"
          options={{ close: true }}
          onClickClose={() => {
            history.go(-1);
          }}
        />
        <SearchInputWrapper>
          <IconButton>
            <Search />
          </IconButton>
          <StyledInput
            placeholder="장소 또는 주소 검색"
            value={searchData}
            ref={searchBoxRef}
            onChange={handleSearchInputChange}
          />
          <IconButton onClick={handleSearchInputInit}>
            <HighlightOffIcon />
          </IconButton>
        </SearchInputWrapper>
        {searchData.length === 0 && (
          <DefaultContents>검색어를 입력해 주세요.</DefaultContents>
        )}
      </SearchWrapper>
    </>
  );
};

export default StoryMapSearch;

const SearchWrapper = styled(
  Box,
  shouldNotForwardProp('isSearchBarOpen')
)<{ isSearchBarOpen: boolean }>(({ isSearchBarOpen }) => ({
  display: isSearchBarOpen ? 'block' : 'none',
  position: 'fixed',
  top: 0,
  width: '100%',
  height: '100%',
  margin: '0 auto',
  backgroundColor: '#fff',
  zIndex: 9999
}));

const SearchInputWrapper = styled(Stack)({
  flexDirection: 'row',
  margin: '1rem 1rem 0',
  backgroundColor: '#f5f5f5',
  borderRadius: '.5rem'
});

const StyledInput = styled('input')(() => ({
  width: '100%',
  border: 'none',
  backgroundColor: '#f5f5f5',
  zIndex: 9998,
  '&:focus': {
    outline: 'none'
  }
}));

const DefaultContents = styled(Stack)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, 0)',
  fontSize: '.875rem',
  color: '#868686'
}));
