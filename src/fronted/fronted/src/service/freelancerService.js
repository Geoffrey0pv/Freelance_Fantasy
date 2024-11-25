import axios from 'axios';
import { BASE_API_URL } from './apiConfig';

// Obtener imágenes públicas
export const getPublicImageService = async (userId) => {
  const { data } = await axios.get(`${BASE_API_URL}/profile/public/images/?user_id=${userId}`);
  return data;
};

// Obtener reviews públicas
export const getPublicReviewService = async (userId) => {
  const { data } = await axios.get(`${BASE_API_URL}/profile/public/reviews/?user_id=${userId}`);
  return data;
};

export const getAllFreelancersService = async (pageNumber = 1) => {
  const { data } = await axios.get(
    `${BASE_API_URL}/users/freelancers/all/?page=${pageNumber}&limit=10`
  );
  return data; // Se espera que `data` incluya `freelancers`, `pages`, y `page`.
};

