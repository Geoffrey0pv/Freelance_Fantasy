import {
    TASK_CREATE_REQUEST,
    TASK_CREATE_SUCCESS,
    TASK_CREATE_FAIL,
    TASK_LIST_REQUEST,
    TASK_LIST_SUCCESS,
    TASK_LIST_FAIL,
} from "@/constants/taskConstants";
import TaskService from "@/service/ultimateTaskService.js";

export const listTasks = (projectId) => async (dispatch) => {
    try {
        dispatch({ type: TASK_LIST_REQUEST });
        const data = await TaskService.getTasksByProjectId(projectId);
        dispatch({ type: TASK_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TASK_LIST_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const createTask = (milestoneId, taskData) => async (dispatch) => {
    try {
        dispatch({ type: TASK_CREATE_REQUEST });
        const data = await TaskService.createTask(milestoneId, taskData);
        dispatch({ type: TASK_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TASK_CREATE_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};