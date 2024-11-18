import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditEducationSection = ({ educationData = {}, onSave }) => {
  const navigate = useNavigate();
  
  // Estado para una única entrada de educación
  const [education, setEducation] = useState(educationData);
  const [error, setError] = useState(''); // Estado para almacenar el mensaje de error

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEducation({ ...education, [name]: value });
  };

  // Validar y guardar la educación
  const handleSaveEducation = () => {
    // Validar que todos los campos requeridos estén llenos
    if (
      !education.certification_name ||
      !education.certifying_institute_name ||
      !education.start_date ||
      !education.end_date
    ) {
      setError('Por favor, complete todos los campos antes de guardar.');
      return;
    }

    // Limpiar mensaje de error si todo está completo
    setError('');
    
    // Enviar el objeto education directamente
    if (onSave) onSave(education);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700">Editar Educación</h2>

      {/* Mostrar mensaje de error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Formulario de Educación */}
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="certification_name"
            value={education.certification_name || ''}
            onChange={handleInputChange}
            placeholder="Título"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="certifying_institute_name"
            value={education.certifying_institute_name || ''}
            onChange={handleInputChange}
            placeholder="Institución"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <input
          type="text"
          name="country"
          value={education.country || ''}
          onChange={handleInputChange}
          placeholder="País"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="start_date"
            value={education.start_date || ''}
            onChange={handleInputChange}
            placeholder="Fecha de Inicio"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            name="end_date"
            value={education.end_date || ''}
            onChange={handleInputChange}
            placeholder="Fecha de Finalización"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Botones de Guardar */}
      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleSaveEducation}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Guardar y Seguir Editando
        </button>
        <button
          onClick={() => {
            handleSaveEducation();
            if (
              education.certification_name &&
              education.certifying_institute_name &&
              education.start_date &&
              education.end_date &&
              window.confirm("¿Guardar y salir de la edición?")
            ) {
              navigate('/profile');
            }
          }}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Guardar y Salir
        </button>
      </div>
    </div>
  );
};

export default EditEducationSection;
