import ProjectService from '../../service/projectService.js'
import {
    PROJECT_DETAILS_REQUEST,
    PROJECT_DETAILS_SUCCESS,
    PROJECT_DETAILS_FAIL,
    PROJECT_OFFER_REQUEST,
    PROJECT_OFFER_SUCCESS,
    PROJECT_OFFER_FAIL,
    PROJECT_LIST_REQUEST,
    PROJECT_LIST_SUCCESS,
    PROJECT_LIST_FAIL,
    PROJECT_CREATE_REQUEST,
    PROJECT_CREATE_SUCCESS,
    PROJECT_CREATE_FAIL,
    PROJECT_OWNED_LIST_REQUEST,
    PROJECT_OWNED_LIST_SUCCESS,
    PROJECT_OWNED_LIST_FAIL,
    PROJECT_WORKING_LIST_REQUEST,
    PROJECT_WORKING_LIST_SUCCESS,
    PROJECT_WORKING_LIST_FAIL,
    PROJECT_COMMENTS_REQUEST,
    PROJECT_COMMENTS_SUCCESS,
    PROJECT_COMMENTS_FAIL,
    MILESTONE_COMMENTS_REQUEST,
    MILESTONE_COMMENTS_SUCCESS,
    MILESTONE_COMMENTS_FAIL,
    TASK_COMMENTS_REQUEST,
    TASK_COMMENTS_SUCCESS,
    TASK_COMMENTS_FAIL,
    ADD_PROJECT_COMMENT_REQUEST,
    ADD_PROJECT_COMMENT_SUCCESS,
    ADD_PROJECT_COMMENT_FAIL,
    ADD_MILESTONE_COMMENT_REQUEST,
    ADD_MILESTONE_COMMENT_SUCCESS,
    ADD_MILESTONE_COMMENT_FAIL,
    ADD_TASK_COMMENT_REQUEST,
    ADD_TASK_COMMENT_SUCCESS,
    ADD_TASK_COMMENT_FAIL,
} from "../../constants/projectConstants.js";

export const listProductDetails = (id_product) => async (dispatch) => {
    try {
        dispatch({type: PROJECT_DETAILS_REQUEST});

        const data = await ProjectService.getProjectById(id_product);

        dispatch({
            type: PROJECT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PROJECT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
}
export const createProjectOffer = (projectId, offerData) => async (dispatch) => {
    try {
        dispatch({ type: PROJECT_OFFER_REQUEST });

        const currentDate = new Date().toISOString();

        const updatedOfferData = {
            ...offerData,
            date_submission: currentDate,
        };
        const data = await ProjectService.postOffer(projectId, updatedOfferData);

        dispatch({
            type: PROJECT_OFFER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PROJECT_OFFER_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
// Acción para obtener la lista de proyectos con paginación
export const listProjects = (page = 1, pageSize = 10, tag = '', location = '') => async (dispatch) => {
    try {
      dispatch({ type: PROJECT_LIST_REQUEST });
  
      const data = await ProjectService.getProjects(page, pageSize, tag, location);
  
      dispatch({
        type: PROJECT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PROJECT_LIST_FAIL,
        payload: error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      });
    }
  };
  

export const createProject = (formData) => async (dispatch) => {
    try {
        dispatch({ type: PROJECT_CREATE_REQUEST });

        const data = await ProjectService.postProject(formData);

        dispatch({
            type: PROJECT_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PROJECT_CREATE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
};
// actions/projectActions.js

// Acción para obtener los proyectos creados por el usuario
export const listOwnedProjects = () => async (dispatch) => {
    try {
        dispatch({ type: PROJECT_OWNED_LIST_REQUEST });
        const data = await ProjectService.getOwnedProjects(1, 10);
        dispatch({
            type: PROJECT_OWNED_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PROJECT_OWNED_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};

// Acción para obtener los proyectos en los que trabaja el usuario
export const listWorkingProjects = () => async (dispatch) => {
    try {
        dispatch({ type: PROJECT_WORKING_LIST_REQUEST });
        const data = await ProjectService.getWorkedProjects(1, 10);
        dispatch({
            type: PROJECT_WORKING_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PROJECT_WORKING_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        });
    }
};
// Acción para obtener comentarios de un proyecto
export const listProjectComments = (projectId) => async (dispatch) => {
    try {
        dispatch({ type: PROJECT_COMMENTS_REQUEST });
        const data = await ProjectService.getProjectComments(projectId);
        dispatch({ type: PROJECT_COMMENTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: PROJECT_COMMENTS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Acción para obtener comentarios de un milestone
export const listMilestoneComments = (milestoneId) => async (dispatch) => {
    try {
        dispatch({ type: MILESTONE_COMMENTS_REQUEST });
        const data = await ProjectService.getMilestoneComments(milestoneId);
        dispatch({ type: MILESTONE_COMMENTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: MILESTONE_COMMENTS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Acción para obtener comentarios de una tarea
export const listTaskComments = (taskId) => async (dispatch) => {
    try {
        dispatch({ type: TASK_COMMENTS_REQUEST });
        const data = await ProjectService.getTaskComments(taskId);
        dispatch({ type: TASK_COMMENTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: TASK_COMMENTS_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};
// Function to add a comment to a project
export const postProjectComment = (projectId, commentData) => async (dispatch) => {
    try {
        dispatch({ type: ADD_PROJECT_COMMENT_REQUEST });
        const data = await ProjectService.postProjectComment(projectId, commentData);
        dispatch({ type: ADD_PROJECT_COMMENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADD_PROJECT_COMMENT_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Function to add a comment to a milestone
export const postMilestoneComment = (milestoneId, commentData) => async (dispatch) => {
    try {
        dispatch({ type: ADD_MILESTONE_COMMENT_REQUEST });
        const data = await ProjectService.postMilestoneComment(milestoneId, commentData);
        dispatch({ type: ADD_MILESTONE_COMMENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADD_MILESTONE_COMMENT_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};

// Function to add a comment to a task
export const postTaskComment = (taskId, commentData) => async (dispatch) => {
    try {
        dispatch({ type: ADD_TASK_COMMENT_REQUEST });
        const data = await ProjectService.postTaskComment(taskId, commentData);
        dispatch({ type: ADD_TASK_COMMENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADD_TASK_COMMENT_FAIL,
            payload: error.response?.data?.message || error.message,
        });
    }
};