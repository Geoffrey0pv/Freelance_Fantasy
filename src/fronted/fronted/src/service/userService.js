import axios from 'axios';
import { BASE_API_URL } from './apiConfig';

// Iniciar sesión
export const loginService = async (username, password) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const { data } = await axios.post(
            `${BASE_API_URL}/users/login/`,
            { username, password },
            config
        );
        return data; // Devuelve los datos del usuario y el token
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

// Registrar un nuevo usuario
export const registerService = async (username, email, password, accountType) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const { data } = await axios.post(
            `${BASE_API_URL}/users/register/`,
            {
                username,
                email,
                password,
                account_type: accountType, // Especifica el tipo de cuenta
            },
            config
        );
        return data; // Devuelve los datos del usuario registrado
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

// Inicio de sesión con Google
export const googleLoginService = async (accessToken) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const { data } = await axios.post(
            `${BASE_API_URL}/users/login/google/`,
            { access_token: accessToken },
            config
        );
        return data; // Devuelve el token y los datos del usuario
    } catch (error) {
        console.error('Error during Google login:', error);
        throw error;
    }
};

// Obtener información del usuario autenticado
export const getUserInfoService = async (token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Incluye el token de acceso
        },
    };

    try {
        const { data } = await axios.get(`${BASE_API_URL}/users/users/`, config);
        return data; // Devuelve la información del usuario
    } catch (error) {
        console.error('Error fetching user info:', error);
        throw error;
    }
};

// Actualizar el nombre de usuario
export const updateUsernameService = async (token, newUsername) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const { data } = await axios.put(
            `${BASE_API_URL}/users/update-username/`,
            { username: newUsername },
            config
        );
        return data; // Devuelve los datos actualizados
    } catch (error) {
        console.error('Error updating username:', error);
        throw error;
    }
};

// Actualizar roles de usuario
export const updateUserRolesService = async (token, isFreelancer, isClient) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const { data } = await axios.patch(
            `${BASE_API_URL}/users/update-roles/`,
            {
                is_freelancer: Boolean(isFreelancer),
                is_client: Boolean(isClient),
            },
            config
        );
        return data; // Devuelve los roles actualizados
    } catch (error) {
        console.error('Error updating user roles:', error);
        throw error;
    }
};

// Enviar correo para restablecer contraseña
export const sendPasswordResetEmail = async (email) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const { data } = await axios.post(
            `${BASE_API_URL}/users/reset-password/`,
            { email },
            config
        );
        return data; // Respuesta del servidor tras enviar el correo
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error;
    }
};

// Actualizar contraseña
export const updatePasswordService = async (resetToken, newPassword) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const { data } = await axios.put(
            `${BASE_API_URL}/users/update-password/`,
            {
                token: resetToken,
                password: newPassword,
            },
            config
        );
        return data; // Respuesta del servidor tras actualizar la contraseña
    } catch (error) {
        console.error('Error updating password:', error);
        throw error;
    }
};

// Obtener usuario por ID
export const getUserByIdService = async (userId) => {
    try {
        const { data } = await axios.get(`${BASE_API_URL}/users/${userId}/`);
        return data; // Devuelve los datos del usuario
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};
