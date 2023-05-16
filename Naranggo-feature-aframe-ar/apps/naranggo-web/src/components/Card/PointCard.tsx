import {
  Box,
  Card,
  IconButton,
  Stack,
  styled,
  Typography
} from '@mui/material';
import Image from 'next/image';
import { shouldNotForwardProp } from '@/utils/helpers';

interface PointProps {
  point: StoryPoint;
  editing?: boolean;
  onPointEditClick: () => void;
  onPointDeleteClick: () => void;
  onPointUpClick?: () => void;
  onPointDownClick?: () => void;
  onClickRepresentative?: () => void;
}

const Point = ({
  point,
  editing = false,
  onPointDeleteClick,
  onPointEditClick,
  onPointUpClick,
  onPointDownClick
}: PointProps) => {
  const { id, PointName: pointName, koAddress } = point;

  return (
    <PointCard key={id}>
      <ImageWrapper>
        {point.RepresentativeImagePath ? (
          <Image
            key={id}
            src={point.RepresentativeImagePath}
            alt="대표 이미지"
            layout="fixed"
            width={100}
            height={100}
            objectFit="cover"
          />
        ) : (
          <Image
            src="/images/Button_photo.png"
            alt="대표 이미지"
            layout="fixed"
            width={25}
            height={25}
          />
        )}
      </ImageWrapper>
      <Content>
        <ContentWrapper>
          <PointName>{pointName}</PointName>
          <AddressName>{koAddress}</AddressName>
        </ContentWrapper>
      </Content>
      <ButtonGroup>
        <WriteButtonGroup editing={editing}>
          <Stack>
            <HandleButton
              onClick={(e) => {
                onPointUpClick && onPointUpClick();
                e.stopPropagation();
              }}
            >
              <Image
                src="/images/edit_photo_up_on.png"
                alt="edit"
                layout="fixed"
                width={20}
                height={20}
              />
            </HandleButton>
            <HandleButton
              onClick={(e) => {
                onPointDownClick && onPointDownClick();
                e.stopPropagation();
              }}
            >
              <Image
                src="/images/edit_photo_down_on.png"
                alt="edit"
                layout="fixed"
                width={20}
                height={20}
              />
            </HandleButton>
          </Stack>
          <DeleteButton
            onClick={(e) => {
              onPointDeleteClick && onPointDeleteClick();
              e.stopPropagation();
            }}
          >
            <Image
              src="/images/Button_PointList_Delete.png"
              alt="edit"
              layout="fixed"
              width={25}
              height={25}
            />
          </DeleteButton>
        </WriteButtonGroup>
        <WriteButton
          editing={editing}
          onClick={(e) => {
            onPointEditClick && onPointEditClick();
            e.stopPropagation();
          }}
        >
          <Image
            src="/images/edit_pointlist.png"
            alt="edit"
            layout="fixed"
            width={25}
            height={25}
          />
        </WriteButton>
      </ButtonGroup>
    </PointCard>
  );
};

export default Point;

const PointCard = styled(Card)(() => ({
  display: 'flex',
  height: '100px',
  width: '100%',
  borderRadius: '11px',
  boxShadow: '1px 2px 5px rgba(0, 0, 0, 0.25)'
}));

const ImageWrapper = styled(Box)(() => ({
  display: 'flex',
  // flexGrow: '1',
  minWidth: '100px',
  justifyContent: 'center',
  alignItems: 'center'
}));

const Content = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flexGrow: '3',
  height: '100%'
}));

const ContentWrapper = styled(Box)(() => ({
  marginLeft: '10px'
}));

const ButtonGroup = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 1
}));

const WriteButtonGroup = styled(
  Box,
  shouldNotForwardProp('editing')
)<{ editing?: boolean }>(({ editing }) => ({
  display: editing ? 'flex' : 'none',
  paddingRight: '8px'
}));

const WriteButton = styled(
  IconButton,
  shouldNotForwardProp('editing')
)<{ editing?: boolean }>(({ editing }) => ({
  display: editing ? 'none' : 'block',
  padding: '14px',
  borderRadius: 'initial'
}));

const HandleButton = styled(IconButton)(() => ({
  padding: '8px 0'
}));

const DeleteButton = styled(IconButton)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  transform: 'translate(2px, -2px)',
  padding: 0
}));

const PointName = styled(Typography)(() => ({
  fontSize: '16px',
  display: 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontWeight: 'bold',
  '@media screen and (width <= 400px)': {
    width: '10rem'
  },
  '@media screen and (min-device-width:400px)': {
    width: '13rem'
  },
  '@media screen and (min-device-width:435px)': {
    width: '14rem'
  }
}));

const AddressName = styled(Typography)(() => ({
  fontSize: '12px',
  display: 'block',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '@media screen and (width <= 400px)': {
    width: '10rem'
  },
  '@media screen and (min-device-width:400px)': {
    width: '13rem'
  },
  '@media screen and (min-device-width:435px)': {
    width: '14rem'
  }
}));
