import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { googleLoginRequest } from '../redux/actions/userActions.js'; // Cambiar googleSuccess por googleLoginRequest
import { useNavigate } from 'react-router-dom';
import InputField from '../components/General/InputField.jsx';
import Button from '../components/General/Button.jsx';
import PasswordStrengthBar from 'react-password-strength-bar';
import GoogleLoginButton from '../components/Login/GoogleLoginButton.jsx';
import { registerRequest } from '../redux/actions/userActions.js';
import WizardCanvas from '../components/Canvas/Wizard.jsx'; // Import your 3D model component

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [accountType, setAccountType] = useState('natural_person');
    const [showPasswordStrength, setShowPasswordStrength] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, userInfo } = useSelector((state) => state.userRegister);

    useEffect(() => {
        if (userInfo) {
            navigate('/profile');
        }
    }, [userInfo, navigate]);

    const handleRegister = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }
        dispatch(registerRequest(name, email, password, accountType));
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        if (value.length > 0) {
            setShowPasswordStrength(true);
        }

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        setTypingTimeout(setTimeout(() => {
            setShowPasswordStrength(false);
        }, 500));
    };

    const handleGoogleSuccess = (response) => {
        const accessToken = response.tokenId;
        dispatch(googleLoginRequest(accessToken));
    };

    const handleGoogleFailure = (error) => {
        console.error('Google login failed:', error);
        alert("Google login failed. Please try again.");
    };

    return (
            <div className="py-6 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-md flex flex-col md:flex-row overflow-hidden max-w-screen-md w-full">
            {/* Sección Izquierda */}
            <div className="w-full md:w-1/2 p-4 sm:p-6 flex flex-col justify-center">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                    ¡Crea tu cuenta!
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                    Si ya tienes una cuenta,{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        inicia sesión aquí
                    </a>.
                </p>
                <form onSubmit={handleRegister} className="space-y-2 sm:space-y-3">
                    <InputField
                        label="Usuario"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ingresa tu username"
                        required
                    />
                    <InputField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa tu correo electrónico"
                        required
                    />
                    <InputField
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Ingresa tu contraseña"
                        required
                    />
                    <div className={`${showPasswordStrength ? 'block' : 'hidden'} mt-1`}>
                        <PasswordStrengthBar password={password} />
                    </div>
                    <InputField
                        label="Confirmar contraseña"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirma tu contraseña"
                        required
                    />
                    {password && confirmPassword && password !== confirmPassword && (
                        <p className="text-red-500 text-center text-xs">
                            Las contraseñas no coinciden.
                        </p>
                    )}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Tipo de cuenta
                        </label>
                        <div className="mt-1 flex space-x-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="accountType"
                                    value="persona"
                                    checked={accountType === 'persona'}
                                    onChange={() => setAccountType('persona')}
                                    className="form-radio"
                                />
                                <span className="ml-1 text-sm">Persona Natural</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="accountType"
                                    value="empresa"
                                    checked={accountType === 'empresa'}
                                    onChange={() => setAccountType('empresa')}
                                    className="form-radio"
                                />
                                <span className="ml-1 text-sm">Empresa</span>
                            </label>
                        </div>
                    </div>
                    <Button
                        label="Registrarse"
                        onClick={handleRegister}
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    />
                    {error && (
                        <p className="text-red-500 text-center text-xs mt-1">{error}</p>
                    )}
                </form>

                <div className="my-4 flex items-center">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-3 text-xs">o</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                <GoogleLoginButton
                    onSuccess={handleGoogleSuccess}
                    onFailure={handleGoogleFailure}
                />
            </div>

            {/* Sección Derecha */}
            <div className="hidden md:flex w-1/2 bg-indigo-950 items-center justify-center">
                <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] ">
                    <WizardCanvas />
                </div>
            </div>
        </div>
    </div>
    );
};

export default RegisterScreen;
