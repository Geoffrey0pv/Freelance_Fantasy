// apiConfig.js
const isDevelopment = import.meta.env.MODE === 'development';

// Define la base URL en función del entorno
export const BASE_API_URL = isDevelopment
  ? import.meta.env.VITE_APP_API_URL // URL de desarrollo
  : import.meta.env.VITE_APP_API_URL; // URL de producción
