import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfileInfoSection = ({ profileData, setProfileData, onSave }) => {
  const [message, setMessage] = useState(null); // Estado para el mensaje de éxito/error
  const [messageType, setMessageType] = useState(''); // 'success' o 'error'
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async (redirect = false) => {
    try {
      await onSave(); // Llamamos a onSave y esperamos que se complete

      // Si es exitoso, mostramos el mensaje de éxito
      setMessage('Los cambios se han guardado exitosamente');
      setMessageType('success');

      if (redirect) {
        setTimeout(() => {
          navigate('/profile'); // Redirige después de un breve tiempo
        }, 2000); // Tiempo de espera de 2 segundos
      }
    } catch (error) {
      // Si ocurre un error, mostramos el mensaje de error
      setMessage('Algo ha salido mal. Inténtelo de nuevo');
      setMessageType('error');
    }
  };

  return (
    <div className="bg-gray-100 p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Editar Información General</h2>

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

      <div className="space-y-4">
        <div>
          <label className="block text-gray-700">País</label>
          <input
            type="text"
            name="country"
            value={profileData.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-gray-700">Ciudad</label>
          <input
            type="text"
            name="city"
            value={profileData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-gray-700">Número de Teléfono</label>
          <input
            type="text"
            name="phone_number"
            value={profileData.phone_number}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded mt-1"
          />
        </div>
        <div>
          <label className="block text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={profileData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded mt-1"
          ></textarea>
        </div>
      </div>

      <div className="flex space-x-4 mt-4">
        {/* Botón Guardar y Seguir Editando */}
        <button onClick={() => handleSave(false)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Guardar y Seguir Editando
        </button>

        {/* Botón Guardar Cambios y Salir */}
        <button onClick={() => handleSave(true)} className="bg-green-500 text-white px-4 py-2 rounded">
          Guardar Cambios y Salir
        </button>
      </div>
    </div>



  );



};

export default EditProfileInfoSection;
