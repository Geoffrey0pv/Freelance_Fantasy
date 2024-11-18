import axios from "axios";

class MilestoneService {
    getToken() {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        return userInfo?.access || null;
    }

    async getMilestonesByProjectId(projectId) {
        const token = this.getToken();
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`http://127.0.0.1:8000/project/${projectId}/milestones/`, config);
        return response.data;
    }

    async createMilestone(projectId, milestoneData) {
        const token = this.getToken();
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.post(`http://127.0.0.1:8000/project/${projectId}/milestones/`, milestoneData, config);
        return response.data;
    }
}

export default new MilestoneService();
