// actions/taskActions.js
import {
    TASK_LIST_REQUEST,
    TASK_LIST_SUCCESS,
    TASK_LIST_FAIL,
    TASK_CREATE_FAIL,
    TASK_CREATE_SUCCESS,
    TASK_CREATE_REQUEST,
    TASK_STATS_REQUEST, TASK_STATS_SUCCESS, TASK_STATS_FAIL
} from '../../constants/taskConstants.js';
import {
    MILESTONE_LIST_REQUEST,
    MILESTONE_LIST_SUCCESS,
    MILESTONE_LIST_FAIL,
} from '../../constants/milestoneConstants';
import ProjectService from "../../service/projectService";

export const listTasksByProject = (projectId) => async (dispatch) => {
    try {
        dispatch({ type: TASK_LIST_REQUEST });

        // Llamamos al servicio para obtener las tareas del proyecto
        const data = await ProjectService.getTasksByProjectId(projectId);

        dispatch({
            type: TASK_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: TASK_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const listMilestonesByProject = (projectId) => async (dispatch) => {
    try {
        dispatch({ type: MILESTONE_LIST_REQUEST });

        const data = await ProjectService.getMilestonesByProjectId(projectId);

        dispatch({
            type: MILESTONE_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: MILESTONE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};
export const createTask = (milestoneId, taskData) => async (dispatch) => {
    try {
        dispatch({ type: TASK_CREATE_REQUEST });

        const data = await ProjectService.createTask(milestoneId, taskData);

        dispatch({ type: TASK_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TASK_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
export const fetchTaskStatsByProject = (projectId) => async (dispatch) => {
    try {
        dispatch({ type: TASK_STATS_REQUEST });

        // Obtener todas las tareas del proyecto
        const data = await ProjectService.getTasksByProjectId(projectId);

        // Calcular estadísticas de estado
        const totalTasks = data.length;
        const completedTasks = data.filter(task => task.status === 'finalizado').length;
        const inProgressTasks = data.filter(task => task.status === 'en-proceso').length;
        const notStartedTasks = data.filter(task => task.status === 'por-empezar').length;

        // Calcular estadísticas de prioridad
        const highPriorityTasks = data.filter(task => task.priority === 'alta').length;
        const mediumPriorityTasks = data.filter(task => task.priority === 'media').length;
        const lowPriorityTasks = data.filter(task => task.priority === 'baja').length;

        // Dispatch con las estadísticas completas
        dispatch({
            type: TASK_STATS_SUCCESS,
            payload: {
                totalTasks,
                completedTasks,
                inProgressTasks,
                notStartedTasks,
                highPriorityTasks,
                mediumPriorityTasks,
                lowPriorityTasks
            },
        });
    } catch (error) {
        dispatch({
            type: TASK_STATS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};