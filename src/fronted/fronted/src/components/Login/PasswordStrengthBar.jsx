import React from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';

const PasswordStrength = ({ password }) => {
  return <PasswordStrengthBar password={password} />;
};

export default PasswordStrength;
