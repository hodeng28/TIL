import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  Typography
} from '@mui/material';
import GoogleMap from '@/components/common/GoogleMap';
import CustomMarker from '@/components/common/map/Marker';
import RoomIcon from '@mui/icons-material/Room';
import { LocationOn } from '@mui/icons-material';
import { forwardRef, useRef } from 'react';
import Profile from '@/components/story/read/Profile';
import useUserPosition from '@/hooks/useUserPosition';
import useMapWithScrollList from '@/hooks/useMapWithScrollList';

import { shouldNotForwardProp } from '@/utils/helpers';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

export const ITEM_HEIGHT = 48;
export const PROFILE_HEIGHT = 83;
const ITEM_LIST_GUTTER = 16;

const StoryPreview = ({ pointList }: { pointList: StoryPoint[] }) => {
  const { userPosition } = useUserPosition();

  const scrollElementRef = useRef<HTMLUListElement>(null);
  const { currentMarkerCoordinate, currentPointIndex } = useMapWithScrollList({
    pointList,
    scrollElementRef
  });

  if (!pointList || pointList.length === 0) {
    return <></>;
  }

  const customMarkers = pointList.map(({ Latitude, Longitude }: StoryPoint) => {
    return (
      <CustomMarker
        key={`${Latitude}-${Longitude}`}
        lat={Latitude}
        lng={Longitude}
        representative=""
      />
    );
  });

  const pointLists = pointList.map(({ id }: StoryPoint) => (
    <ListItemButton key={id}>
      <ListItemIcon>
        <LocationOn />
      </ListItemIcon>
      <ListItemText primary={'todo'} />
    </ListItemButton>
  ));

  const center = currentMarkerCoordinate
    ? currentMarkerCoordinate
    : userPosition;

  return (
    <Wrapper>
      <ThumbnailMapWrapper>
        <MapWrapper>
          {center && <GoogleMap center={center}>{customMarkers}</GoogleMap>}
        </MapWrapper>
        <ThumbnailWrapper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          isDisplayed={currentPointIndex === -1}
        >
          <ImageNotSupportedIconWrapper />
          <DescriptionWrapper
            sx={{ position: 'absolute', bottom: 5, left: 10 }}
          >
            <Box sx={{ display: 'flex' }}>
              <MarkerIcon />
              <MarkerText>{pointList.length}</MarkerText>
            </Box>
            <NoImageTitle>작성중인 스토리의 미리보기 중입니다.</NoImageTitle>
            <NoImageDescription>
              작성중인 스토리의 미리보기 중입니다.
            </NoImageDescription>
          </DescriptionWrapper>
        </ThumbnailWrapper>
      </ThumbnailMapWrapper>
      <PointList ref={scrollElementRef}>
        <Dummy pointListLength={pointList.length}>&nbsp;</Dummy>
        <Profile
          profilepath={'/images/profile.png'}
          nickname={'nickname'}
          isfollow={1}
          createdtime={'2022/09/01'}
        />
        {pointLists}
      </PointList>
    </Wrapper>
  );
};

export default StoryPreview;

const Wrapper = styled(Stack)(() => ({
  height: '100%'
}));

const ThumbnailMapWrapper = styled(Box)(() => ({
  height: '30%',
  width: '100%',
  position: 'relative'
}));

const MapWrapper = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0
}));

const ThumbnailWrapper = styled(
  Box,
  shouldNotForwardProp('isDisplayed')
)<{ isDisplayed?: boolean }>(({ isDisplayed }) => ({
  height: '100%',
  width: '100%',
  position: 'absolute',
  backgroundColor: 'grey',
  top: 0,
  left: 0,
  display: isDisplayed ? 'block' : 'none'
}));

type PointListProps = { children: React.ReactNode; component: 'nav' };
const PointListForwardRef = forwardRef<HTMLDivElement, PointListProps>(
  (props, ref) => (
    <List {...props} ref={ref}>
      {props.children}
    </List>
  )
);

PointListForwardRef.displayName = 'PointListForwardRef';

const PointList = styled(List)(() => ({
  overflowY: 'scroll',
  position: 'relative'
}));

const ImageNotSupportedIconWrapper = styled(ImageNotSupportedIcon)(() => ({
  position: 'absolute',
  width: '100%',
  height: '100%'
}));

const DescriptionWrapper = styled(Stack)(() => ({
  marginTop: 'auto'
}));

const MarkerIcon = styled(RoomIcon)(({ theme }) => ({
  color: theme.palette.custom.skyblue,
  fontSize: '1.2rem'
}));

const MarkerText = styled(Typography)(({ theme }) => ({
  color: theme.palette.custom.skyblue,
  fontSize: '1rem'
}));

const NoImageTitle = styled(Typography)(() => ({
  color: 'white',
  fontSize: '1rem'
}));

const NoImageDescription = styled(Typography)(() => ({
  color: 'white',
  fontSize: '0.5rem'
}));

const Dummy = styled(
  Box,
  shouldNotForwardProp('pointListLength')
)<{ pointListLength: number }>(({ pointListLength }) => ({
  height: `${
    PROFILE_HEIGHT * 2 +
    pointListLength * ITEM_HEIGHT +
    ITEM_LIST_GUTTER +
    (pointListLength - 1) * ITEM_HEIGHT
  }px`,
  position: 'absolute',
  zIndex: -1
}));
