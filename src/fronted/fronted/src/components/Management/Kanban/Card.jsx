// Card.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ title, description, start_date, finish_date, priority, id, column, handleDragStart }) => {
    const priorityColorMap = {
        baja: 'text-green-400',
        media: 'text-yellow-400',
        alta: 'text-red-400',
    };

    return (
        <motion.div
            layout
            layoutId={id.toString()}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, { title, id, column })}
            className="cursor-grab rounded-lg border border-neutral-700 bg-neutral-800 p-4 shadow-lg transition-transform transform hover:scale-105"
        >
            <h3 className="text-base md:text-lg font-semibold text-neutral-100 text-justify">{title}</h3> {/* Tamaño ajustable para el título */}

            <p className="text-sm md:text-base text-neutral-400 mt-2 line-clamp-3 text-justify"> {/* Tamaño ajustable para la descripción */}
                {description}
            </p>

            <div className="text-xs md:text-sm text-neutral-500 mt-3">
                <p>Inicio: <span className="font-medium text-neutral-300">{start_date}</span></p>
                <p>Fin: <span className="font-medium text-neutral-300">{finish_date}</span></p>
            </div>

            <div className={`mt-3 text-xs md:text-sm font-semibold ${priorityColorMap[priority]} uppercase`}>
                Prioridad: {priority}
            </div>
        </motion.div>
    );
};

export default Card;
