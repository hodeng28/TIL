import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Homepage from "./Components/HomePage";
import RQSuperHeroesPages from "./Components/RQSuperHeroesPage";
import SuperHeroesPages from "./Components/SuperHeroesPage";

const MainRouter = () => {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/super-heroes">Super Heroes</Link>
            </li>
            <li>
              <Link to="/query-super-heroes">RQ Super Heroes</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/super-heroes" element={<SuperHeroesPages />} />
          <Route path="/query-super-heroes" element={<RQSuperHeroesPages />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default MainRouter;
