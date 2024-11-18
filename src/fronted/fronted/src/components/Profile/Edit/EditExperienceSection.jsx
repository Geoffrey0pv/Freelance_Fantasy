import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditExperienceSection = ({ experienceData = {}, onSave }) => {
  const [experience, setExperience] = useState(experienceData);
  const [error, setError] = useState('');
  const [message, setMessage] = useState(null); // Estado para mensaje de éxito/error
  const [messageType, setMessageType] = useState(''); // 'success' o 'error'
  const navigate = useNavigate();

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExperience({ ...experience, [name]: value });
  };

  // Validar y guardar la experiencia laboral
  const handleSaveExperience = async (redirect = false) => {
    // Validar que todos los campos requeridos estén llenos
    if (!experience.job_title || !experience.enterprise_name || !experience.start_date || !experience.end_date) {
      setError('Por favor, complete todos los campos antes de guardar.');
      return;
    }

    // Limpiar mensaje de error
    setError('');

    try {
      // Enviar el objeto experience al onSave
      await onSave(experience);

      // Mostrar mensaje de éxito
      setMessage('Los cambios se han guardado exitosamente');
      setMessageType('success');

      if (redirect) {
        setTimeout(() => {
          navigate('/profile'); // Redirigir después de 2 segundos
        }, 2000);
      }
    } catch (error) {
      setMessage('Algo ha salido mal. Inténtelo de nuevo');
      setMessageType('error');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700">Editar Experiencia Laboral</h2>

      {/* Mensaje de éxito o error */}
      {message && (
        <div
          className={`p-4 mb-4 text-center rounded ${
            messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message}
        </div>
      )}

      {/* Mostrar mensaje de error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Formulario de Experiencia */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="job_title"
            value={experience.job_title || ''}
            onChange={handleInputChange}
            placeholder="Título del Trabajo"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="enterprise_name"
            value={experience.enterprise_name || ''}
            onChange={handleInputChange}
            placeholder="Empresa"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <input
          type="text"
          name="location"
          value={experience.location || ''}
          onChange={handleInputChange}
          placeholder="Ubicación"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="start_date"
            value={experience.start_date || ''}
            onChange={handleInputChange}
            placeholder="Fecha de Inicio"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            name="end_date"
            value={experience.end_date || ''}
            onChange={handleInputChange}
            placeholder="Fecha de Finalización"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <textarea
          name="description"
          value={experience.description || ''}
          onChange={handleInputChange}
          placeholder="Descripción del Trabajo"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
        />
      </div>

      {/* Botones de Guardar */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => handleSaveExperience(false)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Guardar y Seguir Editando
        </button>
        <button
          onClick={() => handleSaveExperience(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Guardar y Salir
        </button>
      </div>
    </div>
  );
};

export default EditExperienceSection;
