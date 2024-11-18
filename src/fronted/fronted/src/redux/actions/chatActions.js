export const openChat = (chat) => async (dispatch) => {
    try {
      const data = await openChatService(chat); // Llamas al servicio con el chat
  
      console.log('Datos recibidos por openChatService:', data); // Para depuración
  
      dispatch({
        type: 'OPEN_CHAT_SUCCESS',  // Acción para indicar éxito
        payload: data,              // Datos de los mensajes recuperados
      });
    } catch (error) {
      dispatch({
        type: 'OPEN_CHAT_FAILURE',  // Acción para indicar error
        error: error.message,       // Mensaje de error
      });
    }
  };

