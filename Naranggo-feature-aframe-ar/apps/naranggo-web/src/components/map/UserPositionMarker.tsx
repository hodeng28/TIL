import React from 'react';
import Image from 'next/image';
import { styled } from '@mui/material/styles';

// 실제로 lat, lng를 전달받는 것이 아니라,
// google-map-react 라이브러리가 내부적으로 이용하는 매개변수이므로 no-unsed-vars 규칙을 끕니다.
const UserPositionMarker = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lat,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lng
}: MapCoordinate) => {
  return (
    <Wrapper>
      <Image
        src="/images/user_position.gif"
        alt="유저 위치"
        width="24px"
        height="24px"
      />
    </Wrapper>
  );
};

export default React.memo(UserPositionMarker);

const Wrapper = styled('div')(() => ({
  width: '24px',
  height: '24px',
  transform: 'translate(-50%, -50%)'
}));
