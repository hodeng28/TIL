import React from 'react';
import './App.css';
import Header from './Components/Header';
import Main from './Components/Main';
import { Helmet } from 'react-helmet';


function App() {
  return (
    <>
      <Helmet>
        <title>asterbucks</title>
      </Helmet>
      <Header />
      <Main />
    </>
  );
}
export default App;
