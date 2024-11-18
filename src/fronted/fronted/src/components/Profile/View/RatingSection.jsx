import React from 'react';

const RatingSection = ({ rating }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900">Calificaciones</h2>
      {rating && rating.average ? (
        <div>
          <p className="text-yellow-400">Promedio de calificación: {rating.average} / 5</p>
          {rating.reviews && rating.reviews.length > 0 ? (
            rating.reviews.map((review, index) => (
              <div key={index} className="mt-4">
                <p className="text-gray-800">{review.review}</p>
                <p className="text-yellow-400">Calificación: {review.rating}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No hay comentarios disponibles.</p>
          )}
        </div>
      ) : (
        <p className="text-gray-600">No hay calificaciones disponibles.</p>
      )}
    </div>
  );
};

export default RatingSection;
