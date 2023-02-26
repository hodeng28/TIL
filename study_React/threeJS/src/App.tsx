import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Contents from "./Contents";

const App = () => {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <Contents />
      </Canvas>
    </Suspense>
  );
};

export default App;
