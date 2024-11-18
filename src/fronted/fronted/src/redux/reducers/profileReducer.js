import {
  PROFILE_DETAILS_REQUEST,
  PROFILE_DETAILS_SUCCESS,
  PROFILE_DETAILS_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  SKILLS_DETAILS_REQUEST,
  SKILLS_DETAILS_SUCCESS,
  SKILLS_DETAILS_FAIL,
  SKILLS_UPDATE_REQUEST,
  SKILLS_UPDATE_SUCCESS,
  SKILLS_UPDATE_FAIL,
  EXPERIENCE_DETAILS_REQUEST,
  EXPERIENCE_DETAILS_SUCCESS,
  EXPERIENCE_DETAILS_FAIL,
  EXPERIENCE_UPDATE_REQUEST,
  EXPERIENCE_UPDATE_SUCCESS,
  EXPERIENCE_UPDATE_FAIL,
  EDUCATION_DETAILS_REQUEST,
  EDUCATION_DETAILS_SUCCESS,
  EDUCATION_DETAILS_FAIL,
  EDUCATION_UPDATE_REQUEST,
  EDUCATION_UPDATE_SUCCESS,
  EDUCATION_UPDATE_FAIL,
  PORTFOLIO_DETAILS_REQUEST,
  PORTFOLIO_DETAILS_SUCCESS,
  PORTFOLIO_DETAILS_FAIL,
  PORTFOLIO_UPDATE_REQUEST,
  PORTFOLIO_UPDATE_SUCCESS,
  PORTFOLIO_UPDATE_FAIL,
  RATING_DETAILS_REQUEST,
  RATING_DETAILS_SUCCESS,
  RATING_DETAILS_FAIL,
  PROFILE_IMAGE_UPDATE_REQUEST,
  PROFILE_IMAGE_UPDATE_SUCCESS,
  PROFILE_IMAGE_UPDATE_FAIL,
  PROFILE_IMAGE_DETAILS_REQUEST,
  PROFILE_IMAGE_DETAILS_SUCCESS,
  PROFILE_IMAGE_DETAILS_FAIL,
  } from '../../constants/profileConstants';
  
// Reducer para obtener detalles del perfil
export const profileDetailsReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case PROFILE_DETAILS_REQUEST:
      return { ...state, loading: true };
    case PROFILE_DETAILS_SUCCESS:
      return { loading: false, userInfo: action.payload };  // Cambia a `userInfo`
    case PROFILE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const experienceDetailsReducer = (state = { experience: [] }, action) => {
  switch (action.type) {
    case EXPERIENCE_DETAILS_REQUEST:
      return { loading: true, experience: [] };
    case EXPERIENCE_DETAILS_SUCCESS:
      return { loading: false, experience: action.payload };
    case EXPERIENCE_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case EXPERIENCE_UPDATE_REQUEST:
      return { ...state, loading: true };
    case EXPERIENCE_UPDATE_SUCCESS:
      return { ...state, loading: false, experience: action.payload };
    case EXPERIENCE_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};


// Reducer para educación
export const educationDetailsReducer = (state = { education: [] }, action) => {
  switch (action.type) {
    case EDUCATION_DETAILS_REQUEST:
      return { loading: true, education: [] };
    case EDUCATION_DETAILS_SUCCESS:
      return { loading: false, education: action.payload };
    case EDUCATION_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case EDUCATION_UPDATE_REQUEST:
      return { ...state, loading: true };
    case EDUCATION_UPDATE_SUCCESS:
      return { ...state, loading: false, education: action.payload };
    case EDUCATION_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const portfolioDetailsReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case PORTFOLIO_DETAILS_REQUEST:
      return { loading: true, projects: [] };
    case PORTFOLIO_DETAILS_SUCCESS:
      return { loading: false, projects: action.payload };
    case PORTFOLIO_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    // Maneja la actualización del portafolio
    case PORTFOLIO_UPDATE_REQUEST:
      return { ...state, loading: true };
    case PORTFOLIO_UPDATE_SUCCESS:
      return { loading: false, projects: action.payload };
    case PORTFOLIO_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
      
    default:
      return state;
  }
};

export const skillsDetailsReducer = (state = { skills: [] }, action) => {
  switch (action.type) {
    case SKILLS_DETAILS_REQUEST:
      return { loading: true, skills: [] };
    case SKILLS_DETAILS_SUCCESS:
      return { loading: false, skills: action.payload };
    case SKILLS_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case SKILLS_UPDATE_REQUEST:
      return { ...state, loading: true };
    case SKILLS_UPDATE_SUCCESS:
      return { ...state, loading: false, skills: action.payload };
    case SKILLS_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

// Reducer para calificaciones (rating)
export const ratingDetailsReducer = (state = { rating: null }, action) => {
  switch (action.type) {
    case RATING_DETAILS_REQUEST:
      return { loading: true, rating: null };
    case RATING_DETAILS_SUCCESS:
      return { loading: false, rating: action.payload };
    case RATING_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const profileImagesReducer = (state = { profileImage: null, coverImage: null }, action) => {
  switch (action.type) {
    case PROFILE_IMAGE_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PROFILE_IMAGE_DETAILS_SUCCESS:
      return { loading: false, profileImage: action.payload.profile_image, coverImage: action.payload.cover_image };
    case PROFILE_IMAGE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};