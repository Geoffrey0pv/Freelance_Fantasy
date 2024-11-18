import axios from 'axios';
import { BASE_API_URL } from './apiconfig';

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

// Obtener lista básica de freelancers
export const getAllFreelancersService = async () => {
  const { data } = await axios.get(`${BASE_API_URL}/users/freelancers/all/`);
  return data;
};
