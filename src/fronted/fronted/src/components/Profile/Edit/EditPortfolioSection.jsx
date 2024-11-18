import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditPortfolioSection = ({ portfolioList = [], onSave }) => {
  const [projects, setProjects] = useState(portfolioList);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    project_url: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Maneja el cambio en los campos del nuevo proyecto
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setNewProject({ ...newProject, [name]: files[0] });
    } else {
      setNewProject({ ...newProject, [name]: value });
    }
  };

  // Llama a la función onSave del padre para guardar los cambios y mostrar el mensaje de éxito
  const handleSave = async () => {
    try {
      await onSave([...projects, newProject]);
      setSuccessMessage('Portafolio guardado correctamente');
      setError('');
    } catch (err) {
      setError('Hubo un problema al guardar el portafolio.');
    }
  };

  // Guardar y continuar editando
  const handleSaveAndContinue = async () => {
    await handleSave();
    setTimeout(() => setSuccessMessage(''), 3000); // Limpia el mensaje de éxito después de 3 segundos
  };

  // Guardar y volver al perfil
  const handleSaveAndGoToProfile = async () => {
    await handleSave();
    navigate('/profile'); // Redirige a /profile después de guardar
  };

  return (
    <div className="bg-gray-100 p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Portafolio</h2>

      {/* Mensaje de error */}
      {error && <div className="mb-4 text-red-500">{error}</div>}

      {/* Mensaje de éxito */}
      {successMessage && <div className="mb-4 text-green-500">{successMessage}</div>}

      {/* Formulario para el nuevo proyecto */}
      <div className="mb-6">
        <input
          type="text"
          name="title"
          value={newProject.title}
          onChange={handleChange}
          placeholder="Título del Proyecto"
          className="w-full p-2 mb-3 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="project_url"
          value={newProject.project_url}
          onChange={handleChange}
          placeholder="URL del Proyecto"
          className="w-full p-2 mb-3 border border-gray-300 rounded-md"
        />
        <textarea
          name="description"
          value={newProject.description}
          onChange={handleChange}
          placeholder="Descripción del Proyecto"
          className="w-full p-2 mb-3 border border-gray-300 rounded-md"
        />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full p-2 mb-3 border border-gray-300 rounded-md"
        />
      </div>

      {/* Listado de proyectos existentes */}
      {projects.map((project, index) => (
        <div key={index} className="p-4 mb-4 bg-white border border-gray-200 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
          <a href={project.project_url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
            {project.project_url}
          </a>
          <p className="text-gray-600 mt-2">{project.description}</p>
          {project.image && (
            <img src={URL.createObjectURL(project.image)} alt="project" className="w-full h-auto mt-2" />
          )}
        </div>
      ))}

      {/* Botones de guardar */}
      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={handleSaveAndContinue}
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Guardar y Seguir Editando
        </button>
        <button
          type="button"
          onClick={handleSaveAndGoToProfile}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Guardar y Volver a Perfil
        </button>
      </div>
    </div>
  );
};

export default EditPortfolioSection;
