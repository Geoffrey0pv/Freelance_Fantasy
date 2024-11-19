import axios from 'axios';


export const getProjectsByWorker = async (workerId) => {
  try {
      const response = await fetch(`http://127.0.0.1:8000/projects/worker/${workerId}/`); // Ajusta la URL según tu API
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
      const response = await fetch(`http://127.0.0.1:8000/projects/owner/${ownerId}/`); // Ajusta la URL según tu API
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
      const response = await axios.get(`http://127.0.0.1:8000/project/${projectId}/`);
      return response.data; // Retorna los datos del proyecto
  } catch (error) {
      console.error('Error al obtener el proyecto:', error);
      throw error; // Propaga el error para que pueda ser manejado en el componente
  }

};



  