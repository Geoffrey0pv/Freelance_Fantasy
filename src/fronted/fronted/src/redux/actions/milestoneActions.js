import { MILESTONE_STATS_REQUEST, MILESTONE_STATS_SUCCESS, MILESTONE_STATS_FAIL } from '../../constants/milestoneConstants';
import ProjectService from '../../service/projectService';

export const fetchMilestoneStatsByProject = (projectId) => async (dispatch) => {
    try {
        dispatch({ type: MILESTONE_STATS_REQUEST });
        const data = await ProjectService.getMilestonesByProjectId(projectId);

        const totalMilestones = data.length;
        const completedMilestones = data.filter(milestone => milestone.status === 'terminado').length;
        const inProgressMilestones = data.filter(milestone => milestone.status === 'en-proceso').length;
        const notStartedMilestones = totalMilestones - completedMilestones - inProgressMilestones;

        dispatch({
            type: MILESTONE_STATS_SUCCESS,
            payload: { totalMilestones, completedMilestones, inProgressMilestones, notStartedMilestones },
        });
    } catch (error) {
        dispatch({
            type: MILESTONE_STATS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};