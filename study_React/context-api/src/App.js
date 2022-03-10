import "./App.css";
import ColorBox from "./Compontents/ColorBox";
import SelectColor from "./Compontents/SelectColors";
import { ColorProvider } from "./Contexts/color";

function App() {
  return (
    <ColorProvider>
      <div>
        <SelectColor />
        <ColorBox />
      </div>
    </ColorProvider>
  );
}

export default App;
