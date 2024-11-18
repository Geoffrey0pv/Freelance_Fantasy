  import axios from 'axios';

  // Servicio para iniciar sesión
  export const loginService = async (username, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post('http://127.0.0.1:8000/users/login/', { username, password }, config);
    return data;
  };


// Servicio para registrar un nuevo usuario
export const registerService = async (username, email, password, accountType) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const { data } = await axios.post('http://127.0.0.1:8000/users/register/', {
    username,
    email,
    password,
    account_type: accountType // Añadimos el tipo de cuenta
  }, config);
  
  return data;
};


export const googleLoginService = async (accessToken) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const { data } = await axios.post('http://127.0.0.1:8000/users/login/google/', 
    { access_token: accessToken }, 
    config
  );
  return data; // Devuelve el token del backend y datos del usuario
};


  export const getUserInfoService = async (token) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Asumiendo que estás usando un token de acceso
      }
    };
  
    const { data } = await axios.get('http://127.0.0.1:8000/users/users/', config);
    return data; // Devuelve la información del usuario
  };

  export const updateUsernameService = async (token, newUsername) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  
    const data = {
      username: newUsername,
    };
  
    try {
      const response = await axios.put('http://127.0.0.1:8000/users/update-username/', data, config);
      return response.data; 
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error || 'Error al actualizar el nombre de usuario.');
      } else {
        throw new Error('Error de red o problema desconocido.');
      }
    }
  };

  export const updateUserRolesService = async (token, isFreelancer, isClient) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
  
    const data = {
      is_freelancer: Boolean(isFreelancer),  
      is_client: Boolean(isClient),         
    };
  
    try {
      const response = await axios.patch(
        'http://127.0.0.1:8000/users/update-roles/', 
        data,
        config
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || 'Error al actualizar los roles.');
      } else {
        throw new Error('Error de red o problema desconocido.');
      }
    }
  };
  
  export const sendPasswordResetEmail = async (email) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const data = {
      email,
    };
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/reset-password/', data, config);
      return response.data; 
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(
          error.response.data.error || 'Error al enviar el correo de restablecimiento de contraseña.'
        );
      } else {
        throw new Error('Error de red o problema desconocido.');
      }
    }
  };

  export const updatePasswordService = async (resetToken, newPassword) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log(resetToken)
  
    const data = {
      token: resetToken, 
      password: newPassword, 
    };
  
    try {
      const response = await axios.put(
        'http://127.0.0.1:8000/users/update-password/', 
        data,
        config
      );
      return response.data; 
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error || 'Error al actualizar la contraseña.');
      } else {
        throw new Error('Error de red o problema desconocido.');
      }
    }
  };

  export const getUserByIdService = async ( userId) => {

    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/users/${userId}/`);
      return data; 
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.error || 'Error al obtener el usuario.');
      } else {
        throw new Error('Error de red o problema desconocido.');
      }
    }
  };
  

