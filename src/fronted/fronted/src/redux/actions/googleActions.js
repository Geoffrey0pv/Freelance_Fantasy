import { userLoginSuccess } from './userActions';

const googleSuccess = (response) => async (dispatch) => {
    const token = response.tokenId;

    try {
        const res = await fetch('http://127.0.0.1:8000/login/google/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ access_token: token }),
        });
        const data = await res.json();

        if (res.ok) {
            console.log(data);
            // Despacha una acción para guardar la información del usuario en tu estado global (Redux)
            dispatch(userLoginSuccess(data));
        } else {
            console.error(data);
            // Manejar el error
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const googleFailure = (response) => {
    console.log('Google Sign In was unsuccessful. Try again later.');
};

export { googleSuccess, googleFailure };