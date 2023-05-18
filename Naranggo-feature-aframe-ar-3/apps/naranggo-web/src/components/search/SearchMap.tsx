import { Stack, styled, IconButton } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Search from '@mui/icons-material/Search';
import MainMap from '../map/MainMap';
import SearchMarker from '../common/map/SearchMarker';
import useSearchMap from '@/hooks/useSearchMap';

const SearchMap = () => {
  const {
    searchBoxRef,
    searchData,
    centerCoordinate,
    searchResult,
    handleSearchInputChange,
    setCenterCoordinate
  } = useSearchMap();

  return (
    <Wrapper>
      <SearchInputWrapper>
        <IconButton
          aria-label="goback"
          onClick={() => {
            window.history.back();
          }}
        >
          <ArrowBack />
        </IconButton>
        <input
          ref={searchBoxRef}
          placeholder="장소를 입력해 주세요."
          value={searchData}
          onChange={handleSearchInputChange}
        />
        <IconButton>
          <Search />
        </IconButton>
      </SearchInputWrapper>
      <MainMap
        searchResultCoordinate={centerCoordinate}
        onChangeMap={({ center }) => {
          setCenterCoordinate({ lat: center[1], lng: center[0] });
        }}
      >
        {searchResult.map((place: google.maps.places.PlaceResult) => {
          const { place_id, geometry } = place;

          const location = geometry?.location;

          if (!location) {
            return <></>;
          }

          return (
            <SearchMarker
              key={place_id}
              lat={location.lat()}
              lng={location.lng()}
            />
          );
        })}
      </MainMap>
    </Wrapper>
  );
};

export default SearchMap;

const Wrapper = styled(Stack)({
  position: 'relative',
  width: '100%',
  height: '100%',
  '& input': {
    width: '100%',
    height: '3.5rem',
    padding: '0.5rem',
    fontSize: '1rem',
    border: 'none',
    zIndex: '999',
    '&:focus-visible': {
      outline: 'none'
    }
  }
});

const SearchInputWrapper = styled(Stack)({
  flexDirection: 'row',
  borderBottom: '1px solid rgba(0, 0, 0, 0.42)'
});
