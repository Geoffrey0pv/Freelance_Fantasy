import React from 'react';

const ViewSkillsSection = ({ skills }) => {
  return (
    <div>
      {skills && skills.length > 0 ? (
        <ul className="list-disc list-inside text-gray-400">
          {skills.map((skill, index) => (
            <li key={index} className="mb-2">
              {skill?.skill || 'Habilidad desconocida'} {/* Manejo de errores */}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No se han agregado habilidades aún.</p>
      )}
    </div>
  );
};

export default ViewSkillsSection;
