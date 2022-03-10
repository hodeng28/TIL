const { default: ColorContext } = require("../Contexts/color");

const ColorBox = () => {
  return (
    // ColorContext 안에 들어있는 Consumer라는 컴포넌트롤 통해 색상을 조회
    <ColorContext.Consumer>
      {(value) => (
        <div
          style={{
            width: "64px",
            height: "64px",
            background: value.color,
          }}
        ></div>
      )}
    </ColorContext.Consumer>
  );
};

export default ColorBox;
