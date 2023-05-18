import withAuth from '@/components/withAuth';
import { styled } from '@mui/material/styles';
import FloatingBtn from '@/components/common/Button/FloatingButton';
import { useEffect, useState, useRef } from 'react';
import {
  Dialog,
  List,
  ListItem,
  Stack,
  Typography,
  Box,
  Button
} from '@mui/material';
import CustomMarker from '@/components/common/map/Marker';
import useUserPosition from '@/hooks/useUserPosition';
import {
  StoryWriteParam,
  useGetStory,
  useGoogleMapAddress
} from '@/components/story/queries';
import Header from '@/components/Header/Header';
import { NextRouter, useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import StoryMapSearch from '@/components/search/StoryMapSearch';
import useSearchMap from '@/hooks/useSearchMap';
import dynamic from 'next/dynamic';
import MapControlButtonGroup from '@/components/ButtonGroup/MapControlButtonGroup';
import GoogleMap from '@/components/common/GoogleMap';
import {
  PointData,
  ProcessedStoryPoint
} from '@/components/Dialog/PointWriteDialog';
import Point from '@/components/Card/PointCard';
import SearchMarker from '@/components/common/map/SearchMarker';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import loginProfileAtom from '@/atoms/loginProfileAtom';
import {
  isPreviewPageAtom,
  storyPreviewInformationAtom
} from '@/atoms/storyWriteAtom';
import snackBarAtom from '@/atoms/snackBarAtom';
import { reorder } from '@/utils/array';
import {
  storyPreviewModalAtom,
  storySaveModalAtom,
  isPointEditModalOpenAtom,
  storySearchModalAtom
} from '@/atoms/ModalAtom';
import keepMapLocationAtom from '@/atoms/keepMapLocation';
import keepZoomLevelAtom from '@/atoms/keepZoomLevel';
import Image from 'next/image';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import { DEFAULT_ZOOM } from '@/consts/constants';
import {
  getImageFilename,
  getURLPathToImage
} from '@/components/Dialog/StorySaveDialog';
import useExitWhileEdit from '@/hooks/useExitWhileEdit';
import { sendMessageToDevice } from '@/utils/helpers';
import useLocationPermissionStatusChange from '@/hooks/useLocationPermissionStatusChange';
import { WEBVIEW_MESSAGE_TYPE } from '@naranggo/shared';
import usePermission from '@/hooks/usePermission';

const PointPreviewDialog = dynamic(
  () => import('@/components/Dialog/PointPreviewDialog'),
  { ssr: false }
);

const StorySaveDialog = dynamic(
  () => import('@/components/Dialog/StorySaveDialog'),
  { ssr: false }
);

const PointWriteDialog = dynamic(
  () => import('@/components/Dialog/PointWriteDialog'),
  { ssr: false }
);

const Write: NextPageWithLayout = () => {
  const [pointList, setpointList] = useState<ProcessedStoryPoint[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<ProcessedStoryPoint>();
  const [editing, setEditing] = useState(false);
  const [isMapTypeSatellite, setIsMapTypeSatellite] = useState(false);
  const [checkedEditingMode, setCheckedEditingMode] = useState(true);
  const [storyWriteData, setStoryWriteData] = useState<StoryWriteParam>({
    idblog: 0,
    lat: 0,
    lng: 0,
    playable: 1,
    publicsetting: 0,
    estimatedtime: 1,
    agecheck: 1,
    isplan: 1,
    isaudio: 1,
    pointcount: pointList.length,
    title: '',
    contents: '',
    summary: '',
    representative: ''
  });

  const [mapCenter, setMapCenter] = useAtom(keepMapLocationAtom);
  const [isSearchBarOpen, setIsSearchBarOpen] = useAtom(storySearchModalAtom);
  const [openSaveDialog, setOpenSaveDialog] = useAtom(storySaveModalAtom);
  const [openPreviewDialog, setOpenPreviewDialog] = useAtom(
    storyPreviewModalAtom
  );
  const [isPointEditModalOpen, setIsPointEditModalOpen] = useAtom(
    isPointEditModalOpenAtom
  );
  const setStoryPreviewInformation = useSetAtom(storyPreviewInformationAtom);
  const setIsPreviewPage = useSetAtom(isPreviewPageAtom);
  const setSnackBar = useSetAtom(snackBarAtom);
  const [zoomLevel, setZoomLevel] = useAtom(keepZoomLevelAtom);

  const sheetRef = useRef<BottomSheetRef>(null);
  const router = useRouter();
  const queryStoryId = Number(router.query.storyId) || 0;
  const { userPosition } = useUserPosition();
  const currentTime = Date.now();

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

  const { iduser, accesstoken } = useAtomValue(loginProfileAtom);

  const { data } = useGetStory(
    {
      idblog: queryStoryId,
      accessId: iduser,
      accesstoken,
      timeStamp: currentTime
    },
    {
      enabled:
        queryStoryId !== 0 && Boolean(iduser) && Boolean(accesstoken.length)
    }
  );

  const { refetch } = useGoogleMapAddress({
    coordinate: mapCenter || { lat: 0, lng: 0 },
    options: {
      enabled: false,
      onSuccess: (addresses) => {
        if (mapCenter) {
          if (addresses.error_message) {
            console.log(addresses.error_message);
            return;
          }

          const { lat, lng } = mapCenter;

          setpointList([
            ...pointList,
            {
              id: nanoid(),
              Latitude: lat,
              Longitude: lng,
              PointName: '포인트 제목',
              koAddress: addresses.results[0].formatted_address,
              enAddress: addresses.results[0].formatted_address,
              blocks: [
                {
                  type: 'TextBlockData',
                  text: '',
                  mode: '',
                  audioPath: '',
                  audioFileName: '',
                  picturePath: '',
                  isNowLoadingState: [0, 0]
                }
              ],
              RepresentativeImagePath: '',
              isRepresentativePoint: pointList.length === 0,
              isSubjectEditted: false
            }
          ]);
        }
      }
    }
  });

  const handleGoogleApiLoaded = (apiLoaded: HandleGoogleApiLoadedParam) => {
    //  setGooglemapInfor(apiLoaded);
    initSeachBox(apiLoaded);
    addPlacesChangedListener();
  };

  const handleFloatingButtonClick = async () => {
    if (mapCenter) {
      refetch();
    }
  };

  const handleChangeMapType = () => {
    setIsMapTypeSatellite(!isMapTypeSatellite);
  };

  const onClickOpenSheet = () => {
    if (!editing) {
      sheetRef.current?.snapTo(({ maxHeight }) => maxHeight - 170);
    }
    setEditing((editing) => !editing);
  };

  const handlePointEditClick = (point: ProcessedStoryPoint) => {
    setIsPointEditModalOpen(true);
    setSelectedPoint(point);
  };

  const handleMovePoint = (point: StoryPoint) => {
    const { Latitude, Longitude } = point;
    setMapCenter({ lat: Latitude, lng: Longitude });
  };

  const handelUpPointClick = (clickedIndex: number) => {
    if (clickedIndex - 1 >= 0) {
      setpointList([...reorder(pointList, clickedIndex, clickedIndex - 1)]);
    }
  };

  const handelDownPointClick = (clickedIndex: number) => {
    if (clickedIndex + 1 <= pointList.length - 1) {
      setpointList([...reorder(pointList, clickedIndex, clickedIndex + 1)]);
    }
  };

  const updatePointList = (updatedPointData: PointData) => {
    const {
      id: targetId,
      PointName,
      editorValue,
      RepresentativeImagePath
    } = updatedPointData;

    const newPointList = pointList.map((p: ProcessedStoryPoint) => {
      if (p.id === targetId) {
        if (editorValue && editorValue.length) {
          return {
            ...p,
            PointName,
            editorValue,
            RepresentativeImagePath
          };
        }

        if (!(editorValue && !editorValue.length)) {
          if (p.editorValue && p.editorValue.length) {
            const { editorValue, ...remainP } = p;

            return {
              ...remainP,
              PointName,
              RepresentativeImagePath
            };
          }

          if (!p.editorValue) {
            return {
              ...p,
              PointName,
              RepresentativeImagePath
            };
          }
        }
      }
      return p;
    });

    setpointList(newPointList);
  };

  const isContentsType = (o: object): o is StoryContents => {
    return 'interactive' in o && 'storyPoints' in o;
  };

  useEffect(() => {
    if (searchResult.length !== 0) {
      history.go(-1);
      setMapCenter(centerCoordinate);
    }
  }, [searchResult, centerCoordinate, setIsSearchBarOpen, setMapCenter]);

  useEffect(() => {
    if (isSearchBarOpen) {
      searchBoxRef.current && searchBoxRef.current?.focus();
    }
  }, [isSearchBarOpen, searchBoxRef]);

  useEffect(() => {
    const firstImageInPointList = pointList.find((point) => {
      if (point.RepresentativeImagePath.length !== 0) {
        return true;
      }
    });

    if (
      isStoryEdit(router) ||
      pointList.length === 0 ||
      (pointList[0].PointName === storyWriteData.title &&
        ((!firstImageInPointList && storyWriteData.representative === '') ||
          (firstImageInPointList &&
            storyWriteData.representative ===
              firstImageInPointList.RepresentativeImagePath)))
    ) {
      return;
    }

    const storyWriteDataToBeEditted = {
      title: '',
      representative: '',
      publicsetting: 0
    };

    storyWriteDataToBeEditted.title = pointList[0].PointName;

    if (firstImageInPointList) {
      storyWriteDataToBeEditted.representative =
        firstImageInPointList.RepresentativeImagePath;

      storyWriteDataToBeEditted.publicsetting = 1;
    }

    setStoryWriteData({
      ...storyWriteData,
      ...storyWriteDataToBeEditted
    });
  }, [pointList, router, storyWriteData]);

  useEffect(() => {
    if (queryStoryId) {
      if (pointList.length && checkedEditingMode) {
        setMapCenter({
          lat: pointList[0].Latitude,
          lng: pointList[0].Longitude
        });

        setCheckedEditingMode(false);
      }
    }
    return;
  }, [checkedEditingMode, pointList, queryStoryId, setMapCenter]);

  useEffect(() => {
    if (data) {
      setStoryWriteData({
        ...data,
        title: data.title.slice(0, 20),
        representative: getURLPathToImage(data.representative)
      });

      if (data.contents) {
        // contents 는 JSON string임. 서버에서 이렇게 내려주고 있어서 클라에선 이 방법 밖에 없습니다. by 최대욱.
        const parsedContents = JSON.parse(data.contents);

        if (isContentsType(parsedContents)) {
          const processedStoryPoints = parsedContents.storyPoints.map(
            (storyPoint) => ({
              ...storyPoint,
              isSubjectEditted: true
            })
          );

          setpointList(processedStoryPoints);
        }
      }
    }
  }, [data]);

  const {
    isDirty,
    isStateInitialized,
    setIsPossibleToInitialize,
    setModalInformation
  } = useExitWhileEdit(pointList, {
    modalType: isStoryEdit(router) ? 'EXIT_EDIT' : 'EXIT_NEW_WRITE',
    isWatchingStateInitializedImmediately: false
  });

  useEffect(() => {
    if (isStateInitialized) {
      return;
    }

    if (queryStoryId && data) {
      setIsPossibleToInitialize(true);
    }

    if (!queryStoryId) {
      setIsPossibleToInitialize(true);
    }
  }, [data, isStateInitialized, queryStoryId, setIsPossibleToInitialize]);

  const { targetPermissionStatus: LOCATION, checkIfPossibleToUseFeature } =
    usePermission('LOCATION');

  useLocationPermissionStatusChange({
    userPosition,
    LOCATION,
    setCenter: setMapCenter
  });

  useEffect(() => {
    if (LOCATION === 'denied') {
      sendMessageToDevice(WEBVIEW_MESSAGE_TYPE.PERMISSION_REQUEST, {
        permissionType: 'LOCATION'
      });
    }
  }, [LOCATION]);

  if (!openSaveDialog && router.asPath.includes('storySaveModal=true')) {
    router.replace('/invalid-access');
    return <></>;
  }

  if (!selectedPoint && router.asPath.includes('isPointEditModalOpen=true')) {
    router.replace('/invalid-access');
    return <></>;
  }

  if (!openPreviewDialog && router.asPath.includes('storyPreviewModal=true')) {
    router.replace('/invalid-access');
    return <></>;
  }

  if (!isSearchBarOpen && router.asPath.includes('storySearchModal=true')) {
    router.replace('/invalid-access');
    return <></>;
  }

  return (
    <>
      <StyledDialog fullScreen open={true} disableEnforceFocus>
        <Header
          options={{
            close: true,
            storyPreview: [true, !pointList.length],
            next: [true, !pointList.length]
          }}
          pageName="포인트 추가"
          onClickClose={() => {
            if (isDirty) {
              setModalInformation({ type: 'EXIT_NEW_WRITE' });
            } else {
              router.replace('/');
            }
          }}
          onClickStoryPreview={() => {
            setIsPreviewPage(true);
            setOpenPreviewDialog(true);
            setStoryPreviewInformation({
              title: storyWriteData.title,
              summary: storyWriteData.summary,
              representative: storyWriteData.representative
            });
          }}
          onClickNext={() => {
            if (pointList.length === 0) {
              setSnackBar({
                isSnackBarOpen: true,
                message: '최소 1개의 포인트가 필요해요.',
                vertical: 'bottom'
              });
            } else {
              setOpenSaveDialog(true);
            }
          }}
        />
        <Wrapper className="story_write">
          <MapWrapper
            style={{
              // (kyh) todo : hidden을 풀어버리면 미리보기 페이지에 들어갈때
              // 페이지가 깜빡이면서 들어가게 됩니다. 정확한 원인은 찾지 못했습니다.
              visibility: openPreviewDialog ? 'hidden' : 'initial'
            }}
          >
            {userPosition && (
              <GoogleMap
                center={mapCenter || userPosition}
                handleGoogleApiLoaded={handleGoogleApiLoaded}
                zoom={zoomLevel}
                isMapTypeSatellite={isMapTypeSatellite}
                onChangeMap={({ center, zoom }: MapChangeInformation) => {
                  const [lng, lat] = center;
                  let newLng = lng;

                  // (kyh) todo: 로직 분리 필요
                  // 지구를 반바퀴 이상 돈 경우에 대한 처리 로직 === lng가 -180도 보다 작거나, 180도 보다 큰 경우
                  if (lng < -180) {
                    const positiveLng = -lng;
                    const [onlyInteger, onlyFloat] =
                      divideIntegerAndFloat(positiveLng);

                    if (Math.floor(onlyInteger / 180) % 2 === 0) {
                      newLng = -(onlyInteger % 180) - onlyFloat;
                    }

                    if (Math.floor(onlyInteger / 180) % 2 === 1) {
                      newLng = 180 - (onlyInteger % 180) - onlyFloat;
                    }
                  } else {
                    const positiveLng = lng;
                    const [onlyInteger, onlyFloat] =
                      divideIntegerAndFloat(positiveLng);

                    if (Math.floor(onlyInteger / 180) % 2 === 0) {
                      newLng = (onlyInteger % 180) + onlyFloat;
                    }

                    if (Math.floor(onlyInteger / 180) % 2 === 1) {
                      newLng = -180 + (onlyInteger % 180) + onlyFloat;
                    }
                  }

                  setZoomLevel(zoom);

                  setMapCenter({
                    lat,
                    lng: newLng
                  });
                }}
              >
                {pointList.map(
                  ({
                    id,
                    Latitude,
                    Longitude,
                    RepresentativeImagePath
                  }: StoryPoint) => (
                    <CustomMarker
                      key={`${id}`}
                      lat={Latitude}
                      lng={Longitude}
                      numberOfMarkers={1}
                      representative={getImageFilename(RepresentativeImagePath)}
                    />
                  )
                )}
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
              </GoogleMap>
            )}
            <MapControlButtonGroup
              controls={[
                {
                  type: 'Search',
                  onClick: () => {
                    setIsSearchBarOpen(true);
                  }
                },
                {
                  type: 'UserLocation',
                  onClick: checkIfPossibleToUseFeature(() => {
                    if (userPosition) {
                      setMapCenter({
                        lat: userPosition?.lat,
                        lng: userPosition.lng
                      });
                      setZoomLevel(DEFAULT_ZOOM);
                    }
                  })
                },
                { type: 'MapType', onClick: handleChangeMapType }
              ]}
            />
            <FloatingBtn
              onClick={handleFloatingButtonClick}
              sx={{
                position: 'absolute',
                zIndex: 1,
                right: 13,
                bottom:
                  typeof window !== 'undefined'
                    ? window.innerHeight / 4 + 13
                    : 300
              }}
            />
          </MapWrapper>
          {!selectedPoint && !isPointEditModalOpen && !openPreviewDialog && (
            <BottomSheet
              open
              ref={sheetRef}
              blocking={false}
              defaultSnap={({ maxHeight }) => maxHeight / 4}
              snapPoints={({ maxHeight }) => {
                return [maxHeight - 180, maxHeight / 4];
              }}
              header={
                <>
                  <Stack>
                    {pointList.length ? (
                      <EditingButton onClick={onClickOpenSheet}>
                        {editing ? '완료' : '편집'}
                      </EditingButton>
                    ) : (
                      <Stack sx={{ height: '40px' }}></Stack>
                    )}
                  </Stack>
                </>
              }
            >
              {pointList && (
                <PointListWrapper className="droppable-list">
                  {pointList.length ? (
                    pointList.map(
                      (point: ProcessedStoryPoint, index: number) => (
                        <PointItemWrapper
                          key={point.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMovePoint(point);
                          }}
                        >
                          <Point
                            point={point}
                            editing={editing}
                            onPointEditClick={() => {
                              handlePointEditClick(point);
                            }}
                            onPointDeleteClick={() => {
                              setModalInformation({
                                type: 'DELETE_POINT',
                                handleClickRightBtn: () => {
                                  setpointList(
                                    pointList.filter(
                                      (p: StoryPoint) => p.id !== point?.id
                                    )
                                  );
                                }
                              });
                            }}
                            onPointUpClick={() => {
                              handelUpPointClick(index);
                            }}
                            onPointDownClick={() => {
                              handelDownPointClick(index);
                            }}
                          />
                        </PointItemWrapper>
                      )
                    )
                  ) : (
                    <Stack sx={{ alignItems: 'center', paddingTop: '1rem' }}>
                      <Image
                        src="/images/empty_list_point.png"
                        alt="point"
                        layout="fixed"
                        width={25}
                        height={25}
                      />
                      <Typography
                        sx={{
                          paddingTop: '1rem',
                          color: '#aaa'
                        }}
                      >
                        + 버튼을 눌러 포인트를 추가해 보세요!
                      </Typography>
                    </Stack>
                  )}
                </PointListWrapper>
              )}
            </BottomSheet>
          )}
          {openPreviewDialog && (
            <PointPreviewDialog open={true} pointList={pointList} />
          )}
          {selectedPoint && (
            <PointWriteDialog
              open={!!selectedPoint}
              onClosePointWrite={() => setSelectedPoint(undefined)}
              onClose={(pointData) => {
                if (pointData) {
                  updatePointList(pointData);
                }

                setSelectedPoint(undefined);
                router.back();
              }}
              point={selectedPoint}
            />
          )}
          {openSaveDialog ? (
            <StorySaveDialog
              open={openSaveDialog}
              pointList={pointList}
              storyWriteData={storyWriteData}
            />
          ) : (
            <></>
          )}
        </Wrapper>
      </StyledDialog>
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

export default withAuth(Write);

const StyledDialog = styled(Dialog)(() => ({
  zIndex: 'initial'
}));

const PointListWrapper = styled(List)(() => ({
  position: 'relative',
  padding: 0,
  bgcolor: 'background.paper',
  height: '100%',
  width: '100%'
}));

const PointItemWrapper = styled(ListItem)(() => ({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const Wrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: '100%',
  height: '100%',

  '& .MuiFab-circular:hover': {
    backgroundColor: '#000 !important'
  }
}));

const MapWrapper = styled(Stack)(() => ({
  width: '100%',
  flex: '1 1 0%',
  position: 'relative'
}));

const EditingButton = styled(Button)(() => ({
  justifyContent: 'flex-end',
  width: '100%',
  paddingRight: '16px',
  color: '#736dee',
  fontSize: '18px'
}));

const divideIntegerAndFloat = (number: number) => {
  const Integer = Math.floor(number);

  return [Integer, number - Integer];
};

const isStoryEdit = (router: NextRouter) => router.asPath.includes('storyId');
