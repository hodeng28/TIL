import styled from '@emotion/styled';
import { Box, List, Stack, Typography } from '@mui/material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import React, { PropsWithChildren } from 'react';

interface PointListProps {
  pointList: StoryPoint[];
  onPointDragEnd: (sourceIndex: number, destinationIndex: number) => void;
}

const PointList = ({
  children,
  pointList
}: // onPointDragEnd
PropsWithChildren<PointListProps>) => {
  // const [selectedPoint, setSelectedPoint] = useState<StoryPoint>();

  // const handleDragEnd = ({ source, destination }: DropResult) => {
  //   if (!destination) {
  //     return;
  //   }

  //   onPointDragEnd(source.index, destination.index);
  // };

  // const handlePointEditClick = (point: StoryPoint) => {
  //   setSelectedPoint(point);
  // };

  return (
    <>
      <Wrapper>
        {pointList.length === 0 ? (
          <EmptyBox>
            <AddLocationWrapper>
              <AddLocationIcon />
            </AddLocationWrapper>
            <EmptyText color="gray">
              버튼을 눌러 포인트를 추가해보세요!
            </EmptyText>
          </EmptyBox>
        ) : (
          <PointListWrapper
          // ref={provided.innerRef}
          // {...provided.droppableProps}
          >
            {children}
            {/* {provided.placeholder} */}
          </PointListWrapper>
        )}
      </Wrapper>
    </>
  );
};

export default PointList;

const PointListWrapper = styled(List)(() => ({
  // position: 'absolute',
  bgcolor: 'background.paper',
  height: '100%',
  width: '100%',
  overflowY: 'scroll'
}));

const Wrapper = styled(Stack)(() => ({
  width: '100%',
  flex: '1 1 300px'
  // maxHeight: '300px'
}));

const AddLocationWrapper = styled(Stack)(() => ({
  justifyContent: 'center',
  alignItems: 'center',
  height: '3rem',
  width: '3rem',
  background: 'rgba(4, 146, 194, 0.8);',
  borderRadius: '50%'
}));

const AddLocationIcon = styled(AddLocationAltIcon)(() => ({
  color: 'rgba(255, 255, 255, 1)'
}));

const EmptyBox = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center'
}));

const EmptyText = styled(Typography)(() => ({
  marginLeft: '1rem'
}));
