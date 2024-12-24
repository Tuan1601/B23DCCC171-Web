import React from 'react';
import ReactDOM from 'react-dom/client'; // Sử dụng 'react-dom/client' thay vì 'react-dom'
import App from './App';
import './styles/global.scss';

// Tạo root và render ứng dụng
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
