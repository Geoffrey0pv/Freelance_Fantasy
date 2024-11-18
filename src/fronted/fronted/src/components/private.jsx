import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Este componente asegura que solo se puede acceder a la ruta si el usuario está autenticado
const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('access_token');  // Verifica si existe el token

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (  // Si el token existe, se renderiza el componente
          <Component {...props} />
        ) : (  // Si no hay token, redirige al usuario a la página de login
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
