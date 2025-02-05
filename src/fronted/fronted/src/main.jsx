import React from 'react';
import ReactDOM from 'react-dom/client';  // Change this import to use createRoot
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
