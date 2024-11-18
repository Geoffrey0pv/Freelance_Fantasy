import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updatePasswordService } from "@/service/userService";

const ChangePassword = () => {
  const { id: resetToken } = useParams(); // Extrae el token (id) desde la URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      setSuccess("");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un símbolo."
      );
      setSuccess("");
      return;
    }

    setError("");

    try {
      // Usar el token extraído de la URL para la solicitud
      await updatePasswordService(resetToken, password);
      setSuccess("¡Contraseña cambiada con éxito!");

      setTimeout(() => {
        navigate("/login"); // Redirige al login después de cambiar la contraseña
      }, 1500);
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96 text-center"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Restablecer Contraseña
        </h2>

        {error && (
          <p className="text-sm text-red-500 font-medium mb-4">{error}</p>
        )}
        {success && (
          <p className="text-sm text-green-500 font-medium mb-4">{success}</p>
        )}

        <label
          htmlFor="password"
          className="block text-left text-gray-700 font-medium mb-2"
        >
          Nueva Contraseña:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-4"
        />

        <label
          htmlFor="confirmPassword"
          className="block text-left text-gray-700 font-medium mb-2"
        >
          Confirmar Contraseña:
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-4"
        />

        <button
          type="submit"
          className="w-full p-3 bg-purple-600 text-white font-medium rounded-md hover:bg-purple-700 transition duration-200"
        >
          Confirmar
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
