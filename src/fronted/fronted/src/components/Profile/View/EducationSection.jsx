import React from 'react';
import { FaUniversity, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const ViewEducationSection = ({ education }) => {
  return (
    <div className="bg-gray-100 p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Educación</h2>
      {education && education.length > 0 ? (
        education.map((edu, index) => (
          <div 
            key={index} 
            className="p-5 mb-5 border border-gray-300 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Nombre de la certificación */}
            <h3 className="text-xl font-semibold text-blue-600 flex items-center mb-2">
              <FaUniversity className="mr-2 text-blue-500" /> {edu.certification_name}
            </h3>
            
            {/* Nombre de la institución y país */}
            <div className="text-gray-700 flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              <span className="font-medium">{edu.certifying_institute_name}</span>, {edu.country}
            </div>

            {/* Fechas de inicio y fin */}
            <div className="text-gray-600 flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-500" />
              <span>{edu.start_date} - {edu.end_date || 'Presente'}</span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No se ha añadido educación.</p>
      )}
    </div>
  );
};

export default ViewEducationSection;
