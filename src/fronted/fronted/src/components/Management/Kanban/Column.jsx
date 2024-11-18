// Column.jsx
import React, { useState } from 'react';
import Card from './Card';
import AddCard from './AddCard';
import ProjectService from '../../../service/projectService.js';

const Column = ({ title, headingColor, bgColor, cards, column, setCards, milestones }) => {
    const [isActive, setIsActive] = useState(false);

    const handleDragStart = (e, card) => {
        e.dataTransfer.setData("cardId", card.id);
    };

    const handleDragEnd = () => {
        setIsActive(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsActive(true);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsActive(false);
        const cardId = e.dataTransfer.getData("cardId");
        const newStatus = getColumnStatus(column);

        try {
            await ProjectService.updateTaskStatus(cardId, newStatus);
            setCards(prevCards =>
                prevCards.map(card =>
                    card.id === parseInt(cardId)
                        ? { ...card, column, status: newStatus }
                        : card
                )
            );
        } catch (error) {
            console.error('Error al actualizar el estado de la tarea:', error);
        }
    };

    const getColumnStatus = (column) => {
        switch (column) {
            case 'backlog':
                return 'por-empezar';
            case 'todo':
                return 'todo';
            case 'doing':
                return 'en-proceso';
            case 'done':
                return 'finalizado';
            default:
                return 'por-empezar';
        }
    };

    return (
        <div className={`p-4 rounded-xl shadow-md ${bgColor} ${isActive ? 'ring-4 ring-opacity-50 ring-yellow-500' : ''} transition-all duration-200`}>
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-bold ${headingColor}`}>{title}</h3>
                <span className="text-sm text-gray-300">{cards.length}</span>
            </div>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragLeave={() => setIsActive(false)}
                className="h-full space-y-3"
            >
                {cards.map((card) => (
                    <Card
                        key={card.id}
                        {...card}
                        handleDragStart={handleDragStart}
                    />
                ))}
                <AddCard column={column} setCards={setCards} milestones={milestones} />
            </div>
        </div>
    );
};

export default Column;