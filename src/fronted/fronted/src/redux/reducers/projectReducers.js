import {
    PROJECT_LIST_REQUEST,
    PROJECT_LIST_SUCCESS,
    PROJECT_LIST_FAIL,
    PROJECT_DETAILS_REQUEST,
    PROJECT_DETAILS_SUCCESS,
    PROJECT_DETAILS_FAIL,
    PROJECT_OFFER_REQUEST,
    PROJECT_OFFER_SUCCESS,
    PROJECT_OFFER_FAIL,

    PROJECT_CREATE_REQUEST,
    PROJECT_CREATE_SUCCESS,
    PROJECT_CREATE_RESET,
    PROJECT_CREATE_FAIL,

    PROJECT_OWNED_LIST_SUCCESS,
    PROJECT_OWNED_LIST_REQUEST,
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
} from "@/constants/projectConstants.js";


const initialState = {
    projects: [],  // Para la lista de proyectos paginada
    project: { reviews: [] },  // Para los detalles de un proyecto
    loading: false,
    error: null,
};

// Reducer para la lista de proyectos paginados
export const projectListReducer = (state = { projects: [] }, action) => {
    switch (action.type) {
        case PROJECT_LIST_REQUEST:
            return { ...state, loading: true };
        case PROJECT_LIST_SUCCESS:
            return { ...state, loading: false, projects: action.payload.results, pagination: action.payload };  // Guardar los datos paginados
        case PROJECT_LIST_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

// Reducer para los detalles del proyecto
export const projectDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROJECT_DETAILS_REQUEST:
            return { ...state, loading: true };
        case PROJECT_DETAILS_SUCCESS:
            return { ...state, loading: false, project: action.payload };
        case PROJECT_DETAILS_FAIL:
            return { ...state, loading: false, error: action.payload };

        case PROJECT_OFFER_REQUEST:
            return { ...state, loading: true };
        case PROJECT_OFFER_SUCCESS:
            return { ...state, loading: false, offer: action.payload };
        case PROJECT_OFFER_FAIL:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
// Reducer para la creación de un nuevo proyecto
export const projectCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PROJECT_CREATE_REQUEST:
            return { loading: true };
        case PROJECT_CREATE_SUCCESS:
            return { loading: false, success: true, project: action.payload };
        case PROJECT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case PROJECT_CREATE_RESET:
            return {};
        default:
            return state;
    }
};
export const projectOwnedListReducer = (state = { projects: [] }, action) => {
    switch (action.type) {
        case PROJECT_OWNED_LIST_REQUEST:
            return { loading: true, projects: [] };
        case PROJECT_OWNED_LIST_SUCCESS:
            return { loading: false, projects: action.payload.results };
        case PROJECT_OWNED_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const projectWorkingListReducer = (state = { projects: [] }, action) => {
    switch (action.type) {
        case PROJECT_WORKING_LIST_REQUEST:
            return { loading: true, projects: [] };
        case PROJECT_WORKING_LIST_SUCCESS:
            return { loading: false, projects: action.payload.results };
        case PROJECT_WORKING_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
// Reducer para comentarios de proyecto
export const projectCommentsReducer = (state = { comments: [] }, action) => {
    switch (action.type) {
        case PROJECT_COMMENTS_REQUEST:
            return { loading: true, comments: [] };
        case PROJECT_COMMENTS_SUCCESS:
            return { loading: false, comments: action.payload };
        case PROJECT_COMMENTS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Reducer para comentarios de milestone
export const milestoneCommentsReducer = (state = { comments: [] }, action) => {
    switch (action.type) {
        case MILESTONE_COMMENTS_REQUEST:
            return { loading: true, comments: [] };
        case MILESTONE_COMMENTS_SUCCESS:
            return { loading: false, comments: action.payload };
        case MILESTONE_COMMENTS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// Reducer para comentarios de tarea
export const taskCommentsReducer = (state = { comments: [] }, action) => {
    switch (action.type) {
        case TASK_COMMENTS_REQUEST:
            return { loading: true, comments: [] };
        case TASK_COMMENTS_SUCCESS:
            return { loading: false, comments: action.payload };
        case TASK_COMMENTS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};