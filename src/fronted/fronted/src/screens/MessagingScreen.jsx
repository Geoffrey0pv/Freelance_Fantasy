import React, { useEffect, useState } from 'react'; 
import { getChatMessages, openChatService, sendMessage } from '../service/chatService'; 
import { useDispatch, useSelector } from 'react-redux';
import Chats from "../components/General/Chats";
import { getUserInfoService } from '@/service/userService';

const ChatScreen = () => {
  const [chatList, setChatList] = useState([]); 
  const [activeMessages, setActiveMessages] = useState([]); 
  const [userInfo, setUserInfo] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState(''); 
  const dispatch = useDispatch();

  const { userLogin: { userInfo: userToken } } = useSelector((state) => state);

  const handleOpenChat = async (chatId) => {
    try {
      const chatMessages = await openChatService(chatId); 
      setActiveMessages(chatMessages); 
      setActiveChat(chatList.find(chat => chat.id === chatId)); 
    } catch (error) {
      console.error('Error al abrir el chat:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      console.log('activeChat:', activeChat);
      console.log('userInfo:', userInfo);

      if (messageInput.trim()) {
        await sendMessage(messageInput,activeChat.id, userToken.access, userInfo[0]); 
        setMessageInput(''); 
      }
    } catch (error) {
      console.error('Error en mandar el mensaje:', error);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userToken && userToken.access) {
        try {
          const userData = await getUserInfoService(userToken.access);
          setUserInfo(userData);
        } catch (error) {
          console.error('Error al obtener la información del usuario:', error);
        }
      }
    };

    fetchUserInfo(); 
  }, [userToken]); 

  useEffect(() => {
    const fetchChats = async () => {
      if (!userInfo || !Array.isArray(userInfo) || userInfo.length === 0) {
        console.error('UserInfo is not available or empty:', userInfo);
        return;
      }

      try {
        const chats = await getChatMessages();
        
        if (Array.isArray(chats)) {
          const userId = userInfo[0].id; 
          const filteredChats = chats.filter(chat => 
            chat.users.some(user => user.id === userId)
          );
          setChatList(filteredChats);
        } else {
          console.error('Expected chats to be an array, but got:', chats);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats(); // Solo se llama después de que userInfo se haya establecido
  }, [userInfo]); 

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Lista de chats (lado izquierdo) */}
      <div style={{
        width: '30%',
        backgroundColor: '#2C2C2C',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #ddd',
        padding: '10px',
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          flex: 1,
          overflowY: 'auto',
          borderRadius: '10px',
          backgroundColor: '#333',
          padding: '10px',
        }}>
          {chatList.map((chat, index) => {
            const otherUser = chat.users.find(user => user.id !== userInfo[0]?.id);
            return (
              <div 
                key={index} 
                style={{
                  marginBottom: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#444',
                  padding: '15px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onClick={() => handleOpenChat(chat.id)}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#555'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#444'}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>
                    {otherUser?.username || 'Usuario no encontrado'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Área principal de chat */}
      <div style={{ 
        width: '70%', 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: activeChat ? '#E5DDD5' : '#D3D3D3' 
      }}>
        {/* Barra de información del chat */}
        <div style={{
          padding: '15px',
          backgroundColor: '#34495e', 
          color: 'white',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: '10px 10px 0 0' 
        }}>
          <div>
            {activeChat ? 
              (activeChat.users.find(userId => userId !== userInfo[0]?.id) ? 
                activeChat.users.find(userId => userId !== userInfo[0]?.id)?.username || 'Usuario no encontrado' 
              : 'Chat activo')
            : 'No hay ningún chat abierto'}
          </div>
          <div>{new Date().toLocaleTimeString()}</div> 
        </div>

        {/* Área de mensajes */}
        <div style={{ 
          flex: 1, 
          padding: '15px', 
          overflowY: 'auto', 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'space-between',
          opacity: activeChat ? 1 : 0.5, 
        }}>
          {activeChat ? (
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {activeMessages.map((msg, index) => (
                <Chats 
                  key={index}
                  username={msg.user.username}
                  message={msg.message}
                  time={new Date(msg.timestamp).toLocaleTimeString()}
                  isOwnMessage={msg.user.id === userInfo[0]?.id} 
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>
              Abre un chat para comenzar
            </div>
          )}
        </div>

        {/* Input para enviar mensajes */}
        {activeChat && (
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <input 
              type="text" 
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)} 
              placeholder="Escribe un mensaje..." 
              style={{ 
                flex: 1, 
                padding: '10px', 
                borderRadius: '20px', 
                border: 'none', 
                backgroundColor: '#F5F5F5' 
              }} 
            />
            <button onClick={() => handleSendMessage()} style={{ 
              marginLeft: '10px', 
              padding: '10px', 
              backgroundColor: '#128C7E', 
              borderRadius: '50%', 
              border: 'none', 
              color: 'white',
              cursor: 'pointer',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.3s ease',
            }} 
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#0f7868'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = '#128C7E'}
            >
              <div style={{
                width: '0', 
                height: '0', 
                borderLeft: '10px solid white', 
                borderTop: '7px solid transparent',
                borderBottom: '7px solid transparent',
              }}></div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatScreen;
