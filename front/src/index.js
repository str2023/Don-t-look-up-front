import React from 'react';
import * as ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'react-datepicker/dist/react-datepicker.css';
import './fonts/GMARKETSANSTTFBOLD.TTF';
import './fonts/GMARKETSANSTTFLIGHT.TTF';
import './fonts/GMARKETSANSTTFMEDIUM.TTF';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <CssBaseline />
    <App />
  </>,
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
