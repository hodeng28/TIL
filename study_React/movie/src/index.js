import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Hi from './hi';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Hi />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();