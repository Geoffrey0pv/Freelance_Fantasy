import axios from 'axios';
import { BASE_API_URL } from './apiConfig';

class ProjectService {
    constructor() {
        this.baseUrl = BASE_API_URL; // Usa una URL dinámica que puede configurarse desde variables de entorno
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
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` },
            };

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
            if (!token) throw new Error('No token found');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const response = await axios.post(`${this.baseUrl}project/${projectId}/offer/`, offerData, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService postOffer:', error);
            throw error;
        }
    }

    // Método para obtener la lista de proyectos con paginación y filtros
    async getProjects(page = 1, pageSize = 10, tag = '', location = '') {
        try {
            const url = `${this.baseUrl}projects/public/?page=${page}&page_size=${pageSize}&tag=${encodeURIComponent(tag)}&location=${encodeURIComponent(location)}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getProjects:', error);
            throw error;
        }
    }

    async postProject(formData) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };

            const response = await axios.post(`${this.baseUrl}projects/create/`, formData, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService postProject:', error);
            throw error;
        }
    }

    async getWorkedProjects(page = 1, pageSize = 10) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` },
            };

            const url = `${this.baseUrl}projects/worked/?page=${page}&page_size=${pageSize}`;
            const response = await axios.get(url, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getWorkedProjects:', error);
            throw error;
        }
    }

    async getOwnedProjects(page = 1, pageSize = 10) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` },
            };

            const url = `${this.baseUrl}projects/owned/?page=${page}&page_size=${pageSize}`;
            const response = await axios.get(url, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getOwnedProjects:', error);
            throw error;
        }
    }

    async getTasksByProjectId(projectId) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` },
            };

            const response = await axios.get(`${this.baseUrl}project/${projectId}/tasks/`, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getTasksByProjectId:', error);
            throw error;
        }
    }

    async getMilestonesByProjectId(projectId) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` },
            };

            const response = await axios.get(`${this.baseUrl}project/${projectId}/milestones/`, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getMilestonesByProjectId:', error);
            throw error;
        }
    }

    async createTask(milestoneId, taskData) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const response = await axios.post(`${this.baseUrl}milestone/${milestoneId}/tasks/`, taskData, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService createTask:', error);
            throw error;
        }
    }
    // Método para obtener el token desde localStorage
    getToken() {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo.access) {
            return userInfo.access; // Devuelve el token si existe
        }
        return null; // Si no hay token, retorna null
    }

    async updateTaskStatus(taskId, newStatus) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const data = { status: newStatus };
            const response = await axios.patch(`${this.baseUrl}project/tasks/${taskId}/`, data, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService updateTaskStatus:', error);
            throw error;
        }
    }

    async getProjectCost(projectId) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` },
            };

            const response = await axios.get(`${this.baseUrl}project/${projectId}/cost/`, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getProjectCost:', error);
            throw error;
        }
    }

    async getProjectComments(projectId) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` },
            };

            const response = await axios.get(`${this.baseUrl}project/${projectId}/comments/`, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getProjectComments:', error);
            throw error;
        }
    }

    async postProjectComment(projectId, commentData) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` },
            };

            const response = await axios.post(`${this.baseUrl}project/${projectId}/comments/`, commentData, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService postProjectComment:', error);
            throw error;
        }
    }

    async getMilestoneComments(milestoneId) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` },
            };

            const response = await axios.get(`${this.baseUrl}milestone/${milestoneId}/comments/`, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getMilestoneComments:', error);
            throw error;
        }
    }

    async postMilestoneComment(milestoneId, commentData) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` },
            };

            const response = await axios.post(`${this.baseUrl}milestone/${milestoneId}/comments/`, commentData, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService postMilestoneComment:', error);
            throw error;
        }
    }

    async getTaskComments(taskId) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` },
            };

            const response = await axios.get(`${this.baseUrl}task/${taskId}/comments/`, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getTaskComments:', error);
            throw error;
        }
    }

    async postTaskComment(taskId, commentData) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` },
            };

            const response = await axios.post(`${this.baseUrl}task/${taskId}/comments/`, commentData, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService postTaskComment:', error);
            throw error;
        }
    }

    async acceptOffer(offerId) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` },
            };

            const response = await axios.post(`${this.baseUrl}offers/${offerId}/accept/`, {}, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService acceptOffer:', error);
            throw error;
        }
    }

    async updateOffer(projectId, offerId, offerData) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            };

            const url = `${this.baseUrl}project/${projectId}/offer/${offerId}/update/`;

            const response = await axios.put(url, offerData, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService updateOffer:', error);
            throw error;
        }
    }

    async getProjectsByWorkerOffer(workerId) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` },
            };

            const response = await axios.get(`${this.baseUrl}projects/workerOffer/${workerId}/`, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getProjectsByWorkerOffer:', error);
            throw error;
        }

    } 
}

export default new ProjectService();
