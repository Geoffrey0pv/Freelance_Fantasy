import axios from 'axios';
import { BASE_API_URL } from './apiconfig';

export const getProjectsByWorker = async (workerId) => {
  try {
    const response = await fetch(`${BASE_API_URL}/projects/worker/${workerId}/`); // URL dinámica
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data; // Devuelve los proyectos
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error; // Manejo del error
  }
};

export const getProjectsByOwner = async (ownerId) => {
  try {
    const response = await fetch(`${BASE_API_URL}/projects/owner/${ownerId}/`); // URL dinámica
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const getProjectById = async (projectId) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/project/${projectId}/`); // URL dinámica
    return response.data; // Retorna los datos del proyecto
  } catch (error) {
    console.error('Error al obtener el proyecto:', error);
    throw error; // Propaga el error para que pueda ser manejado en el componente
  }
};
