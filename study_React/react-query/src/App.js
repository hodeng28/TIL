import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Homepage from "./Components/HomePage";
import RQSuperHeroesPages from "./Components/RQSuperHeroesPage";
import SuperHeroesPages from "./Components/SuperHeroesPage";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Traditional Super Heroes</Link>
            </li>
            <li>
              <Link to="/rq-super-heroes">RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/super-heroes" element={<SuperHeroesPages />} />
          <Route path="/rq-super-heroes" element={<RQSuperHeroesPages />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
