import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOwnedProjects, listWorkingProjects } from '../../redux/actions/projectActions.js';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManagementCard from './ManagementCard';
import { useNavigate } from 'react-router-dom';
import { CreateProjectForm } from './CreateProjectForm'; 

const YourProjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { projects: ownedProjects, loading: loadingOwned } = useSelector(state => state.projectOwnedList);
    const { projects: workingProjects, loading: loadingWorking } = useSelector(state => state.projectWorkingList);

    useEffect(() => {
        dispatch(listOwnedProjects());
        dispatch(listWorkingProjects());
    }, [dispatch]);

    const adminClick = (projectId) => {
        navigate(`/profile/project/${projectId}/backlog`);
    };

    return (
        <div className="min-h-screen flex justify-center items-start bg-zinc-950 py-8 px-4">
            <div className="w-full max-w-6xl bg-zinc-900 rounded-lg shadow-lg p-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                    Tus Proyectos
                </h1>
                <Separator className="w-full bg-zinc-700 mb-6" />

                <Tabs defaultValue="Tus proyectos" className="text-white">
                    <TabsList className="bg-zinc-800 flex justify-center w-full rounded-lg mb-4">
                        <TabsTrigger value="Tus proyectos" className="px-4 py-2 text-gray-300 hover:bg-zinc-700 focus:outline-none focus:ring focus:ring-gray-500">
                            Mis Creaciones
                        </TabsTrigger>
                        <TabsTrigger value="Tu chamba" className="px-4 py-2 text-gray-300 hover:bg-zinc-700 focus:outline-none focus:ring focus:ring-gray-500">
                            Trabajos Actuales
                        </TabsTrigger>
                        <TabsTrigger value="Crear Projectos" className="px-4 py-2 text-gray-300 hover:bg-zinc-700 focus:outline-none focus:ring focus:ring-gray-500">
                            Crear Proyectos
                        </TabsTrigger>
                    </TabsList>

                    {/* Pestaña Mis Creaciones */}
                    <TabsContent value="Tus proyectos" className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {loadingOwned ? (
                            <p className="text-center text-gray-400">Cargando proyectos...</p>
                        ) : (
                            ownedProjects.map(project => (
                                <ManagementCard
                                    key={project.id}
                                    title={project.title}
                                    status={project.active ? 'active' : 'finished'}
                                    bannerUrl={project.photo}
                                    button_text="Administrar"
                                    onclick={() => adminClick(project.id)}
                                />
                            ))
                        )}
                    </TabsContent>

                    {/* Pestaña Trabajos Actuales */}
                    <TabsContent value="Tu chamba" className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {loadingWorking ? (
                            <p className="text-center text-gray-400">Cargando trabajos...</p>
                        ) : (
                            workingProjects.map(project => (
                                <ManagementCard
                                    key={project.id}
                                    title={project.title}
                                    status={project.active ? 'active' : 'finished'}
                                    bannerUrl={project.photo}
                                    button_text="Trabajar"
                                />
                            ))
                        )}
                    </TabsContent>

                    {/* Pestaña Crear Proyectos */}
                    <TabsContent value="Crear Projectos" className="p-4">
                        <h2 className="text-2xl font-semibold text-white mb-4">Crear un Nuevo Proyecto</h2>
                        <CreateProjectForm />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default YourProjects;
