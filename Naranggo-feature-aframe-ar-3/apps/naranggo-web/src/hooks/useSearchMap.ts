import { useRef, useCallback, useState } from 'react';

const useSearchMap = () => {
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const searchBox = useRef<google.maps.MVCObject | null>(null);
  const [searchData, setSearchData] = useState('');
  const [centerCoordinate, setCenterCoordinate] = useState<MapCoordinate>();
  const [searchResult, setSearchResult] = useState<
    google.maps.places.PlaceResult[]
  >([]);

  const [googlemapInfor, setGooglemapInfor] =
    useState<HandleGoogleApiLoadedParam>();

  const onPlacesChanged = useCallback(
    (places: google.maps.places.PlaceResult[] | undefined) => {
      if (!places) {
        return;
      }

      setSearchResult(places);

      const selectedPlace = places[0];
      const place = selectedPlace?.geometry?.location;

      if (!place) {
        return;
      }

      setCenterCoordinate({
        lat: place.lat(),
        lng: place.lng()
      });

      setSearchData(selectedPlace.name || '');
    },
    []
  );

  const initSeachBox = ({ map, maps }: HandleGoogleApiLoadedParam) => {
    if (!map || !map.center) {
      return;
    }

    const center = map.center as google.maps.LatLng;
    //  0.001 -> 100m 내 결과 우선 검색
    const defaultBounds = {
      north: center.lat() + 0.001,
      south: center.lat() - 0.001,
      east: center.lng() + 0.001,
      west: center.lng() - 0.001
    };

    const option = {
      bounds: defaultBounds,
      componentRestrictions: { country: 'kr' },
      fields: ['geometry', 'name'],
      strictBounds: true
    };

    if (searchBoxRef.current) {
      searchBox.current = new maps.places.SearchBox(
        searchBoxRef.current,
        option
      );
    }
  };

  const addPlacesChangedListener = () => {
    // searchBox.current &&
    //   searchBox.current.addListener('places_changed', handleOnPlacesChanged);
    (searchBox.current as google.maps.places.SearchBox).addListener(
      'places_changed',
      handleOnPlacesChanged
    );
  };

  const handleOnPlacesChanged = useCallback(() => {
    (document?.activeElement as HTMLElement).blur();
    onPlacesChanged(
      (searchBox.current as google.maps.places.SearchBox).getPlaces()
    );
  }, [onPlacesChanged, searchBox]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
  };

  const handleSearchInputInit = () => {
    setSearchData('');
    searchBoxRef.current?.focus();
  };

  return {
    searchBoxRef,
    searchData,
    centerCoordinate,
    searchResult,
    googlemapInfor,
    initSeachBox,
    addPlacesChangedListener,
    handleSearchInputChange,
    setCenterCoordinate,
    handleSearchInputInit,
    setGooglemapInfor
  };
};

export default useSearchMap;
