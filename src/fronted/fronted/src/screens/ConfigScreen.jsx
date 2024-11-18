import React, { useState, useEffect } from 'react'; 
import { useSelector } from 'react-redux';
import { getUserInfoService, updateUsernameService, updateUserRolesService, sendPasswordResetEmail } from '@/service/userService'; 

const ConfigScreen = () => {
  const { userLogin: { userInfo: userToken } } = useSelector((state) => state);
  const [activeSection, setActiveSection] = useState(null);
  const [currentUsername, setCurrentUsername] = useState('');
  const [username, setUsername] = useState('');
  const [useremail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');
  const [passwordChangeConfirmed, setPasswordChangeConfirmed] = useState(false);
  const [personType, setPersonType] = useState({
    freelancer: false,
    client: false
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userToken && userToken.access) {
        try {
          const userData = await getUserInfoService(userToken.access);
          const user = userData[0];
          setCurrentUsername(user.username);
          setUsername(user.username);
          setUserEmail(user.email);
          setPersonType({
            freelancer: Boolean(user.is_freelancer),
            client: Boolean(user.is_client),
          });
        } catch (error) {
          console.error('Error al obtener la información del usuario:', error);
        }
      }
    };

    fetchUserInfo();
  }, [userToken]);

  const handleChangeUsername = () => {
    setActiveSection('username');
    setMessage('');
    setPasswordChangeConfirmed(false);
  };

  const handleChangeNotifications = () => {
    setActiveSection('notifications');
    setMessage('');
    setPasswordChangeConfirmed(false);
  };

  const handleChangePassword = () => {
    setActiveSection('password');
    setMessage('');
    setPasswordChangeConfirmed(false);
  };

  const handleSubmitPassword = async () => {
    try {
      await sendPasswordResetEmail(useremail);
      setPasswordChangeConfirmed(true);
    } catch (error) {
      setMessage('Hubo un error al intentar cambiar la contraseña.');
    }
  };

  const handleChangePersonType = () => {
    setActiveSection('personType');
    setMessage('');
  };

  const handleSubmitPersonType = async () => {
    try {
      await updateUserRolesService(userToken.access, personType.freelancer, personType.client);
      setMessage('Configuración de tipo de persona actualizada.');
    } catch (error) {
      setMessage('Error al actualizar el tipo de persona.');
    }
  };

  const handleSubmitUsername = async () => {
    if (username.trim() === '') {
      setMessage('El nombre de usuario no puede estar vacío.');
      return;
    }

    if (username === currentUsername) {
      setMessage('El nombre de usuario no ha cambiado.');
      return;
    }

    try {
      const result = await updateUsernameService(userToken.access, username);
      setCurrentUsername(username);
      setMessage(result.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="p-6 max-w-full y-  my-auto mx-auto bg-zinc-900 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-white mb-6">Configuraciones</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Botones de navegación */}
        <div className="flex flex-col gap-4 w-full lg:w-1/4">
          <button onClick={handleChangeUsername} className="py-2 px-4 bg-white text-zinc-950 rounded hover:bg-gray-200 transition">
            Cambiar Nombre de Usuario
          </button>
          <button onClick={handleChangeNotifications} className="py-2 px-4 bg-white text-zinc-950 rounded hover:bg-gray-200 transition">
            Configurar Notificaciones
          </button>
          <button onClick={handleChangePassword} className="py-2 px-4 bg-white text-zinc-950 rounded hover:bg-gray-200 transition">
            Cambiar Contraseña
          </button>
          <button onClick={handleChangePersonType} className="py-2 px-4 bg-white text-zinc-950 rounded hover:bg-gray-200 transition">
            Configuración de Tipo de Persona
          </button>
        </div>

        {/* Sección de contenido */}
        <div className="flex-1 bg-zinc-900 p-6 rounded-lg shadow">
          {activeSection === 'username' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Cambiar Nombre de Usuario</h2>
              <input
                type="text"
                placeholder="Nuevo nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-500 rounded bg-zinc-800 text-white"
              />
              <button onClick={handleSubmitUsername} className="py-2 px-4 bg-white text-zinc-950 rounded hover:bg-gray-200 transition">
                Cambiar
              </button>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Configurar Notificaciones</h2>
              <p className="text-gray-400">Aquí puedes cambiar las configuraciones de notificaciones.</p>
            </div>
          )}

          {activeSection === 'password' && !passwordChangeConfirmed && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Cambiar Contraseña</h2>
              <p className="text-gray-400">¿Estás seguro de que deseas cambiar tu contraseña?</p>
              <button onClick={handleSubmitPassword} className="py-2 px-4 bg-white text-zinc-950 rounded hover:bg-gray-200 transition">
                Confirmar Cambio de Contraseña
              </button>
            </div>
          )}

          {passwordChangeConfirmed && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Cambiar Contraseña</h2>
              <p className="text-gray-400">Se han enviado instrucciones a tu correo.</p>
            </div>
          )}

          {activeSection === 'personType' && (
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Configuración de Tipo de Persona</h2>
              <label className="flex items-center mb-2 text-gray-400">
                <input
                  type="checkbox"
                  checked={personType.freelancer}
                  onChange={(e) => setPersonType({ ...personType, freelancer: e.target.checked })}
                  className="mr-2"
                />
                Freelancer
              </label>
              <label className="flex items-center mb-4 text-gray-400">
                <input
                  type="checkbox"
                  checked={personType.client}
                  onChange={(e) => setPersonType({ ...personType, client: e.target.checked })}
                  className="mr-2"
                />
                Cliente
              </label>
              <button onClick={handleSubmitPersonType} className="py-2 px-4 bg-white text-zinc-950 rounded hover:bg-gray-200 transition">
                Confirmar
              </button>
            </div>
          )}

          {message && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigScreen;
