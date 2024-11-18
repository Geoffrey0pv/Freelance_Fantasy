import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { googleLoginService } from '../../service/userService';
import { useDispatch } from 'react-redux';
import { googleLoginRequest } from '../../redux/actions/userActions';

const GoogleLoginButton = ({ onSuccess, onFailure }) => {
  const dispatch = useDispatch();
  const clientId = '999212806986-3i2q4tg62458ocij9f3k80a2ao3q4p9f.apps.googleusercontent.com';

  const handleSuccess = async (credentialResponse) => {
    try {
      const data = await googleLoginService(credentialResponse.credential); 
      dispatch(googleLoginRequest(data)); // Actualiza estado en Redux
      onSuccess(data);
    } catch (error) {
      console.error('Google login service error:', error);
      onFailure(error);
    }
  };

  const handleFailure = (error) => {
    console.error(error);
    onFailure(error);
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleFailure}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
