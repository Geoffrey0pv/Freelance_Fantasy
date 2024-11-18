import {
    MILESTONE_CREATE_REQUEST,
    MILESTONE_CREATE_SUCCESS,
    MILESTONE_CREATE_FAIL,
    MILESTONE_LIST_REQUEST,
    MILESTONE_LIST_SUCCESS,
    MILESTONE_LIST_FAIL,
} from "@/constants/milestoneConstants";

export const milestoneListReducer = (state = { milestones: [] }, action) => {
    switch (action.type) {
        case MILESTONE_LIST_REQUEST:
            return { loading: true, milestones: [] };
        case MILESTONE_LIST_SUCCESS:
            return { loading: false, milestones: action.payload };
        case MILESTONE_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const milestoneCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case MILESTONE_CREATE_REQUEST:
            return { loading: true };
        case MILESTONE_CREATE_SUCCESS:
            return { loading: false, success: true, milestone: action.payload };
        case MILESTONE_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};