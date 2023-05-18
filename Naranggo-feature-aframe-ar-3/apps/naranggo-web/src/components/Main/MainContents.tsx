import { useCallback, useEffect, MouseEvent } from 'react';
import MainMap from '@/components/map/MainMap';
import Marker from '@/components/common/map/Marker';
import useSearchMap from '@/hooks/useSearchMap';
import { useAtom } from 'jotai';
import { storySearchModalAtom } from '@/atoms/ModalAtom';
import StoryMapSearch from '../search/StoryMapSearch';
import { GeoJsonProperties } from 'geojson';
import * as Supercluster from 'supercluster';

import SearchMarker from '../common/map/SearchMarker';

type ClusteredStoryItem = Supercluster.PointFeature<GeoJsonProperties>;
interface MainProps {
  clusters: (
    | Supercluster.PointFeature<StoryItem>
    | Supercluster.PointFeature<Supercluster.ClusterProperties & any>
  )[];
  selectedMarkerCoordinate: MapCoordinate;

  onChangeMap: (mapChangeInformation: MapChangeInformation) => void;
  onClickMarker: (id: number) => void;
  onClickMap: () => void;
  onGoogleApiLoaded?: ({ map }: HandleGoogleApiLoadedParam) => void;
}

const MainContents = ({
  clusters,
  selectedMarkerCoordinate,
  onChangeMap,
  onClickMarker,
  onClickMap,
  onGoogleApiLoaded
}: MainProps) => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useAtom(storySearchModalAtom);

  const {
    searchBoxRef,
    searchData,
    centerCoordinate,
    searchResult,
    initSeachBox,
    addPlacesChangedListener,
    handleSearchInputChange,
    handleSearchInputInit
  } = useSearchMap();

  const handleGoogleApiLoaded = (apiLoaded: HandleGoogleApiLoadedParam) => {
    onGoogleApiLoaded && onGoogleApiLoaded(apiLoaded);
    // setGooglemapInfor(apiLoaded);
    initSeachBox(apiLoaded);
    addPlacesChangedListener();
  };

  const handleChangeMap = (mapChangeInformation: MapChangeInformation) => {
    onChangeMap(mapChangeInformation);
  };

  useEffect(() => {
    if (searchResult.length !== 0) {
      history.go(-1);
    }
  }, [searchResult, centerCoordinate, setIsSearchBarOpen]);

  useEffect(() => {
    if (isSearchBarOpen) {
      searchBoxRef.current && searchBoxRef.current?.focus();
    }
  }, [isSearchBarOpen, searchBoxRef]);

  const handleClickMarker = useCallback(
    (event: MouseEvent<HTMLButtonElement>, id: string | number | undefined) => {
      if (typeof id === 'number') {
        onClickMarker(id);
      }
      event.preventDefault();
      event.stopPropagation();
    },
    [onClickMarker]
  );

  return (
    <>
      <MainMap
        onChangeMap={handleChangeMap}
        onClickMap={onClickMap}
        searchResultCoordinate={centerCoordinate}
        handleGoogleApiLoaded={handleGoogleApiLoaded}
      >
        {searchResult.map((place: google.maps.places.PlaceResult) => {
          const { geometry, place_id } = place;

          const location = geometry?.location;

          if (!location) {
            return <></>;
          }

          return (
            <SearchMarker
              key={`${place_id}`}
              lat={location.lat()}
              lng={location.lng()}
            />
          );
        })}
        {clusters.map((clusteredStoryItem: ClusteredStoryItem, index) => {
          const id =
            clusteredStoryItem.properties &&
            clusteredStoryItem.properties.idblog
              ? clusteredStoryItem.properties.idblog
              : clusteredStoryItem.id;
          const [lng, lat] = clusteredStoryItem.geometry.coordinates;

          return (
            <Marker
              key={id}
              lat={lat}
              lng={lng}
              selected={
                selectedMarkerCoordinate?.lat === lat &&
                selectedMarkerCoordinate?.lng === lng
              }
              representative={clusteredStoryItem.properties?.representative}
              numberOfMarkers={
                clusteredStoryItem.properties
                  ? clusteredStoryItem.properties.point_count
                  : 1
              }
              onClickMarker={(e) => {
                handleClickMarker(e, id);
              }}
            />
          );
        })}
      </MainMap>
      <StoryMapSearch
        searchData={searchData}
        handleSearchInputChange={handleSearchInputChange}
        searchBoxRef={searchBoxRef}
        isSearchBarOpen={isSearchBarOpen}
        onClose={() => {
          setIsSearchBarOpen(false);
        }}
        handleSearchInputInit={handleSearchInputInit}
      />
    </>
  );
};

export default MainContents;
