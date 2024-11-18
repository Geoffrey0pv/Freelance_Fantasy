import React, { useEffect, useState } from 'react'; 
import { getUserInfoService } from '@/service/userService';
import { getProjectsByWorker, getProjectsByOwner } from '@/service/payingService'; 
import { useSelector } from 'react-redux';
import PDFGenerator from '@/components/Payments/PDFGenerator'; 

const PayingScreen = () => {
    const { userLogin: { userInfo: userToken } } = useSelector((state) => state);
    const [userInfo, setUserInfo] = useState(null); 
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (userToken && userToken.access) {
                try {
                    const userData = await getUserInfoService(userToken.access);
                    const user = userData[0];

                    if (user && user.id) {
                        setUserInfo(user);
                        const workerProjects = await getProjectsByWorker(user.id);
                        const ownerProjects = await getProjectsByOwner(user.id);

                        const combinedProjects = [
                            ...workerProjects.map(project => ({ ...project, role: 'worker' })),
                            ...ownerProjects.map(project => ({ ...project, role: 'owner' }))
                        ];
                        setProjects(combinedProjects);
                    } else {
                        console.error('userData es nulo o no tiene id:', userData);
                    }
                } catch (error) {
                    console.error('Error al obtener la información del usuario:', error);
                }
            }
        };

        fetchUserInfo(); 
    }, [userToken]);

    useEffect(() => {
        if (selectedProject) {
            const project = projects.find(p => p.id === parseInt(selectedProject));
            if (project && project.milestones) {
                const allTasks = project.milestones.flatMap(milestone => milestone.tasks);
                setTasks(allTasks);
            } else {
                setTasks([]);
            }
        } else {
            setTasks([]);
        }
    }, [selectedProject, projects]);

    const invoices = selectedProject ? tasks.map((task, index) => ({
        id: index + 1,
        name: task.title,
        amount: "$0.00", 
        status: "Pendiente", 
    })) : [];

    return (
        <div className="flex justify-center min-h-screen bg-zinc-950 py-6">
            <div className="relative flex flex-col w-full max-w-7xl bg-zinc-900 shadow-lg p-6 rounded-lg">
                
                {/* Resumen de cuenta */}
                <div className="bg-zinc-800 p-4 rounded-lg mb-6">
                    <h1 className="text-3xl font-bold text-white">Resumen de cuenta</h1>
                </div>

                {/* Selección de proyecto */}
                <div className="mb-6">
                    <label htmlFor="projectSelect" className="text-gray-300 text-lg">Selecciona un proyecto:</label>
                    <select
                        id="projectSelect"
                        className="bg-zinc-800 text-white p-2 rounded mt-2 w-full"
                        onChange={(e) => {
                            setSelectedProject(e.target.value);
                            setSelectedInvoice(null);
                        }}
                    >
                        <option value="">-- Selecciona un proyecto --</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.title} ({project.role})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col md:flex-row w-full mt-6 space-y-6 md:space-y-0 md:space-x-8">
                    {/* Registro de Facturas */}
                    <div className="w-full md:w-1/3 bg-zinc-800 p-6 shadow-md rounded-lg">
                        <h2 className="text-2xl font-semibold text-white mb-4">Registro de Facturas</h2>
                        {selectedProject ? (
                            invoices.length > 0 ? (
                                invoices.map(invoice => (
                                    <div 
                                        key={invoice.id} 
                                        onClick={() => setSelectedInvoice(invoice)} 
                                        className="flex justify-between items-center p-3 mb-3 bg-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-600"
                                    >
                                        <div>
                                            <span className="font-bold text-white">{invoice.name}</span>
                                            <p className="text-gray-400">{invoice.amount}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-sm ${
                                            invoice.status === "Pagada" 
                                            ? "bg-green-500 text-white" 
                                            : "bg-orange-500 text-white"
                                        }`}>
                                            {invoice.status}
                                        </span>
                                    </div>
                                ))
                            ) : <p className="text-gray-400">No hay facturas disponibles para este proyecto.</p>
                        ) : <p className="text-gray-400">Selecciona un proyecto para ver sus facturas.</p>}
                    </div>

                    {/* Detalles de Pago y Tareas del Proyecto */}
                    <div className="w-full md:w-2/3 space-y-6">
                        <div className="bg-zinc-800 p-6 shadow-md rounded-lg">
                            <h2 className="text-2xl font-semibold text-white mb-4">Detalles de Pago</h2>
                            {selectedInvoice ? (
                                <div className="p-4 bg-zinc-700 rounded-lg">
                                    <p className="font-bold text-gray-300">Destinatario del Pago:</p>
                                    <p className="text-gray-400 mb-2">
                                        {projects.find(p => p.id === parseInt(selectedProject))?.worker.username || "Nombre no disponible"}
                                    </p>
                                    <p className="font-bold text-gray-300">Emisor del Pago:</p>
                                    <p className="text-gray-400 mb-2">
                                        {projects.find(p => p.id === parseInt(selectedProject))?.user.username || "Nombre no disponible"}
                                    </p>
                                    <p className="font-bold text-gray-300">Total a pagar:</p>
                                    <p className="text-gray-400 mb-2">{selectedInvoice.price}</p>
                                    <p className="font-bold text-gray-300">Estado:</p>
                                    <p className="text-gray-400 mb-4">{selectedInvoice.status}</p>
                                    <PDFGenerator 
                                        selectedInvoice={selectedInvoice} 
                                        recipientName={projects.find(p => p.id === parseInt(selectedProject))?.worker.username || "Nombre no disponible"} 
                                        senderName={projects.find(p => p.id === parseInt(selectedProject))?.user.username || "Nombre no disponible"} 
                                    />
                                </div>
                            ) : <p className="text-gray-400">Selecciona una factura para ver los detalles.</p>}
                        </div>

                        <div className="bg-zinc-800 p-6 shadow-md rounded-lg">
                            <h2 className="text-2xl font-semibold text-white mb-4">Tareas del Proyecto</h2>
                            {tasks.length > 0 ? (
                                tasks.map(task => (
                                    <div key={task.id} className="p-3 bg-zinc-700 rounded-lg mb-3">
                                        <h3 className="font-semibold text-white">{task.title}</h3>
                                        <p className="text-gray-400">{task.description}</p>
                                    </div>
                                ))
                            ) : <p className="text-gray-400">No hay tareas disponibles para este proyecto.</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayingScreen;
