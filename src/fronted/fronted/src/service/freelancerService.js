import axios from 'axios';

// Obtener imágenes públicas
export const getPublicImageService = async (userId) => {
  const { data } = await axios.get(`http://127.0.0.1:8000/profile/public/images/?user_id=${userId}`);
  return data;
};

// Obtener reviews públicas
export const getPublicReviewService = async (userId) => {
  const { data } = await axios.get(`http://127.0.0.1:8000/profile/public/reviews/?user_id=${userId}`);
  return data;
};

// Obtener lista básica de freelancers
export const getAllFreelancersService = async () => {
  const { data } = await axios.get('http://127.0.0.1:8000/users/freelancers/all/');
  return data;
};
