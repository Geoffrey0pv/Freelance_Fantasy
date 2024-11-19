// apiConfig.js
const isDevelopment = import.meta.env.MODE === 'development';

// Define la base URL en función del entorno
export const BASE_API_URL = "freelancefantasy-backend-dfbte3d4f0csd5bc.westus-01.azurewebsites.net";

// isDevelopment ? import.meta.env.VITE_API_BASE_URL_LOCAL : import.meta.env.VITE_API_BASE_URL_PROD; // URL de producción
