import { Route, Routes, BrowserRouter } from 'react-router-dom';
import NewsPage from './Pages/NewsPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:category?" component={NewsPage} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
