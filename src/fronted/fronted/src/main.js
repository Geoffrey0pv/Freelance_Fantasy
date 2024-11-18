import React from 'react';
import ReactDOM from 'react-dom/client';  // Change this import to use createRoot
import { Provider } from 'react-redux';
import store from './redux/store.jsx'; // Asegúrate de que el store esté correctamente configurado
import App from './App.jsx';

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <App />
);
