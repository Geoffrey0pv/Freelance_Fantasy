import axios from 'axios';
import { BASE_API_URL } from './apiConfig';

class ProjectService {
    constructor() {
        this.baseUrl = BASE_API_URL; // Base API URL para mayor flexibilidad
    }

    // Método para obtener el token desde localStorage
    getToken() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));  // Extrae el objeto completo
        if (userInfo && userInfo.access) {
            return userInfo.access;  // Devuelve el token de acceso si está disponible
        }
        return null;  // Si no hay token, retorna null
    }

    // Método para obtener un proyecto por ID con token
    async getProjectById(id) {
        try {
            const token = this.getToken();  // Obtén el token de autenticación

            if (!token) {
                throw new Error('No token found');  // Lanza un error si no se encuentra el token
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,  // Añade el token en los encabezado
                }
            };

            // Realiza la solicitud con el token en los headers
            const response = await axios.get(`${this.baseUrl}project/${id}/`, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getProjectById:', error);
            throw error;
        }
    }

    // Método para hacer una oferta
    async postOffer(projectId, offerData) {
        try {
            const token = this.getToken();
            if (!token) {
                throw new Error('No token found');
            }
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            };

            console.log(`${this.baseUrl}project/${projectId}/offer/`)
            const response = await axios.post(`${this.baseUrl}project/${projectId}/offer/`, offerData, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService postOffer:', error);
            throw error;
        }
    }

    // Nuevo método para obtener la lista de proyectos con paginación y filtros
    async getProjects(page = 1, pageSize = 10, tag = '', location = '') {
        try {
            // Construir URL con los parámetros opcionales de filtro
            const url = `${this.baseUrl}projects/public/?page=${page}&page_size=${pageSize}&tag=${encodeURIComponent(tag)}&location=${encodeURIComponent(location)}`;

            // Realizar la solicitud GET sin necesidad de autenticación
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getPublicProjects:', error);
            throw error;
        }
    }

    // Crear proyecto
    async postProject(formData) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                },
            };

            const response = await axios.post(`${this.baseUrl}projects/create/`, formData, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService postProject:', error);
            throw error;
        }
    }

    // Obtener proyectos en los que el usuario trabaja
    async getWorkedProjects(page = 1, pageSize = 10) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            };

            const url = `${this.baseUrl}projects/worked/?page=${page}&page_size=${pageSize}`;
            const response = await axios.get(url, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getWorkedProjects:', error);
            throw error;
        }
    }

    // Obtener proyectos creados por el usuario
    async getOwnedProjects(page = 1, pageSize = 10) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            };

            const url = `${this.baseUrl}projects/owned/?page=${page}&page_size=${pageSize}`;
            const response = await axios.get(url, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getOwnedProjects:', error);
            throw error;
        }
    }

    // Obtener tareas de un proyecto
    async getTasksByProjectId(projectId) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            };
            const response = await axios.get(`${this.baseUrl}project/${projectId}/tasks/`, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getTasksByProjectId:', error);
            throw error;
        }
    }

    // Obtener hitos de un proyecto
    async getMilestonesByProjectId(projectId) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            };

            const response = await axios.get(`${this.baseUrl}project/${projectId}/milestones/`, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getMilestonesByProjectId:', error);
            throw error;
        }
    }

    // Crear tarea para un hito
    async createTask(milestoneId, taskData) {
        const token = this.getToken();
        if (!token) throw new Error('No token found');

        const config = {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        };

        const response = await axios.post(`${this.baseUrl}milestone/${milestoneId}/tasks/`, taskData, config);
        return response.data;
    }

    // Actualizar estado de tarea
    async updateTaskStatus(taskId, newStatus) {
        const token = this.getToken();
        if (!token) throw new Error('No token found');

        const config = {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        };

        const data = { status: newStatus };
        const response = await axios.patch(`${this.baseUrl}project/tasks/${taskId}/`, data, config);
        return response.data;
    }

    // Obtener costo de proyecto
    async getProjectCost(projectId) {
        const token = this.getToken();
        if (!token) throw new Error('No token found');

        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };

        const response = await axios.get(`${this.baseUrl}project/${projectId}/cost/`, config);
        return response.data;
    }

    // Obtener comentarios de un proyecto
    async getProjectComments(projectId) {
        const token = this.getToken();
        if (!token) throw new Error('No token found');

        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };
        const response = await axios.get(`${this.baseUrl}project/${projectId}/comments/`, config);
        return response.data;
    }

    // Crear comentario para un proyecto
    async postProjectComment(projectId, commentData) {
        const token = this.getToken();
        if (!token) throw new Error('No token found');

        const config = {
            headers: { 'Authorization': `Bearer ${token}` }
        };
        const response = await axios.post(`${this.baseUrl}project/${projectId}/comments/`, commentData, config);
        return response.data;
    }

    // Otros métodos de comentarios y operaciones de proyectos...
}

export default new ProjectService();
