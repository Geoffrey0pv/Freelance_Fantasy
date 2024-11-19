// apiConfig.js
const isDevelopment = import.meta.env.MODE === 'development';

// Define la base URL en función del entorno
export const BASE_API_URL = isDevelopment
  ? import.meta.env.VITE_API_BASE_URL_LOCAL // URL de desarrollo
  : import.meta.env.VITE_API_BASE_URL_PROD; // URL de producción
