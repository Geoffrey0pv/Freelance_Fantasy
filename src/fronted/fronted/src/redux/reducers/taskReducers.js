// reducers/taskReducers.js
import {
    TASK_LIST_REQUEST,
    TASK_LIST_SUCCESS,
    TASK_LIST_FAIL
} from '../../constants/taskConstants.js';

const initialState = {
    tasks: [],
    loading: false,
    error: null,
    stats: {
        totalTasks: 0,
        completedTasks: 0,
        inProgressTasks: 0,
        notStartedTasks: 0,
    },
};

export const taskListReducer = (state = initialState, action) => {
    switch (action.type) {
        case TASK_LIST_REQUEST:
            return { ...state, loading: true, tasks: [] };

        case TASK_LIST_SUCCESS: {
            const tasks = action.payload;

            // Calcula estadísticas
            const totalTasks = tasks.length;
            const completedTasks = tasks.filter(task => task.status === 'finalizado').length;
            const inProgressTasks = tasks.filter(task => task.status === 'en-proceso').length;
            const notStartedTasks = totalTasks - completedTasks - inProgressTasks;

            return {
                ...state,
                loading: false,
                tasks,
                stats: {
                    totalTasks,
                    completedTasks,
                    inProgressTasks,
                    notStartedTasks,
                },
            };
        }

        case TASK_LIST_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};