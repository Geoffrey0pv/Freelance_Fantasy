
// Board.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMilestonesByProject, listTasksByProject } from '../../../redux/actions/taskActions';
import Column from './Column';
import BurnBarrel from './BurnBarrel';

const Board = ({ projectId }) => {
    const dispatch = useDispatch();
    const { milestones, loading: milestonesLoading, error: milestonesError } = useSelector(state => state.milestoneList);
    const { tasks, loading: tasksLoading, error: tasksError } = useSelector(state => state.taskList);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (projectId) {
            dispatch(listMilestonesByProject(projectId));
            dispatch(listTasksByProject(projectId));
        }
    }, [dispatch, projectId]);

    useEffect(() => {
        setCards(tasks);
    }, [tasks]);

    if (milestonesLoading || tasksLoading) return <p className="text-center text-gray-400">Loading data...</p>;
    if (milestonesError) return <p className="text-center text-red-500">Error loading milestones: {milestonesError}</p>;
    if (tasksError) return <p className="text-center text-red-500">Error loading tasks: {tasksError}</p>;

    // Mapeo de `status` a las columnas restantes de Kanban
    const statusToColumnMap = {
        'todo': 'todo',
        'en-proceso': 'doing',
        'finalizado': 'done',
    };

    // Filtrar tasks por `status` para las columnas "To Do", "In Progress", y "Complete"
    const todoTasks = cards.filter(task => statusToColumnMap[task.status] === "todo");
    const inProgressTasks = cards.filter(task => statusToColumnMap[task.status] === "doing");
    const completeTasks = cards.filter(task => statusToColumnMap[task.status] === "done");

    return (
        <div className="max-w-5xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Column
                title="To Do"
                column="todo"
                headingColor="text-yellow-300"
                bgColor="bg-gray-800"
                cards={todoTasks}
                setCards={setCards}
                projectId={projectId}
            />
            <Column
                title="In Progress"
                column="doing"
                headingColor="text-blue-300"
                bgColor="bg-gray-800"
                cards={inProgressTasks}
                setCards={setCards}
                projectId={projectId}
            />
            <Column
                title="Complete"
                column="done"
                headingColor="text-green-300"
                bgColor="bg-gray-800"
                cards={completeTasks}
                setCards={setCards}
                projectId={projectId}
            />
            <BurnBarrel setCards={setCards} />
        </div>
    );
};

export default Board;;