import React, { useEffect, useState } from 'react';
import ProjectService from '@/service/projectService';

const ProjectCostStats = ({ projectId }) => {
    const [costData, setCostData] = useState({ budget: 0, actual_cost: 0 });

    useEffect(() => {
        const fetchCostData = async () => {
            try {
                const data = await ProjectService.getProjectCost(projectId);
                setCostData(data);
            } catch (error) {
                console.error("Error fetching project cost data:", error);
            }
        };
        fetchCostData();
    }, [projectId]);

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-400">Costo del Proyecto</h3>
            <p className="text-gray-300">Presupuesto Total: ${costData.budget}</p>
            <p className="text-gray-300">Costo Actual: ${costData.actual_cost}</p>
        </div>
    );
};

export default ProjectCostStats;
