import React from 'react';

const ViewProfileImageSection = ({ profileImage, coverImage }) => {
  return (
    <div className="relative w-full h-48 bg-gray-300 rounded-lg shadow-lg">
      {coverImage ? (
        <img
          src={coverImage}
          alt="Portada"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <div className="w-full h-full bg-gray-300 rounded-lg"></div>
      )}

      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 w-24 h-24 rounded-full border-4 border-gray-300 overflow-hidden">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Perfil"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-400"></div>
        )}
      </div>
    </div>
  );
};

export default ViewProfileImageSection;