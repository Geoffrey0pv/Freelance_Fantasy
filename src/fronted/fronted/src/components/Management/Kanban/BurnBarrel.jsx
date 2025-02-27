// Kanban/BurnBarrel.jsx
import React, { useState } from 'react';
import { FiTrash } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';

const BurnBarrel = ({ setCards }) => {
    const [active, setActive] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDrop = (e) => {
        const cardId = e.dataTransfer.getData("cardId");
        setCards(prev => prev.filter(c => c.id !== cardId));
        setActive(false);
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`mt-10 grid h-56 w-56 place-content-center rounded border text-3xl ${
                active ? "border-red-800 bg-red-800/20 text-red-500" : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
            }`}
        >
            {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
        </div>
    );
};

export default BurnBarrel;
