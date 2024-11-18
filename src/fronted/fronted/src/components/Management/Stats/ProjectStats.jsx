// ProjectStats.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTaskStatsByProject } from '@/redux/actions/taskActions';
import { fetchMilestoneStatsByProject } from '@/redux/actions/milestoneActions';
import ProjectService from '@/service/projectService'; // Importa el servicio para obtener los costos
import ProgressBar from './ProgressBar';
import TaskDistributionChart from './TaskDistributionChart';
import PriorityDistributionChart from './PriorityDistributionChart';

const ProjectStats = ({ projectId }) => {
    const dispatch = useDispatch();

    // Estado local para almacenar el presupuesto y el costo actual
    const [costData, setCostData] = useState({ budget: 0, actual_cost: 0 });

    // Selección de stats del estado de Redux
    const {
        totalTasks = 0,
        completedTasks = 0,
        inProgressTasks = 0,
        notStartedTasks = 0,
        highPriorityTasks = 0,
        mediumPriorityTasks = 0,
        lowPriorityTasks = 0,
    } = useSelector(state => state.taskStats);

    const { stats: { completedMilestones = 0, totalMilestones = 0 } = {} } = useSelector(state => state.milestoneList);

    useEffect(() => {
        if (projectId) {
            dispatch(fetchTaskStatsByProject(projectId));
            dispatch(fetchMilestoneStatsByProject(projectId));
            fetchCostData(); // Llamada para obtener los datos de costos
        }
    }, [dispatch, projectId]);

    // Función para obtener los datos de costos
    const fetchCostData = async () => {
        try {
            const data = await ProjectService.getProjectCost(projectId);
            setCostData(data);
        } catch (error) {
            console.error("Error fetching project cost data:", error);
        }
    };

    const taskCompletionPercentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
    const milestoneCompletionPercentage = totalMilestones ? (completedMilestones / totalMilestones) * 100 : 0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-900 text-white rounded-lg shadow-lg">

            {/* Costo Actual del Proyecto */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold text-gray-400 mb-4">Costo Actual del Proyecto</h3>
                <p className="text-4xl font-bold text-yellow-400">${costData.actual_cost || 0}</p>
            </div>

            {/* Presupuesto del Proyecto */}
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold text-gray-400 mb-4">Presupuesto del Proyecto</h3>
                <p className="text-4xl font-bold text-green-400">${costData.budget || 0}</p>
            </div>

            {/* Progreso General */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold text-gray-300 mb-4">Progreso General</h3>
                <div className="w-full">
                    <ProgressBar label="Tareas Completadas" percentage={taskCompletionPercentage.toFixed(2)} />
                </div>
                <div className="w-full mt-4">
                    <ProgressBar label="Hitos Completados" percentage={milestoneCompletionPercentage.toFixed(2)} />
                </div>
            </div>

            {/* Distribución de Tareas */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold text-gray-300 mb-4 text-center">Distribución de Tareas por Estado</h3>
                <TaskDistributionChart taskData={{ porEmpezar: notStartedTasks, enProceso: inProgressTasks, completado: completedTasks }} />
            </div>

            {/* Distribución de Prioridades */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
                <h3 className="text-lg font-semibold text-gray-300 mb-4 text-center">Distribución de Prioridades</h3>
                <PriorityDistributionChart priorityData={{ alta: highPriorityTasks, media: mediumPriorityTasks, baja: lowPriorityTasks }} />
            </div>
        </div>
    );
};

export default ProjectStats;
