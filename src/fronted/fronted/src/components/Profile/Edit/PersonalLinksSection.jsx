import React from 'react';

const PersonalLinksSection = ({ links = { linkedin: '', github: '', portfolio: '' }, onLinksChange }) => {
  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onLinksChange({ ...links, [name]: value }); // Notificar cambios al componente padre
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700">Enlaces Personales</h2>

      {/* Inputs para añadir enlaces */}
      <div className="space-y-4">
        <input
          type="url"
          name="linkedin"
          value={links.linkedin}
          onChange={handleInputChange}
          placeholder="LinkedIn URL"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="url"
          name="github"
          value={links.github}
          onChange={handleInputChange}
          placeholder="GitHub URL"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="url"
          name="portfolio"
          value={links.portfolio}
          onChange={handleInputChange}
          placeholder="Portafolio Personal URL"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Vista previa de los enlaces */}
      <div className="space-y-4 mt-6">
        {links.linkedin && (
          <p className="text-blue-500">
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn: {links.linkedin}
            </a>
          </p>
        )}
        {links.github && (
          <p className="text-blue-500">
            <a href={links.github} target="_blank" rel="noopener noreferrer">
              GitHub: {links.github}
            </a>
          </p>
        )}
        {links.portfolio && (
          <p className="text-blue-500">
            <a href={links.portfolio} target="_blank" rel="noopener noreferrer">
              Portafolio: {links.portfolio}
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default PersonalLinksSection;
