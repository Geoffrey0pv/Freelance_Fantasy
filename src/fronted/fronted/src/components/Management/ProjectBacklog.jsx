import React from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTable from './DataTable';
import CustomKanban from './Kanban/CustomKanban.jsx';
import ProjectStats from './Stats/ProjectStats';
import CommentSection from './Comments/CommentSection';
import CreateMilestoneDrawer from './Drawers/CreateMilestoneDrawer'; // Importa el drawer para milestones
import CreateTaskDrawer from './Drawers/CreateTaskDrawer'; // Importa el drawer para tasks

{/* Pestaña de Comentarios */}
const ProjectBacklog = () => {
    const { projectId } = useParams();

    return (
        <div className="min-h-screen flex justify-center items-start bg-transparent py-8 px-4">
            <div className="w-full max-w-6xl bg-white bg-opacity-95 rounded-lg shadow-lg p-6">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                    Detalles del Proyecto {projectId}
                </h1>

                {/* Botones para abrir los drawers */}
                <div className="flex justify-end space-x-4 mb-4">
                    <CreateMilestoneDrawer projectId={projectId} />
                    <CreateTaskDrawer projectId={projectId} />
                </div>

                <Tabs defaultValue="tasks" className="text-gray-900">
                    <TabsList className="bg-gray-200 flex justify-center w-full rounded-lg mb-4 overflow-hidden">
                        <TabsTrigger value="tasks" className="px-4 py-2 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400">
                            Tareas
                        </TabsTrigger>
                        <TabsTrigger value="stats" className="px-4 py-2 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400">
                            Estadísticas
                        </TabsTrigger>
                        <TabsTrigger value="comments" className="px-4 py-2 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-400">
                            Comentarios
                        </TabsTrigger>
                    </TabsList>

                    {/* Pestaña de Tareas */}
                    <TabsContent value="tasks" className="mt-4 space-y-8">
                        <div className="bg-gray-50 rounded-lg p-6 shadow-md overflow-hidden">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Kanban</h2>
                            <CustomKanban projectId={projectId} />
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6 shadow-md overflow-hidden">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Backlog</h2>
                            <DataTable projectId={projectId} />
                        </div>
                    </TabsContent>

                    {/* Pestaña de Estadísticas */}
                    <TabsContent value="stats" className="mt-4">
                        <div className="bg-gray-50 rounded-lg p-6 shadow-md overflow-hidden">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Estadísticas del Proyecto</h2>
                            <ProjectStats projectId={projectId} />
                        </div>
                    </TabsContent>

                    {/* Pestaña de Comentarios */}
                    <TabsContent value="comments" className="mt-4">
                        <div className="bg-gray-50 rounded-lg p-6 shadow-md overflow-hidden">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comentarios del Proyecto</h2>
                            <CommentSection projectId={projectId} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default ProjectBacklog;