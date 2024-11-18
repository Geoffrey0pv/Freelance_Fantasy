import React from 'react';

const ViewPersonalLinksSection = ({ links }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Enlaces Personales</h2>
      <ul className="list-disc list-inside text-gray-600">
        {links && links.length > 0 ? (
          links.map((link, index) => (
            <li key={index}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {link.label}
              </a>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No se han agregado enlaces personales.</p>
        )}
      </ul>
    </div>
  );
};

export default ViewPersonalLinksSection;
