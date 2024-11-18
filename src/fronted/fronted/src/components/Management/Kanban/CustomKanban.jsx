// Kanban/CustomKanban.jsx
import React from 'react';
import Board from './Board';

const CustomKanban = ({ projectId }) => {
    return (
        <div className="h-screen w-full  text-neutral-900">
            <Board projectId={projectId} />
        </div>
    );
};

export default CustomKanban;