import { ColorConsumer } from "../Contexts/color";

const ColorBox = () => {
  return (
    // ColorContext 안에 들어있는 Consumer라는 컴포넌트롤 통해 색상을 조회
    <ColorConsumer>
      {({ state }) => (
        <>
          <div
            style={{
              width: "64px",
              height: "64px",
              background: state.color,
            }}
          ></div>
          <div
            style={{
              width: "32px",
              height: "32px",
              background: state.subcolor,
            }}
          ></div>
        </>
      )}
    </ColorConsumer>
  );
};

export default ColorBox;
