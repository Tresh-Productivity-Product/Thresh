import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import './style.css';
import { BrowserRouter } from 'react-router-dom';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
