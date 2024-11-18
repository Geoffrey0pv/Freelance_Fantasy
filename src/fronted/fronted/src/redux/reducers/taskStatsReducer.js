import { TASK_STATS_REQUEST, TASK_STATS_SUCCESS, TASK_STATS_FAIL } from '../../constants/taskConstants';

const initialState = {
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    notStartedTasks: 0,
    highPriorityTasks: 0,
    mediumPriorityTasks: 0,
    lowPriorityTasks: 0,
    loading: false,
    error: null
};

export const taskStatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TASK_STATS_REQUEST:
            return { ...state, loading: true };
        case TASK_STATS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                loading: false,
            };
        case TASK_STATS_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};