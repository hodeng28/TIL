import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from "react-dom";
import useAxios from "./useAxios";

const App = () => {
  const {loading, data, error} = useAxios({
    url: "https://yts.am/api/v2/list_movies.json"});
  return (
    <div className="App">
      <h1>하이</h1>
    </div>
  );
}
 
export default App;
