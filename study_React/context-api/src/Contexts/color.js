import { createContext, useState } from "react";

// createContext  파라미터에는 해당 Context의 기본 상태를 지정
const ColorContext = createContext({
  state: { color: "black", subcolor: "red" },
  action: {
    setColor: () => {},
    setSubcolor: () => {},
  },
});

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState("black");
  const [subcolor, setSubcolor] = useState("red");

  // 상태는 state로, 업데이트 함수는 action으로 묶어서 전달
  const value = {
    state: { color, subcolor },
    action: { setColor, setSubcolor },
  };
  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

const { Consumer: ColorConsumer } = ColorContext;

export { ColorProvider, ColorConsumer };

export default ColorContext;
