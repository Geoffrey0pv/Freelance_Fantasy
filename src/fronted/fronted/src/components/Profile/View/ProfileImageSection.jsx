import React from 'react';

const ViewProfileImageSection = ({ profileImage, coverImage }) => {
  const baseUrl = "https://freelancefantasy-backend-dfbte3d4f0csd5bc.westus-01.azurewebsites.net"; // Define la base URL
  const cleanedBannerUrl1 = profileImage.replace("users/profile/", "");
  const cleanedBannerUrl2 = coverImage.replace("users/profile/", "");
  return (
    <div className="relative w-full h-48 bg-gray-300 rounded-lg shadow-lg">
      {coverImage ? (
        <img
          src={cleanedBannerUrl1}
          alt="Portada"
          className="w-full h-full object-cover rounded-lg"
        />
      ) : (
        <div className="w-full h-full bg-gray-300 rounded-lg"></div>
      )}

      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 w-24 h-24 rounded-full border-4 border-gray-300 overflow-hidden">
        {profileImage ? (
          <img
            src={cleanedBannerUrl2}
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