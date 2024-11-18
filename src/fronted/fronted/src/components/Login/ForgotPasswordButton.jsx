import React from 'react';

const ForgotPasswordButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="text-blue-500 text-sm hover:underline focus:outline-none">
      ¿Olvidaste tu contraseña?
    </button>
  );
};

export default ForgotPasswordButton;
