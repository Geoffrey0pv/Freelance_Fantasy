const initialState = { list: [], loading: false, error: null };

const notificationsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTIFICATIONS_REQUEST':
            return { ...state, loading: true };
        case 'NOTIFICATIONS_SUCCESS':
            return { ...state, loading: false, list: action.payload };
        case 'NOTIFICATIONS_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default notificationsReducer;

