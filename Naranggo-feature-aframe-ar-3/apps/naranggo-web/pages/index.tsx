import { useCallback, useEffect, useState, useRef } from 'react';
import { useQuery } from 'react-query';
import { Box, Button, Stack, styled } from '@mui/material';
import MainLayout from '@/components/layout/MainLayout';
import withAuth from '@/components/withAuth';
import MainContents from '@/components/Main/MainContents';
import MainBottomSheet from '@/components/BottomSheet/MainBottomSheet';
import BottomModal from '@/components/Modal/BottomModal';
import { getNearStoryList } from '@/components/story/queries';
import useUserPosition from '@/hooks/useUserPosition';
import { useSessionStorage } from '@/hooks/useSessionStorage';
import { deepEqual, shouldNotForwardProp } from '@/utils/helpers';
import { BottomSheetRef } from 'react-spring-bottom-sheet';
import { useAtomValue, useSetAtom } from 'jotai';
import snackBarAtom from '@/atoms/snackBarAtom';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import useSupercluster from 'use-supercluster';
import { DEFAULT_ZOOM } from '@/consts/constants';
import { reportModalAtom } from '@/atoms/ModalAtom';
import { mainFilterIconShowAtom } from '@/atoms/filterIconShowAtom';
import isHardwareBackButtonTriggeredAtom from '@/atoms/isHardwareBackButtonTriggeredAtom';
import modalInformationAtom from '@/atoms/modalInformationAtom';
import isBottomModalOpenAtom from '@/atoms/isBottomModalOpenAtom';
import produce from 'immer';

const NONE_SELECTED_MARKER_ID = -1;

// todo: 객체 값이 변동되어 임시로 옮겼습니다. 16일 이후 다시 확인하겠습니다.
const storyFilter: StoryFilter[] = [
  { text: '내 스토리', id: 0, checked: false, filterType: 3 },
  { text: '팔로잉', id: 1, checked: false, filterType: 2 },
  { text: '한국관광공사', id: 2, checked: false, filterType: 4 }
];

const storyDateFilter: StoryDateFilter[] = [
  { text: '전체', id: 0, checked: true, date: 0 },
  { text: '1개월', id: 1, checked: false, date: 1 },
  { text: '6개월', id: 2, checked: false, date: 6 },
  { text: '1년', id: 3, checked: false, date: 12 }
];

const initialFilterInformation = {
  storyDateFilter,
  storyFilter
};

type RestoredFilter = {
  storyDateFilter: StoryDateFilter[];
  storyFilter: StoryFilter[];
};

