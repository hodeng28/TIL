import React from 'react';
import './App.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel';


function App() {
  return (
    <div className="App">
      <Carousel>
        <button className="just">
          <h2>아침</h2>
        </button>
        <button className="just">
          <h2>점심</h2>
        </button>
        <button className="just">
          <h2>저녁</h2>
        </button>

      </Carousel>
    </div>
  );
}

export default App;
