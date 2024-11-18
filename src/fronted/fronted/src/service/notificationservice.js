import axios from 'axios';
import { BASE_API_URL } from './apiConfig';


const API_URL = `${BASE_API_URL}/notifications/`;

// Obtener todas las notificaciones del usuario autenticado
export const getNotifications = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(API_URL, config);
        return response.data; // Devuelve las notificaciones
    } catch (error) {
        console.error('Error obteniendo notificaciones:', error.response?.data || error.message);
        throw new Error('No se pudieron obtener las notificaciones.');
    }
};

const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
});

// Marcar una notificación como leída
export const markAsRead = async (token, notificationId) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        await axios.post(`${API_URL}${notificationId}/mark-as-read/`, {}, config);
    } catch (error) {
        console.error('Error marcando notificación como leída:', error.response?.data || error.message);
        throw new Error('No se pudo marcar la notificación como leída.');
    }
};

// Crear una nueva notificación (opcional para pruebas desde el frontend)
export const createNotification = async (token, data) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(API_URL, data, config);
        return response.data; // Devuelve la notificación creada
    } catch (error) {
        console.error('Error creando notificación:', error.response?.data || error.message);
        throw new Error('No se pudo crear la notificación.');
    }
};

export default axiosInstance;
