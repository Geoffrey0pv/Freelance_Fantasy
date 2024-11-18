import React from 'react';

const Chats = ({ username, message, time, isOwnMessage }) => { // Agregar isOwnMessage como prop

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: isOwnMessage ? 'flex-end' : 'flex-start', // Alineación dependiendo si es el propio mensaje o no
      margin: '10px 0' 
    }}>
      <div style={{ 
        backgroundColor: isOwnMessage ? '#DCF8C6' : '#FFFFFF', // Color de fondo diferente para el mensaje propio
        borderRadius: '7.5px',
        padding: '10px',
        maxWidth: '60%',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
      }}>
        <div style={{ 
          fontSize: '14px', 
          fontWeight: 'bold', 
          color: '#075E54', 
          marginBottom: '5px' 
        }}>
          {username}
        </div>
        <div style={{ fontSize: '14px', marginBottom: '5px' }}>
          {message}
        </div>
        <div style={{ 
          fontSize: '12px', 
          color: '#999', 
          textAlign: 'right' 
        }}>
          {time}
        </div>
      </div>
    </div>
  );
};

export default Chats;
