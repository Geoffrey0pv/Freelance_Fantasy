import React from 'react';
import ReactDOM from 'react-dom/client';  // Change this import to use createRoot
import { Provider } from 'react-redux';
import store from './src/redux/store';
import App from './src/App';

// Create a root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
