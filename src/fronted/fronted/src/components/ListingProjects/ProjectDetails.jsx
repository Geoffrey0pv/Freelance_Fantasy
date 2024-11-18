import React from 'react';

const ProjectDetails = ({ project, onMakeOffer }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between">
        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">Nuevo</span>
        <span className="text-gray-700 flex items-center">
          <span className="mr-1">★</span> 4.9
        </span>
      </div>

      <div className="my-4">
        <img
          src={project.photo || 'https://via.placeholder.com/600x400'}
          alt="Project banner"
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{project.title}</h2>
      <p className="text-blue-600 text-sm font-medium">Machine Learning & Analytics</p>
      <p className="text-gray-600 mt-2">{project.description}</p>

      <div className="flex items-center mt-4 text-gray-500">
        <span className="mr-4">📅 1 mes</span>
        <span className="mr-4">🕒 Progreso semanal</span>
        <span>📍 {project.location || "UTC"}</span>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-gray-700 text-sm">{project.offers?.length || 0} postulados</p>
        <button
          onClick={onMakeOffer}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          Postularse
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
