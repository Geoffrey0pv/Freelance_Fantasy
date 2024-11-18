// TaskDistributionChart.jsx
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Registrar los elementos necesarios para el gráfico de dona
ChartJS.register(ArcElement, Tooltip, Legend);

const TaskDistributionChart = ({ taskData }) => {
    const data = {
        labels: ['Por Empezar', 'En Proceso', 'Completado'],
        datasets: [{
            data: [taskData.porEmpezar, taskData.enProceso, taskData.completado],
            backgroundColor: ['rgba(255,205,86,0.99)', '#6fb3de', '#acd295'],
            hoverBackgroundColor: ['#ffce56', '#36a2eb', '#71c543'],
        }],
    };

    return (
        <div className="chart-container">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribución de Tareas por Estado</h3>
            <Doughnut data={data} />
        </div>
    );
};

export default TaskDistributionChart;