// PriorityDistributionChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Registrar los elementos para el gráfico de barras
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PriorityDistributionChart = ({ priorityData }) => {
    const data = {
        labels: ['Alta', 'Media', 'Baja'],
        datasets: [{
            label: 'Tareas',
            data: [priorityData.alta, priorityData.media, priorityData.baja],
            backgroundColor: ['#ff6384', '#ffcd56', '#4bc0c0'],
        }],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="chart-container">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Distribución de Prioridades</h3>
            <Bar data={data} options={options} />
        </div>
    );
};

export default PriorityDistributionChart;
