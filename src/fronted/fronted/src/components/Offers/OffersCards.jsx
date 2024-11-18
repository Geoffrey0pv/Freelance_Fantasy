import React from 'react';

const OfferCard = ({
  offer,
  project,
  isOwner,
  onAccept,
  onReject,
  onViewProfile,
  showAcceptRejectButtons,
  undoOffer,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold">{offer.title}</h3>
      <p>{offer.description}</p>
      <p className="text-sm text-gray-600">Presupuesto: ${offer.budget_offer}</p>
      <p className="text-sm text-gray-600">
        Fecha de presentación: {new Date(offer.date_submission).toLocaleDateString()}
      </p>

     {/* Mostrar el estado de la oferta */}
     <p className="text-sm text-gray-600 mt-2">
        Estado: {offer.status === null ? 'Aún no ha sido revisada' : offer.status ? 'Aceptada' : 'Rechazada'}
      </p>

      {/* Botones de Aceptar y Rechazar */}
      {isOwner && !offer.is_reviewed && showAcceptRejectButtons && (
        <div className="mt-4 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => onAccept(offer, project)}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 w-full sm:w-auto"
          >
            Aceptar
          </button>
          <button
            type="button"
            onClick={() => onReject(offer, project)}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400 w-full sm:w-auto"
          >
            Rechazar
          </button>
        </div>
      )}

      {/* Mostrar botón "Deshacer oferta" solo si la oferta fue revisada */}
      {offer.is_reviewed && isOwner && (
        <div className="mt-4 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={() => undoOffer(offer, project)}
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-400 w-full sm:w-auto"
          >
            Deshacer oferta
          </button>
        </div>
      )}

      {/* Mostrar el botón "Ver perfil" solo si isOwner es true */}
      {isOwner && (
        <button
          type="button"
          onClick={() => onViewProfile(offer.user.id)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 w-full sm:w-auto mt-4"
        >
          Ver perfil
        </button>
      )}
    </div>
  );
};

export default OfferCard;
