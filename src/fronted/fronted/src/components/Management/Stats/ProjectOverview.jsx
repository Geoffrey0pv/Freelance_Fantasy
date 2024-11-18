// En tu vista principal de proyecto
import React from 'react';
import ProjectStats from "./ProjectStats.jsx";

// Supongamos que `projectTasks` y `projectMilestones` son los arrays de tareas y hitos
const ProjectOverview = ({ projectTasks, projectMilestones }) => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold mb-8">Vista General del Proyecto</h1>
            <ProjectStats tasks={projectTasks} milestones={projectMilestones} />
            {/* Aquí puedes incluir otras secciones de tu vista de proyecto */}
        </div>
    );
};

export default ProjectOverview;