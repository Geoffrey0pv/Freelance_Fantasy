// CommentSection.jsx
import React from 'react';
import CommentInput from './CommentInput';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'; // Import your Tabs components

const CommentSection = ({ projectId, milestoneId, taskId }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Comentarios</h2>
            <Tabs defaultValue="project">
                <TabsList className="flex justify-center bg-gray-200 rounded-lg mb-4">
                    <TabsTrigger value="project" className="px-4 py-2">Comentarios de Proyecto</TabsTrigger>
                    <TabsTrigger value="milestone" className="px-4 py-2">Comentarios de Hito</TabsTrigger>
                    <TabsTrigger value="task" className="px-4 py-2">Comentarios de Tarea</TabsTrigger>
                </TabsList>

                <TabsContent value="project">
                    <div className="mb-4">
                        <p className="text-gray-600">Comentarios relacionados al proyecto.</p>
                        {/* Render project-specific comments here */}
                    </div>
                    <CommentInput projectId={projectId} activeTab="project" />
                </TabsContent>

                <TabsContent value="milestone">
                    <div className="mb-4">
                        <p className="text-gray-600">Comentarios relacionados al hito.</p>
                        {/* Render milestone-specific comments here */}
                    </div>
                    <CommentInput milestoneId={milestoneId} activeTab="milestone" />
                </TabsContent>

                <TabsContent value="task">
                    <div className="mb-4">
                        <p className="text-gray-600">Comentarios relacionados a la tarea.</p>
                        {/* Render task-specific comments here */}
                    </div>
                    <CommentInput taskId={taskId} activeTab="task" />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default CommentSection;
