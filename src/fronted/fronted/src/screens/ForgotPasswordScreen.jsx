import React, { useState } from 'react';
import InputField from '../components/General/InputField.jsx'; // Componente reutilizable
import Button from '../components/General/Button.jsx'; // Botón reutilizable
import WizardCanvas from '../components/Canvas/Wizard.jsx'; // Figura 3D
import { sendPasswordResetEmail } from '@/service/userService'; // Asegúrate de tener esta función implementada correctamente

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Evita la recarga de la página
    setError(null);
    setMessage(null);

    if (!email) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    try {
      const response = await sendPasswordResetEmail(email); 
      if (response.success) {
        setMessage('Se ha enviado un enlace de recuperación a tu correo.');
      } else {
        throw new Error(response.message || 'Error al enviar el correo.');
      }
    } catch (err) {
      setError(err.message || 'Ocurrió un error al procesar tu solicitud.');
    }
  };

  return (
    <div className="py-8 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg flex overflow-hidden max-w-4xl w-full">
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Recupera tu contraseña</h1>
          <p className="text-gray-600 mb-8">
            Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
          </p>

          <form className="space-y-6" onSubmit={handleForgotPassword}>
            <InputField
              label="Correo Electrónico"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electrónico"
            />
            <Button
              type="submit"
              label="Enviar Enlace"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
            />
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            {message && <p className="text-green-500 text-center mt-2">{message}</p>}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Recuerdas tu contraseña?{' '}
              <a href="/login" className="text-blue-500 hover:underline">
                Inicia sesión aquí
              </a>
            </p>
          </div>
        </div>

        {/* Sección 3D */}
        <div className="hidden md:block w-1/2 bg-indigo-950 flex justify-center items-center">
          <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <WizardCanvas /> {/* Figura 3D */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
