import axios from 'axios';

export const openChatService = async (room_id) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/messages/?room=${room_id}`, config);
      return data;
    } catch (error) {
      console.error('Error fetching chat room data:', error);
      throw error;
    }
  };

  export const getChatMessages = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    };
  
    const { data } = await axios.get(`http://127.0.0.1:8000/rooms/`, config);
    return data; 
  };

  export const sendMessage = async (messageContent, roomId, token, userInfo) => {
    try {
        const userObject = {
            id: userInfo.id, 
            username: userInfo.username,
            email: userInfo.email,
            password: userInfo.password
        };

        const response = await axios.post(
            'http://127.0.0.1:8000/messages/', 
            {
                message: messageContent,
                room: roomId,  // Envías solo el ID de la sala
                user: userObject // Envías el objeto del usuario completo
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Message sent:', response.data);
    } catch (error) {
        console.error('Server responded with status:', error.response.status);
        console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
};

  
  

  
  