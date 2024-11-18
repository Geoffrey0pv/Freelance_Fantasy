// reducers/milestoneReducers.js
import {
    MILESTONE_LIST_REQUEST,
    MILESTONE_LIST_SUCCESS,
    MILESTONE_LIST_FAIL
} from '../../constants/milestoneConstants';

const initialState = {
    milestones: [],
    loading: false,
    error: null,
    stats: {
        totalMilestones: 0,
        completedMilestones: 0,
        inProgressMilestones: 0,
        notStartedMilestones: 0,
    },
};

export const milestoneListReducer = (state = initialState, action) => {
    switch (action.type) {
        case MILESTONE_LIST_REQUEST:
            return { ...state, loading: true, milestones: [] };

        case MILESTONE_LIST_SUCCESS: {
            const milestones = action.payload;

            // Calcula estadísticas
            const totalMilestones = milestones.length;
            const completedMilestones = milestones.filter(milestone => milestone.status === 'terminado').length;
            const inProgressMilestones = milestones.filter(milestone => milestone.status === 'en-proceso').length;
            const notStartedMilestones = totalMilestones - completedMilestones - inProgressMilestones;

            return {
                ...state,
                loading: false,
                milestones,
                stats: {
                    totalMilestones,
                    completedMilestones,
                    inProgressMilestones,
                    notStartedMilestones,
                },
            };
        }

        case MILESTONE_LIST_FAIL:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};