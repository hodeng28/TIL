import Point from '@/components/Card/PointCard';
import styled from '@emotion/styled';
import { ListItem } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';

interface PointListItemProps {
  index: number;
  point: StoryPoint;
  editing?: boolean;
  onPointEditClick: () => void;
  onPointDeleteClick: () => void;
  onPointRepresentativeClick?: (index: number) => void;
  onPointMoveClick?: (point: StoryPoint) => void;
}

const PointListItem = ({
  index,
  point,
  editing = false,
  onPointEditClick,
  onPointDeleteClick,
  onPointRepresentativeClick,
  onPointMoveClick
}: PointListItemProps) => (
  <Draggable draggableId={String(point.id)} index={index}>
    {(provided) => (
      <PointItemWrapper
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Point
          point={point}
          editing={editing}
          onPointEditClick={onPointEditClick}
          onPointDeleteClick={onPointDeleteClick}
        />
      </PointItemWrapper>
    )}
  </Draggable>
);

export default PointListItem;

const PointItemWrapper = styled(ListItem)(() => ({
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

// const PointItemButtonGroup = styled(Box)(() => ({
//   display: 'flex',
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'center'
// }));

// const PointItemButton = styled(Button)(() => ({
//   display: 'flex',
//   minWidth: '0px',
//   padding: 'initial',
//   alignItems: 'center',
//   justifyContent: 'center'
// }));

// const LocationIcon = styled(AddLocationIcon)(() => ({
//   fontSize: '2.5rem',
//   fill: 'rgba(4, 146, 194, 0.8);'
// }));
