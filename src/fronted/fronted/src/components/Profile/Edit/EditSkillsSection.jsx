import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const predefinedSkills = [
  'React.js', 'Node.js', 'JavaScript', 'CSS', 'HTML', 'Python', 'Django', 'MongoDB', 'GraphQL', 'Java', 'C++', 'Vue.js', 'Angular.js',
];

const EditSkillsSection = ({ skills = [], onSave }) => {
  const [customSkill, setCustomSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState(
    skills.map((skill) => (typeof skill === 'string' ? { skill } : skill))
  );
  const [message, setMessage] = useState(null); // Estado para el mensaje de éxito/error
  const [messageType, setMessageType] = useState(''); // 'success' o 'error'
  const navigate = useNavigate();

  const handleToggleSkill = (skill) => {
    const skillName = typeof skill === 'object' ? skill.skill : skill;

    if (selectedSkills.some((s) => s.skill === skillName)) {
      setSelectedSkills(selectedSkills.filter((s) => s.skill !== skillName));
    } else {
      setSelectedSkills([...selectedSkills, { skill: skillName }]);
    }
  };

  const handleAddCustomSkill = () => {
    if (customSkill && !selectedSkills.some((s) => s.skill === customSkill)) {
      setSelectedSkills([...selectedSkills, { skill: customSkill }]);
      setCustomSkill('');
    }
  };

  const handleSaveSkills = async (redirect = false) => {
    const skillsToSave = selectedSkills.map((s) => ({
      skill: s.skill,
      user: 1, // Cambia "1" por el ID de usuario real si es necesario
    }));

    try {
      await onSave(skillsToSave); // Llamamos onSave y esperamos a que se complete

      // Mensaje de éxito
      setMessage('Los cambios se han guardado exitosamente');
      setMessageType('success');

      if (redirect) {
        setTimeout(() => {
          navigate('/profile'); // Redirige después de un breve tiempo
        }, 2000); // Tiempo de espera de 2 segundos
      }
    } catch (error) {
      setMessage('Algo ha salido mal. Inténtelo de nuevo');
      setMessageType('error');
    }
  };

  return (
    <div className="bg-gray-100 p-6 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Editar Habilidades</h2>

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

      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={customSkill}
          onChange={(e) => setCustomSkill(e.target.value)}
          placeholder="Nueva habilidad personalizada"
          className="flex-grow px-3 py-2 border rounded mt-1"
        />
        <button onClick={handleAddCustomSkill} className="bg-green-500 text-white px-3 py-2 rounded">
          Añadir
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-600 mb-2">Seleccionar de la lista</h3>
        <div className="flex flex-wrap gap-2">
          {predefinedSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => handleToggleSkill(skill)}
              className={`px-3 py-1 rounded-md ${
                selectedSkills.some((s) => s.skill === skill)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-600 mb-2">Habilidades seleccionadas</h3>
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md flex items-center space-x-2">
              {skill.skill}
              <button
                onClick={() => handleToggleSkill(skill)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex space-x-4 mt-4">
        {/* Botón Guardar y Seguir Editando */}
        <button onClick={() => handleSaveSkills(false)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Guardar y Seguir Editando
        </button>

        {/* Botón Guardar Cambios y Salir */}
        <button onClick={() => handleSaveSkills(true)} className="bg-green-500 text-white px-4 py-2 rounded">
          Guardar Cambios y Salir
        </button>
      </div>
    </div>
  );
};

export default EditSkillsSection;
