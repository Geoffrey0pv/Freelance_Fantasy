import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_LOGOUT,
    
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
  
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
  
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL
  } from '../../constants/usersConstants';
  
  // Estado inicial
  const initialState = {
    userInfo: null,
    loading: false,
    error: null,
    profile: null, // Almacenar los detalles del perfil aquí
  };
  
  // Reducer para manejar login de usuario
export const userLoginReducer = (state = { userInfo: null }, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true };
        case USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGIN_LOGOUT:
            return {};
        default:
            return state;
    }
};


// Reducer para manejar registro de usuario
  export const userRegisterReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return { ...state, loading: true, error: null };
      case USER_REGISTER_SUCCESS:
        return { ...state, loading: false, userInfo: action.payload };
      case USER_REGISTER_FAIL:
        return { ...state, loading: false, error: action.payload, userInfo: null };
      case USER_LOGIN_LOGOUT:
        return { ...initialState };
      default:
        return state;
    }
  };

