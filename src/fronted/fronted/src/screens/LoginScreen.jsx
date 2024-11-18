import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest, googleLoginRequest } from "../redux/actions/userActions.js";
import { useNavigate } from "react-router-dom";
import InputField from "../components/General/InputField.jsx";
import Button from "../components/General/Button.jsx";
import GoogleLoginButton from "../components/Login/GoogleLoginButton.jsx";
import WizardCanvas from "../components/Canvas/Wizard.jsx";
import ForgotPasswordButton from "../components/Login/ForgotPasswordButton.jsx";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error: loginError, userInfo } = useSelector((state) => state.userLogin);

  // Redirigir si el usuario ya está logueado
  useEffect(() => {
    if (userInfo) {
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  // Manejar errores de autenticación
  useEffect(() => {
    if (loginError) {
      setError(loginError);
    }
  }, [loginError]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError(null);
    dispatch(loginRequest(username, password));
  };

  const handleGoogleSuccess = async (data) => {
    try {
      dispatch(googleLoginRequest(data));
      setError(null);
    } catch (googleError) {
      setError("Error during Google login.");
    }
  };

  const handleGoogleFailure = (response) => {
    console.error("Google login failed:", response);
    setError("Google login failed. Please try again.");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="bg-white shadow-xl rounded-lg flex flex-col md:flex-row overflow-hidden max-w-4xl w-full">
        {/* Login Form Section */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">¡Te extrañábamos!</h1>
          <p className="text-gray-600 mb-8 text-sm md:text-base">
            Si aún no tienes una cuenta,{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Regístrate aquí!
            </a>
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <InputField
              label="Usuario"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu nombre de usuario"
            />
            <InputField
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
            />
            <Button
              label="Iniciar Sesión"
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            />
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          </form>

          <div className="my-6 text-gray-400 flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-sm">o</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <GoogleLoginButton onSuccess={handleGoogleSuccess} onFailure={handleGoogleFailure} />

          {/* Forgot Password Link */}
          <div className="mt-4 text-center">
            <ForgotPasswordButton onClick={handleForgotPassword} />
          </div>
        </div>

        {/* 3D Model Section */}
        <div className="hidden md:block w-full md:w-1/2 bg-indigo-950 flex justify-center items-center">
          <div className="w-full h-[400px] md:h-[500px] lg:h-[600px]">
            <WizardCanvas />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
