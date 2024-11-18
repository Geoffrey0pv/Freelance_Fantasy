import {
  PROFILE_DETAILS_REQUEST, PROFILE_DETAILS_SUCCESS, PROFILE_DETAILS_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL,
  SKILLS_DETAILS_REQUEST, SKILLS_DETAILS_SUCCESS, SKILLS_DETAILS_FAIL, SKILLS_UPDATE_REQUEST, SKILLS_UPDATE_SUCCESS, SKILLS_UPDATE_FAIL,
  EXPERIENCE_DETAILS_REQUEST, EXPERIENCE_DETAILS_SUCCESS, EXPERIENCE_DETAILS_FAIL, EXPERIENCE_UPDATE_FAIL, EXPERIENCE_UPDATE_REQUEST, EXPERIENCE_UPDATE_SUCCESS, 
  EDUCATION_DETAILS_REQUEST, EDUCATION_DETAILS_SUCCESS, EDUCATION_DETAILS_FAIL, PORTFOLIO_DETAILS_REQUEST, PORTFOLIO_DETAILS_SUCCESS, PORTFOLIO_DETAILS_FAIL,
  PORTFOLIO_UPDATE_REQUEST, PORTFOLIO_UPDATE_SUCCESS, PORTFOLIO_UPDATE_FAIL,
  RATING_DETAILS_REQUEST, RATING_DETAILS_SUCCESS, RATING_DETAILS_FAIL, PROFILE_IMAGE_UPDATE_REQUEST,
  PROFILE_IMAGE_UPDATE_SUCCESS,PROFILE_IMAGE_UPDATE_FAIL,PROFILE_IMAGE_DETAILS_REQUEST,PROFILE_IMAGE_DETAILS_SUCCESS,
  PROFILE_IMAGE_DETAILS_FAIL, EDUCATION_UPDATE_REQUEST, EDUCATION_UPDATE_SUCCESS, EDUCATION_UPDATE_FAIL,
} from '../../constants/profileConstants';

import { 
  getProfileService, 
  updateUserProfileService, 
  getSkillsService, 
  getExperienceService, 
  getEducationService, 
  getPortfolioProjectsService, 
  getRatingService,
  getImageService,
  updateImageService,
  updateEducationService,
  updateExperienceService,
  updateSkillsService,
  updatePortfolioService,
} from '../../service/profileService'; // Importa los servicios correctos

// Acción para obtener el perfil completo del usuario
export const getUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_DETAILS_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const data = await getProfileService(userInfo.access);  // Llama al servicio para obtener el perfil completo

    dispatch({
      type: PROFILE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Acción para actualizar el perfil completo del usuario
export const updateUserProfile = (profileData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_UPDATE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const data = await updateUserProfileService(userInfo.access, profileData); // Cambiar a `updateUserProfileService`

    dispatch({
      type: PROFILE_UPDATE_SUCCESS,
      payload: data,
    });

    // Actualiza también los detalles del perfil después de la actualización
    dispatch({
      type: PROFILE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Acción para obtener la experiencia laboral del usuario
export const getUserExperience = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPERIENCE_DETAILS_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const data = await getExperienceService(userInfo.access);  // Llama al servicio para obtener la experiencia

    dispatch({
      type: EXPERIENCE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXPERIENCE_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Acción para obtener la educación del usuario
export const getUserEducation = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EDUCATION_DETAILS_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const data = await getEducationService(userInfo.access);  // Llama al servicio para obtener la educación

    dispatch({
      type: EDUCATION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDUCATION_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const updateEducation = (educationData) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDUCATION_UPDATE_REQUEST });
    const { userLogin: { userInfo } } = getState();

    const data = await updateEducationService(userInfo.access, educationData);
    dispatch({ type: EDUCATION_UPDATE_SUCCESS, payload: data });

    // También actualizamos el estado de educación en el store
    dispatch({ type: EDUCATION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: EDUCATION_UPDATE_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};

export const getUserPortfolioProjects = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PORTFOLIO_DETAILS_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const data = await getPortfolioProjectsService(userInfo.access);
    dispatch({ type: PORTFOLIO_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PORTFOLIO_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
export const updatePortfolio = (portfolioData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PORTFOLIO_UPDATE_REQUEST });

    // Obtener el token de autenticación del estado actual
    const { userLogin: { userInfo } } = getState();
    
    // Pasar el token al servicio junto con los datos del portafolio
    const updatedPortfolio = await updatePortfolioService(userInfo.access, portfolioData);

    dispatch({
      type: PORTFOLIO_UPDATE_SUCCESS,
      payload: updatedPortfolio,
    });

    // Actualizar también el estado del portafolio en el store
    dispatch({
      type: PORTFOLIO_DETAILS_SUCCESS,
      payload: updatedPortfolio,
    });
  } catch (error) {
    dispatch({
      type: PORTFOLIO_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


export const getUserRating = () => async (dispatch, getState) => {
  try {
    dispatch({ type: RATING_DETAILS_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const data = await getRatingService(userInfo.access);
    dispatch({ type: RATING_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: RATING_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getUserSkills = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SKILLS_DETAILS_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const data = await getSkillsService(userInfo.access);
    dispatch({ type: SKILLS_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SKILLS_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};

// Acción para actualizar la experiencia del usuario
export const updateExperience = (experienceData) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPERIENCE_UPDATE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const data = await updateExperienceService(userInfo.access, experienceData);

    dispatch({
      type: EXPERIENCE_UPDATE_SUCCESS,
      payload: data,
    });

    // Actualizamos el estado de experiencia en el store
    dispatch({
      type: EXPERIENCE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXPERIENCE_UPDATE_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


// Acción para actualizar habilidades
export const updateSkills = (skills) => async (dispatch, getState) => {
  try {
    dispatch({ type: SKILLS_UPDATE_REQUEST });
    const { userLogin: { userInfo } } = getState();

    const data = await updateSkillsService(userInfo.access, skills);

    dispatch({ type: SKILLS_UPDATE_SUCCESS, payload: data });

    // Actualiza también el estado de habilidades en el store
    dispatch({ type: SKILLS_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SKILLS_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Acción para actualizar las imágenes de perfil y portada
export const updateImage = (imageData) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_IMAGE_UPDATE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const data = await updateImageService(userInfo.access, imageData);

    dispatch({ 
      type: PROFILE_IMAGE_UPDATE_SUCCESS, 
      payload: data });

    dispatch({ 
      type: PROFILE_DETAILS_SUCCESS, 
      payload: { ...getState().profileDetails.userInfo, ...data } });

  } catch (error) {
    dispatch({
      type: PROFILE_IMAGE_UPDATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Acción para obtener las imágenes del perfil
export const getUserImages = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_IMAGE_DETAILS_REQUEST });
    const { userLogin: { userInfo } } = getState();
    const data = await getImageService(userInfo.access);  // Llama al servicio para obtener las imágenes
    dispatch({
      type: PROFILE_IMAGE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_IMAGE_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
