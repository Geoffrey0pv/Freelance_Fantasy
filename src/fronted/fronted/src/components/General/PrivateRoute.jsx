import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  // Verifica si el usuario está logueado
  return userInfo ? children : <Navigate to="/home" />;
};

export default PrivateRoute;
