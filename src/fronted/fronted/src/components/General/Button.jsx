import React from 'react';
const Button = ({ label, onClick, className, disabled }) => {
  return (
      <button
          onClick={onClick}
          className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 ease-in-out ${className}`}
          disabled={disabled}
      >
        {label}
      </button>
  );
};

export default Button;