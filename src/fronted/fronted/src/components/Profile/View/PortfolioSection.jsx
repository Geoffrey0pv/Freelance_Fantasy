import React from 'react';

const ViewPortfolioSection = ({ projects }) => {
  return (
    <div className="bg-gray-100 p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Portafolio</h2>
      {projects && projects.length > 0 ? (
        projects.map((project, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold text-yellow-400">{project.title}</h3>
            <p className="text-gray-400">{project.description}</p>
            {project.skills && (
              <p className="text-gray-400">Habilidades usadas: {project.skills.join(', ')}</p>
            )}
            {project.files && project.files.length > 0 && (
              <div className="mt-2">
                <p className="text-gray-600">Archivos del proyecto:</p>
                <ul className="list-disc list-inside">
                  {project.files.map((file, fileIndex) => (
                    <li key={fileIndex}>
                      <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-white underline">
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-gray-600">No se han añadido proyectos al portafolio.</p>
      )}
    </div>
  );
};

export default ViewPortfolioSection;
