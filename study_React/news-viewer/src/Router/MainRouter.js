import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NewsPage from '../Pages/NewsPage';

const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewsPage />}>
          <Route path=":categoryName" element={<NewsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MainRouter;
