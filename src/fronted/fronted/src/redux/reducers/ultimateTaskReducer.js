import {
    TASK_CREATE_REQUEST,
    TASK_CREATE_SUCCESS,
    TASK_CREATE_FAIL,
    TASK_LIST_REQUEST,
    TASK_LIST_SUCCESS,
    TASK_LIST_FAIL,
} from "@/constants/taskConstants.js";

export const taskListReducer = (state = { tasks: [] }, action) => {
    switch (action.type) {
        case TASK_LIST_REQUEST:
            return { loading: true, tasks: [] };
        case TASK_LIST_SUCCESS:
            return { loading: false, tasks: action.payload };
        case TASK_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const taskCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case TASK_CREATE_REQUEST:
            return { loading: true };
        case TASK_CREATE_SUCCESS:
            return { loading: false, success: true, task: action.payload };
        case TASK_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};