import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

// Verifica si el elemento con id "root" existe en el DOM
const rootElement = document.getElementById('root');
console.log(rootElement); // Debería mostrar el elemento en la consola. Si muestra null, hay un problema en tu HTML.

if (!rootElement) {
  throw new Error("No se encontró el elemento con id 'root'. Asegúrate de que el HTML tenga <div id='root'></div>.");
}

// Crear la raíz y renderizar la aplicación
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
