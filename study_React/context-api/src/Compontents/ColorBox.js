import { useContext } from "react";
import ColorContext from "../Contexts/color";

const ColorBox = () => {
  // Consumer 대신 useContext Hooks 사용
  const { state } = useContext(ColorContext);
  return (
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
  );
};

export default ColorBox;

// import { ColorConsumer } from "../Contexts/color";

// const ColorBox = () => {

// children에 함수를 전달하는 Render Props 패턴
//   return (
//     // ColorContext 안에 들어있는 Consumer라는 컴포넌트롤 통해 색상을 조회
//     <ColorConsumer>
//       {({ state }) => (
//         <>
//           <div
//             style={{
//               width: "64px",
//               height: "64px",
//               background: state.color,
//             }}
//           ></div>
//           <div
//             style={{
//               width: "32px",
//               height: "32px",
//               background: state.subcolor,
//             }}
//           ></div>
//         </>
//       )}
//     </ColorConsumer>
//   );
// };

// export default ColorBox;
