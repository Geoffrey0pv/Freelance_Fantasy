import axios from "axios";

class TaskService {
    getToken() {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        return userInfo?.access || null;
    }

    async getTasksByProjectId(projectId) {
        const token = this.getToken();
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`http://127.0.0.1:8000/project/${projectId}/tasks/`, config);
        return response.data;
    }

    async createTask(milestoneId, taskData) {
        const token = this.getToken();
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.post(`http://127.0.0.1:8000/milestone/${milestoneId}/tasks/`, taskData, config);
        return response.data;
    }
}

export default new TaskService();
