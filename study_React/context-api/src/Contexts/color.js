import { createContext } from "react";

const ColorContext = createContext({ color: "black" });
// createContext  파라미터에는 해당 Context의 기본 상태를 지정

export default ColorContext;
