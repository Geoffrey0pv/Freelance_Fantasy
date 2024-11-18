
import React from 'react';

const ProgressBar = ({ label, percentage }) => {
    // Función para determinar el color de la barra basado en el porcentaje
    const getProgressColor = (percentage) => {
        if (percentage <= 30) return 'bg-red-500';
        if (percentage <= 70) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="my-6">
            {/* Etiqueta y porcentaje */}
            <div className="flex justify-between mb-2">
                <span className="font-semibold text-gray-700">{label}</span>
                <span className="font-semibold text-gray-700">{percentage}%</span>
            </div>

            {/* Barra de progreso con animación */}
            <div className="w-full bg-gray-300 rounded-full h-5 shadow-inner overflow-hidden">
                <div
                    className={`h-5 rounded-full transition-all duration-700 ${getProgressColor(percentage)}`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default ProgressBar;