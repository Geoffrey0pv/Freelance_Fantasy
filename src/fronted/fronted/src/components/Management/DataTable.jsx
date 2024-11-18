import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { listTasksByProject } from '@/redux/actions/taskActions';
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function DataTable({ projectId }) {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector(state => state.taskList);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(listTasksByProject(projectId));
    }, [dispatch, projectId]);

    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p className="text-center text-gray-400">Cargando tareas...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="bg-gray-900 p-4 sm:p-6 rounded-xl shadow-2xl text-white max-w-7xl mx-auto mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
                <h2 className="text-2xl sm:text-3xl font-semibold text-white">Lista de Tareas</h2>
                <Input
                    placeholder="Buscar tareas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-10 w-full sm:w-64 bg-gray-800 border border-gray-600 rounded-lg placeholder-gray-500 text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
                />
            </div>

            {filteredTasks.length === 0 ? (
                <p className="text-center text-gray-500">No hay tareas disponibles para este proyecto.</p>
            ) : (
                <div className="overflow-x-auto">
                    <Table className="min-w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                        <TableHeader>
                            <TableRow className="bg-gray-700 text-white">
                                <TableHead className="p-4 hidden sm:table-cell">Seleccionar</TableHead>
                                <TableHead className="text-center">Título</TableHead>
                                <TableHead className="text-center hidden sm:table-cell">Estado</TableHead>
                                <TableHead className="text-center hidden md:table-cell">Prioridad</TableHead>
                                <TableHead className="text-center">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTasks.map((task) => (
                                <TableRow key={task.id} className="hover:bg-gray-600 transition duration-200 ease-in-out">
                                    <TableCell className="p-4 text-center hidden sm:table-cell">
                                        <Checkbox aria-label="Seleccionar fila" />
                                    </TableCell>
                                    <TableCell className="p-4 font-semibold text-white text-center">{task.title}</TableCell>
                                    <TableCell className="p-4 text-center hidden sm:table-cell">
                                        <Badge variant={getStatusVariant(task.status)} className="px-2 py-1 rounded-full font-semibold text-xs">
                                            {getStatusLabel(task.status)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="p-4 text-center hidden md:table-cell">
                                        <Badge variant={getPriorityVariant(task.priority)} className="px-2 py-1 rounded-full font-semibold text-xs">
                                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="p-4 text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-gray-700 rounded-full transition duration-200 ease-in-out">
                                                    ⋮
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="bg-gray-800 text-white border border-gray-600 rounded-lg shadow-lg">
                                                <DropdownMenuItem onClick={() => handleEdit(task.id)} className="hover:bg-indigo-500 transition duration-150 ease-in-out">
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleDelete(task.id)} className="hover:bg-red-500 transition duration-150 ease-in-out">
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}

// Funciones de utilidad para asignar variantes de estilo a los badges
const getStatusVariant = (status) => {
    switch (status) {
        case 'en-proceso':
            return 'bg-yellow-600';
        case 'finalizado':
            return 'bg-green-600';
        case 'por-empezar':
            return 'bg-blue-600';
        case 'cancelado':
            return 'bg-red-600';
        default:
            return 'bg-gray-600';
    }
};

// Función para mostrar etiquetas de estado con mejor formato
const getStatusLabel = (status) => {
    switch (status) {
        case 'en-proceso':
            return 'En Proceso';
        case 'finalizado':
            return 'Finalizado';
        case 'por-empezar':
            return 'Por Empezar';
        case 'cancelado':
            return 'Cancelado';
        default:
            return 'Desconocido';
    }
};

const getPriorityVariant = (priority) => {
    switch (priority) {
        case 'alta':
            return 'bg-red-600';
        case 'media':
            return 'bg-yellow-600';
        case 'baja':
            return 'bg-green-600';
        default:
            return 'bg-gray-600';
    }
};

// Ejemplo de funciones para editar y eliminar tareas
const handleEdit = (taskId) => {
    console.log(`Editar tarea con ID: ${taskId}`);
};

const handleDelete = (taskId) => {
    console.log(`Eliminar tarea con ID: ${taskId}`);
};

export default DataTable;
