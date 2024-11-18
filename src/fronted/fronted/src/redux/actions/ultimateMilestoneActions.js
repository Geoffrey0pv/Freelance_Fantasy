import {
    MILESTONE_CREATE_REQUEST,
    MILESTONE_CREATE_SUCCESS,
    MILESTONE_CREATE_FAIL,
    MILESTONE_LIST_REQUEST,
    MILESTONE_LIST_SUCCESS,
    MILESTONE_LIST_FAIL,
} from "@/constants/milestoneConstants";
import MilestoneService from "@/service/ultimateMilestoneService";

export const listMilestones = (projectId) => async (dispatch) => {
    try {
        dispatch({ type: MILESTONE_LIST_REQUEST });
        const data = await MilestoneService.getMilestonesByProjectId(projectId);
        dispatch({ type: MILESTONE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: MILESTONE_LIST_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const createMilestone = (projectId, milestoneData) => async (dispatch) => {
    try {
        dispatch({ type: MILESTONE_CREATE_REQUEST });
        const data = await MilestoneService.createMilestone(projectId, milestoneData);
        dispatch({ type: MILESTONE_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: MILESTONE_CREATE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
