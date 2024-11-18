import React from 'react';
import { FaBuilding, FaCalendarAlt, FaBriefcase } from 'react-icons/fa';

const ViewExperienceSection = ({ experiences }) => {
  return (
    <div className="bg-gray-100 p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Experiencia Laboral</h2>
      {experiences && experiences.length > 0 ? (
        experiences.map((exp, index) => (
          <div key={index} className="mb-6 p-4 bg-white shadow-sm rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-yellow-500 flex items-center">
              <FaBriefcase className="mr-2" /> {exp.job_title} 
            </h3>
            <p className="text-gray-700 flex items-center">
              <FaBuilding className="mr-2 text-gray-500" /> {exp.enterprise_name}
            </p>
            <p className="text-gray-600 mt-2">
              {exp.description || 'No hay descripción disponible para esta experiencia.'}
            </p>
            <p className="text-gray-500 mt-2 flex items-center">
              <FaCalendarAlt className="mr-2" />
              {exp.start_date ? new Date(exp.start_date).toLocaleDateString() : 'Fecha de inicio no especificada'} - 
              {exp.end_date ? new Date(exp.end_date).toLocaleDateString() : 'Presente'}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No se ha añadido experiencia laboral.</p>
      )}
    </div>
  );
};

export default ViewExperienceSection;
