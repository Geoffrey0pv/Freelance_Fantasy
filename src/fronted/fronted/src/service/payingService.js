import axios from 'axios';
import { BASE_API_URL } from './apiConfig';

// Obtener todos los pagos asociados a un usuario
export const getPaymentsByUser = async (userId) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const { data } = await axios.get(`${BASE_API_URL}/payments/user/${userId}/`, config);
        return data; // Devuelve los pagos asociados al usuario
    } catch (error) {
        console.error('Error fetching payments by user:', error);
        throw error; // Propaga el error para manejo adicional
    }
};

// Crear un nuevo pago
export const createPayment = async (paymentDetails, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        const { data } = await axios.post(
            `${BASE_API_URL}/payments/`,
            paymentDetails,
            config
        );
        return data; // Devuelve los detalles del pago creado
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error; // Propaga el error para manejo adicional
    }
};

// Obtener detalles de un pago específico por su ID
export const getPaymentById = async (paymentId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        const { data } = await axios.get(`${BASE_API_URL}/payments/${paymentId}/`, config);
        return data; // Retorna los detalles del pago
    } catch (error) {
        console.error('Error fetching payment details:', error);
        throw error; // Propaga el error para manejo adicional
    }
};

// Actualizar un pago existente
export const updatePayment = async (paymentId, updatedDetails, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        const { data } = await axios.put(
            `${BASE_API_URL}/payments/${paymentId}/`,
            updatedDetails,
            config
        );
        return data; // Devuelve los detalles del pago actualizado
    } catch (error) {
        console.error('Error updating payment:', error);
        throw error; // Propaga el error para manejo adicional
    }
};

// Eliminar un pago
export const deletePayment = async (paymentId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        const { data } = await axios.delete(`${BASE_API_URL}/payments/${paymentId}/`, config);
        return data; // Devuelve la respuesta del servidor tras eliminar el pago
    } catch (error) {
        console.error('Error deleting payment:', error);
        throw error; // Propaga el error para manejo adicional
    }
};
