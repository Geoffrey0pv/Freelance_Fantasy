import axios from 'axios';
import { BASE_API_URL } from './apiConfig';

// Servicio para obtener el perfil completo del usuario
export const getProfileService = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.get(`${BASE_API_URL}/users/profile/`, config);
  return data;
};

// Servicio para actualizar el username
export const updateUsernameService = async (token, newUsername) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${BASE_API_URL}/users/update-username/`,
    { username: newUsername },
    config
  );
  return response.data;
};

// Servicio para actualizar la contraseña
export const updatePasswordService = async (token, newPassword) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await axios.put(
    `${BASE_API_URL}/users/update-password/`,
    { password: newPassword },
    config
  );
  return response.data;
};

// Servicio para actualizar el perfil (país, ciudad, número de teléfono, etc.) (PUT)
export const updateUserProfileService = async (token, profileData) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.put(`${BASE_API_URL}/users/update-profile/`, profileData, config);
  return response.data;
};

// Servicio para obtener las habilidades del perfil (GET)
export const getSkillsService = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.get(`${BASE_API_URL}/profile/skills/`, config);
  return data;
};

// Servicio para crear nuevas habilidades (POST)
export const createSkillsService = async (token, skills) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.post(`${BASE_API_URL}/profile/skills/`, { skills }, config);
  return data;
};

// Servicio para actualizar habilidades existentes (POST)
export const updateSkillsService = async (token, skillData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const responses = [];
  for (const skill of skillData) {
    try {
      const { data } = await axios.post(`${BASE_API_URL}/profile/skills/`, skill, config);
      responses.push(data);
    } catch (error) {
      console.error(`Error al enviar la habilidad ${JSON.stringify(skill)}:`, error.response?.data || error.message);
      throw error;
    }
  }

  return responses;
};

// Servicio para obtener la experiencia del perfil (GET)
export const getExperienceService = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.get(`${BASE_API_URL}/profile/experiences/`, config);
  return data;
};

// Servicio para crear nueva experiencia (POST)
export const createExperienceService = async (token, experiences) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.post(`${BASE_API_URL}/profile/experiences/`, { experiences }, config);
  return data;
};

// Servicio para actualizar la experiencia existente (PUT)
export const updateExperienceService = async (token, experienceData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
  const { data } = await axios.post(`${BASE_API_URL}/profile/experiences/`, experienceData, config);
  return data;
};

// Servicio para obtener la educación del perfil (GET)
export const getEducationService = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.get(`${BASE_API_URL}/profile/educations/`, config);
  return data;
};

// Servicio para crear nueva educación (POST)
export const createEducationService = async (token, education) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.post(`${BASE_API_URL}/profile/educations/`, education, config);
  return data;
};

// Servicio para actualizar la educación existente (POST con multipart/form-data)
export const updateEducationService = async (token, educationData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.post(`${BASE_API_URL}/profile/educations/`, educationData, config);
  return data;
};

// Servicio para obtener las calificaciones del perfil (GET)
export const getRatingService = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.get(`${BASE_API_URL}/profile/reviews/`, config);
  return data;
};

// Servicio para crear nuevas calificaciones (POST)
export const createRatingService = async (token, reviews) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.post(`${BASE_API_URL}/profile/reviews/`, { reviews }, config);
  return data;
};

// Servicio para actualizar calificaciones existentes (PUT)
export const updateReviewsService = async (token, reviewId, reviewsData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.put(`${BASE_API_URL}/profile/reviews/${reviewId}/`, reviewsData, config);
  return data;
};

// Servicio para actualizar imágenes del perfil (POST para nueva imagen)
export const updateImageService = async (token, images) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  };

  const { data } = await axios.put(`${BASE_API_URL}/profile/images/`, images, config);
  return data;
};

// Servicio para obtener imágenes del perfil (GET)
export const getImageService = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(`${BASE_API_URL}/profile/images/`, config);
  return data;
};

// Servicio para obtener los proyectos del portafolio (GET)
export const getPortfolioProjectsService = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.get(`${BASE_API_URL}/profile/portfolios/`, config);
  return data;
};

// Servicio para actualizar proyectos del portafolio (POST)
export const updatePortfolioService = async (token, portfolioData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const formData = new FormData();
  formData.append('title', portfolioData.title);
  formData.append('description', portfolioData.description);
  formData.append('project_url', portfolioData.project_url);

  if (portfolioData.image) {
    formData.append('image', portfolioData.image);
  }

  const { data } = await axios.post(`${BASE_API_URL}/profile/portfolios/`, formData, config);
  return data;
};

// Servicio para obtener el perfil público de un freelancer
export const getUserProfileService = async (freelancerId) => {
  const { data } = await axios.get(`${BASE_API_URL}/profile/public/${freelancerId}/`);
  return data;
};
