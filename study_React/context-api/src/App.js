import "./App.css";
import ColorBox from "./Compontents/ColorBox";
import ColorContext from "./Contexts/color";

function App() {
  return (
    // App 에서 Provider를 사용 하면 Context의 value 변경 가능
    // value값을 꼭 명시해줘야함,
    <ColorContext.Provider value={{ color: "red" }}>
      <div>
        <ColorBox />
      </div>
    </ColorContext.Provider>
  );
}

export default App;
