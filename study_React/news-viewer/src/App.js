import { useCallback, useState } from 'react';
import './App.css';
import NewsCateogory from './Components/NewsCategory';
import NewsList from './Components/NewsList';

const App = () => {
  const [category, setCategory] = useState('all');
  const onSelect = useCallback((category) => setCategory(category), []);
  return (
    <>
      <NewsCateogory category={category} onSelect={onSelect} />
      <NewsList category={category} />;
    </>
  );
};

export default App;
