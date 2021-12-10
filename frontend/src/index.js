import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import Routes from './Routes';
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <>
    <ToastContainer
      position="top-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Routes />
  </>,
  document.getElementById('unicomm-root')
);