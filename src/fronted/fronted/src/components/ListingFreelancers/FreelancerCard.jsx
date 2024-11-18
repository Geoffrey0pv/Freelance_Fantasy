import React from "react";

const FreelancerCard = ({ freelancer, onViewMore }) => {
  const baseUrl = "http://127.0.0.1:8000"; // Define la base URL

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center transition-transform hover:scale-105">
      {/* Imagen del freelancer */}
      <img
        src={`${baseUrl}${freelancer.profile_image}`} // Construye la URL absoluta
        alt={freelancer.username}
        className="w-20 h-20 rounded-full border-2 border-blue-500 shadow-md" // Imagen más pequeña
      />

      {/* Información del freelancer */}
      <div className="text-center mt-2">
        <h3 className="text-lg font-medium text-black">{freelancer.username}</h3>
        <p className="text-xs text-black">{freelancer.country}</p>
        <div className="flex justify-center items-center mt-2">
          <span className="text-yellow-500 text-sm">
            {"★".repeat(Math.round(freelancer.rating))}
            {"☆".repeat(5 - Math.round(freelancer.rating))}
          </span>
        </div>
        <button
          onClick={onViewMore}
          className="mt-3 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-all"
        >
          Ver más
        </button>
      </div>
    </div>
  );
};

export default FreelancerCard;
