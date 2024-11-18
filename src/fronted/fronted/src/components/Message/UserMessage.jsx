import React from 'react';


const UserMessage = ({ message, time }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'flex-end', 
      margin: '10px 0' 
    }}>
      <div style={{ 
        backgroundColor: '#128C7E', 
        color: 'white',
        borderRadius: '7.5px',
        padding: '10px 15px',
        maxWidth: '60%',
        boxShadow: '0 1px 1px rgba(0, 0, 0, 0.1)',
        position: 'relative'
      }}>
        <div style={{ fontSize: '14px', marginBottom: '5px' }}>
          {message}
        </div>
        <div style={{ 
          fontSize: '12px', 
          color: '#E0E0E0', 
          textAlign: 'right',
          fontWeight: '300',
        }}>
          {time}
        </div>
      </div>
    </div>
  );
};

export default UserMessage;