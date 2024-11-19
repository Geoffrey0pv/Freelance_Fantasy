    import axios from 'axios';

    class ProjectService {
        constructor() {
            this.baseUrl = 'http://127.0.0.1:8000/';
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
                        'Authorization': `Bearer ${token}`,  // Añade el token en el encabezado
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

                const response = await axios.post(`http://127.0.0.1:8000/projects/create/`, formData, config);
                return response.data;
            } catch (error) {
                console.error('Error in ProjectService postProject:', error);
                throw error;
            }
        }
    // Servicio para obtener proyectos en los que el usuario activo trabaja
    async getWorkedProjects(page = 1, pageSize = 10) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            };

            const url = `http://127.0.0.1:8000/projects/worked/?page=${page}&page_size=${pageSize}`;
            const response = await axios.get(url, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getWorkedProjects:', error);
            throw error;
        }
    }

    // Servicio para obtener proyectos creados por el usuario activo
    async getOwnedProjects(page = 1, pageSize = 10) {
        try {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            };

            const url = `http://127.0.0.1:8000/projects/owned/?page=${page}&page_size=${pageSize}`;
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
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            };
            const response = await axios.get(`http://127.0.0.1:8000/project/${projectId}/tasks/`, config);
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
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            };

            const response = await axios.get(`http://127.0.0.1:8000/project/${projectId}/milestones/`, config);
            return response.data;
        } catch (error) {
            console.error('Error in ProjectService getMilestonesByProjectId:', error);
            throw error;
        }
    }
    async createTask(milestoneId, taskData) {
        const token = this.getToken();
        if (!token) throw new Error('No token found');

        const config = {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        };

        const response = await axios.post(`http://127.0.0.1:8000/milestone/${milestoneId}/tasks/`, taskData, config);
        return response.data;
    }
    async updateTaskStatus(taskId, newStatus) {
        const token = this.getToken();
        if (!token) throw new Error('No token found');

        const config = {
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        };

        const data = { status: newStatus };
        const response = await axios.patch(`http://127.0.0.1:8000/project/tasks/${taskId}/`, data, config);
        return response.data;
    }
    async getProjectCost(projectId) {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            };

            const response = await axios.get(`http://127.0.0.1:8000/project/${projectId}/cost/`, config);
            return response.data;
        }
        // Obtener comentarios de un proyecto
        async getProjectComments(projectId) {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            };
            const response = await axios.get(`http://127.0.0.1:8000/project/${projectId}/comments/`, config);
            return response.data;
        }

        // Crear comentario para un proyecto
        async postProjectComment(projectId, commentData) {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            };
            const response = await axios.post(`http://127.0.0.1:8000/project/${projectId}/comments/`, commentData, config);
            return response.data;
        }

        // Obtener comentarios de un milestone
        async getMilestoneComments(milestoneId) {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            };
            const response = await axios.get(`http://127.0.0.1:8000/milestone/${milestoneId}/comments/`, config);
            return response.data;
        }

        // Crear comentario para un milestone
        async postMilestoneComment(milestoneId, commentData) {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            };
            const response = await axios.post(`http://127.0.0.1:8000/milestone/${milestoneId}/comments/`, commentData, config);
            return response.data;
        }

        // Obtener comentarios de una tarea
        async getTaskComments(taskId) {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            };
            const response = await axios.get(`http://127.0.0.1:8000/task/${taskId}/comments/`, config);
            return response.data;
        }

        // Crear comentario para una tarea
        async postTaskComment(taskId, commentData) {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            };
            const response = await axios.post(`http://127.0.0.1:8000/task/${taskId}/comments/`, commentData, config);
            return response.data;
        }

        async acceptOffer(offerId) {
            const token = this.getToken();
            if (!token) throw new Error('No token found');

            const config = {
                headers: { 'Authorization': `Bearer ${token}` }
            };
            const response = await axios.post(`http://127.0.0.1:8000/task/${taskId}/comments/`, commentData, config);
            return response.data;
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
                    headers: { 'Authorization': `Bearer ${token}` }
                };
    
                const response = await axios.get(`http://127.0.0.1:8000/projects/workerOffer/${workerId}/`, config); 
                console.log(response.data)
                return response.data; // Devuelve los proyectos
            } catch (error) {
                console.error('Error fetching projects:', error);
                throw error; // Manejo del error
            }
        }


}

export default new ProjectService();
