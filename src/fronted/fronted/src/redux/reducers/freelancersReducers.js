import {
  FREELANCERS_LIST_REQUEST,
  FREELANCERS_LIST_SUCCESS,
  FREELANCERS_LIST_FAIL,
} from '../../constants/freelancerConstants';

const initialState = {
  freelancers: [],
  loading: false,
  error: null,
};

export const freelancersListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FREELANCERS_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case FREELANCERS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        freelancers: action.payload,
      };
    case FREELANCERS_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