const Map: NextPageWithLayout = () => {
  const [mapInformation, setMapInformation] = useState<MapChangeInformation>();
  const [googleMapOnLoad, setGoogleMapOnLoad] = useState(false);
  const [apiCallAvailable, setApiCallAvailable] = useState(false);
  const [onMarkerStory, setOnMarkerStory] = useState(false);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number>(
    NONE_SELECTED_MARKER_ID
  );

  const [selectedMarkerCoordinate, setSelectedMarkerCoordinate] =
    useState<MapCoordinate>();
  const focusRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<BottomSheetRef>(null);

  const { userPosition } = useUserPosition();
  const { iduser, accesstoken, nickname } = useAtomValue(loginProfileAtom);
  const setIsBottomModalOpen = useSetAtom(isBottomModalOpenAtom);
  const isReportModalAtom = useAtomValue(reportModalAtom);
  const setFilterApply = useSetAtom(mainFilterIconShowAtom);

  const [isPageShownFirstTime, setIsPageShownFirstTime] = useSessionStorage(
    'isPageShownFirstTime',
    true
  );

  const [restoredFilter, setRestoredFilter] = useSessionStorage(
    'mainFilter',
    initialFilterInformation
  );

  const [filterToBeApplied, setFilterToBeApplied] = useState(restoredFilter);

  const storyFilterTypes = restoredFilter.storyFilter
    .filter((filterItem: StoryFilter) => filterItem.checked === true)
    .map((filterItem: StoryFilter) => filterItem.filterType);

  const storyFilterPeriod = restoredFilter.storyDateFilter
    .filter((period: StoryDateFilter) => period.checked)
    .map((period: StoryDateFilter) => period.date)[0];

  const setSnackBar = useSetAtom(snackBarAtom);

  const bounds = mapInformation?.bounds;
  const ne = bounds?.getNorthEast();
  const sw = bounds?.getSouthWest();
  const currentTime = Date.now();

  const { data: storyList, isLoading } = useQuery<StoryItem[]>(
    [
      'getNearStoryList',
      storyFilterTypes.length ? [storyFilterTypes] : [[1]],
      storyFilterPeriod,
      ne?.lat(),
      ne?.lng(),
      sw?.lat(),
      sw?.lng()
    ],
    () =>
      getNearStoryList({
        accesstoken,
        accessId: iduser,
        period: storyFilterPeriod,
        filterType: storyFilterTypes.length ? [storyFilterTypes] : [[1]],
        lat: userPosition?.lat || 0,
        lng: userPosition?.lng || 0,
        leftTopLat: ne?.lat(),
        leftTopLng: sw?.lng(),
        rightBottomLat: sw?.lat(),
        rightBottomLng: ne?.lng(),
        timeStamp: currentTime
      }),
    {
      staleTime: 0,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      enabled: apiCallAvailable
    }
  );

  const { clusters, supercluster } = useSupercluster({
    points:
      storyList?.map((storyItem) => ({
        type: 'Feature',
        properties: {
          cluster: false,
          ...storyItem
        },
        geometry: { type: 'Point', coordinates: [storyItem.lng, storyItem.lat] }
      })) || [],
    bounds: [sw?.lng(), sw?.lat(), ne?.lng(), ne?.lat()],
    zoom: mapInformation?.zoom || DEFAULT_ZOOM,
    options: {
      radius: 100
    }
  });

  const handleOnChangeSheetDefaultHeight = () => {
    sheetRef.current?.snapTo(({ maxHeight }) => maxHeight / 2);
  };

  const handleOnChangeSheetMinimumHeight = () => {
    sheetRef.current?.snapTo(({ snapPoints }) => Math.min(...snapPoints));
  };

  const handleOnChangeMap = (mapChangeInformation: MapChangeInformation) => {
    if (isReportModalAtom) return;
    setMapInformation(mapChangeInformation);
    setSelectedMarkerId(NONE_SELECTED_MARKER_ID);
    setOnMarkerStory(false);
  };

  const handleGoogleApiLoaded = ({ map }: HandleGoogleApiLoadedParam) => {
    setGoogleMapOnLoad(true);
    map.addListener('dragend', () => {
      handleOnChangeSheetMinimumHeight();
    });
  };

  const getMarkerStory = useCallback(
    (id: number) => {
      if (id === NONE_SELECTED_MARKER_ID) {
        return [];
      }
      try {
        // clustered marker
        const itemProperties = supercluster
          ?.getLeaves(id, Infinity)
          .map((clusterItem) => {
            return clusterItem.properties;
          });

        return itemProperties as StoryItem[];
      } catch (error) {
        // normal marker
        return clusters
          .filter((clusterItem) => clusterItem.properties?.idblog === id)
          .map((clusterItem) => clusterItem.properties) as StoryItem[];
      }
    },
    [clusters, supercluster]
  );

  const findSelectedClusterMarkers = useCallback(
    (id: number) => {
      if (id === -1) {
        return [];
      }
      const findCluster = clusters.find(({ id: clusterId }) => {
        return clusterId === id;
      });

      if (findCluster) {
        setSelectedMarkerCoordinate({
          lng: findCluster.geometry.coordinates[0],
          lat: findCluster.geometry.coordinates[1]
        });
      } else {
        const normalMarkers = clusters
          .filter((clusterItem) => clusterItem.properties?.idblog === id)
          .map((clusterItem) => clusterItem.properties);

        if (normalMarkers) {
          setSelectedMarkerCoordinate({
            lat: normalMarkers[0].lat,
            lng: normalMarkers[0].lng
          });
        }
      }
    },
    [clusters]
  );

  const findNormalMarkers = useCallback(
    (id: number) => {
      if (id === -1) {
        return [];
      }
      const normalMarkers = clusters
        .filter((clusterItem) => clusterItem.properties?.idblog === id)
        .map((clusterItem) => clusterItem.properties);

      if (normalMarkers) {
        setSelectedMarkerCoordinate({
          lat: normalMarkers[0].lat,
          lng: normalMarkers[0].lng
        });
      }
    },
    [clusters]
  );

  const handleClickMarker = useCallback(
    (id: number) => {
      setOnMarkerStory(true);
      handleOnChangeSheetDefaultHeight();
      if (id) {
        try {
          findSelectedClusterMarkers(id);
        } catch {
          findNormalMarkers(id);
        }
        setSelectedMarkerId(id);
      }
    },
    [findNormalMarkers, findSelectedClusterMarkers]
  );

  const handleClickFilterStory = (clickedId: number) => {
    const nextState = produce(filterToBeApplied, (draft: RestoredFilter) => {
      draft.storyFilter[clickedId].checked =
        !draft.storyFilter[clickedId].checked;
    });

    setFilterToBeApplied(nextState);
  };

  const handleClickChangeFilter = () => {
    setIsBottomModalOpen(false);

    setRestoredFilter(filterToBeApplied);

    if (deepEqual(filterToBeApplied, initialFilterInformation)) {
      setFilterApply(false);
      return;
    }

    setFilterApply(true);
  };

  const handleClickFilterPeriod = (clickedId: number) => {
    const nextState = produce(filterToBeApplied, (draft: RestoredFilter) => {
      for (let i = 0; i < draft.storyDateFilter.length; i++) {
        const { id } = draft.storyDateFilter[i];

        if (id === clickedId) {
          draft.storyDateFilter[i].checked = true;
        } else {
          draft.storyDateFilter[i].checked = false;
        }
      }
    });

    setFilterToBeApplied(nextState);
  };

  const handleResetFilter = () => {
    setFilterToBeApplied(initialFilterInformation);
  };

  useEffect(() => {
    if (
      userPosition &&
      userPosition?.lat !== 0 &&
      ne?.lat() &&
      ne?.lng() &&
      sw?.lat() &&
      sw?.lng() &&
      googleMapOnLoad
    ) {
      setApiCallAvailable(true);
    }
  }, [mapInformation, googleMapOnLoad, userPosition, ne, sw]);

  useEffect(() => {
    if (nickname.length === 0) {
      return;
    }

    if (isPageShownFirstTime) {
      setSnackBar({
        isSnackBarOpen: true,
        message: `${nickname}님 환영합니다`,
        vertical: 'bottom'
      });

      setIsPageShownFirstTime(false);
    }
  }, [isPageShownFirstTime, nickname, setIsPageShownFirstTime, setSnackBar]);

  const markerStory = getMarkerStory(selectedMarkerId);

  const currentStoryList =
    markerStory.length > 0 ? markerStory : storyList || [];

  const setSelectMarkerId = async (id?: number) =>
    id && setSelectedMarkerId(id);

  const isHardwareBackButtonTriggered = useAtomValue(
    isHardwareBackButtonTriggeredAtom
  );

  const setModalInformation = useSetAtom(modalInformationAtom);

  useEffect(() => {
    if (isHardwareBackButtonTriggered) {
      setModalInformation({ type: 'EXIT_APP' });
    }
  }, [isHardwareBackButtonTriggered, setModalInformation]);

  const isBottomModalOpen = useAtomValue(isBottomModalOpenAtom);

  useEffect(() => {
    if (!isBottomModalOpen) {
      setFilterToBeApplied(restoredFilter);
    }
  }, [isBottomModalOpen, restoredFilter]);

  return (
    <Wrapper>
      <MainContents
        selectedMarkerCoordinate={
          selectedMarkerCoordinate || { lng: 0, lat: 0 }
        }
        clusters={clusters}
        onClickMarker={handleClickMarker}
        onClickMap={() => {
          setSelectedMarkerCoordinate({ lng: 0, lat: 0 });
          handleOnChangeSheetMinimumHeight();
          setOnMarkerStory(false);
          setSelectedMarkerId(NONE_SELECTED_MARKER_ID);
        }}
        onGoogleApiLoaded={handleGoogleApiLoaded}
        onChangeMap={handleOnChangeMap}
      />
      <MainBottomSheet
        sheetRef={sheetRef}
        focusRef={focusRef}
        onMarkerStory={onMarkerStory}
        storyList={currentStoryList}
        queryKey={[
          'getNearStoryList',
          storyFilterTypes.length ? [storyFilterTypes] : [[1]],
          storyFilterPeriod,
          ne?.lat(),
          ne?.lng(),
          sw?.lat(),
          sw?.lng()
        ]}
        isLoading={isLoading}
        setSelectMarkerId={setSelectMarkerId}
      />
      <BottomModal
        title="필터 선택"
        contentsTitle="스토리 작성자"
        period={filterToBeApplied.storyDateFilter}
        onClickFilterData={handleClickFilterPeriod}
        onClickResetButtn={handleResetFilter}
        onClickFilterApplyButton={handleClickChangeFilter}
      >
        <StyledButtonBox>
          {filterToBeApplied.storyFilter &&
            filterToBeApplied.storyFilter.map((list: StoryFilter) => (
              <StyledButton
                onClick={() => {
                  handleClickFilterStory(list.id);
                }}
                key={list.id}
                value={list.id}
                checked={list.checked}
              >
                {list.text}
              </StyledButton>
            ))}
        </StyledButtonBox>
      </BottomModal>
    </Wrapper>
  );
};

Map.getLayout = (page: React.ReactElement): React.ReactElement => {
  return (
    <MainLayout options={{ filter: true, notification: true }}>
      {page}
    </MainLayout>
  );
};

export default withAuth(Map);

const Wrapper = styled(Stack)(() => ({
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  height: '100%',

  '& .MuiList-root': {
    padding: 0
  }
}));

const StyledButtonBox = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingBottom: '26px',
  gap: '15px',
  borderBottom: '1px solid #e6e6e6'
}));

const StyledButton = styled(
  Button,
  shouldNotForwardProp('checked')
)<{ checked?: boolean }>(({ checked }) => ({
  flex: 1,
  padding: '6.5px 0',
  borderRadius: '10px !important',
  border: '1px solid #e9e9e9 !important',
  color: checked ? '#ffffff' : '#7f7f7f',
  backgroundColor: checked ? '#726de6' : '#e9e9e9',
  fontSize: '13px',
  lineHeight: '13px',

  '&:hover': {
    backgroundColor: checked ? '#726de6 !important' : '#e9e9e9 !important'
  }
}));
