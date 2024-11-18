import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {createTask, listMilestonesByProject} from '../../redux/actions/taskActions';
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";

export const CustomKanban = ({ projectId }) => {
    return (
        <div className="h-screen w-full bg-white text-neutral-900">
            <Board projectId={projectId} />
        </div>
    );
};

const Board = ({ projectId }) => {
    const dispatch = useDispatch();
    const { milestones, loading, error } = useSelector(state => state.milestoneList);  // Añadimos loading y error si es necesario
    const [cards, setCards] = useState([]);  // Empezamos con un array vacío

    useEffect(() => {
        if (projectId) {
            dispatch(listMilestonesByProject(projectId));
        }
    }, [dispatch, projectId]);

    if (loading) return <p>Loading milestones...</p>;
    if (error) return <p>Error loading milestones: {error}</p>;

    return (
        <div className="flex h-full w-full gap-3 overflow-x-auto p-12">
            {/* Renderizamos las columnas del Kanban */}
            <Column
                title="Backlog"
                column="backlog"
                headingColor="text-neutral-600"
                cards={cards}
                setCards={setCards}
                milestones={milestones}  // Pasamos los milestones a las columnas
            />
            <Column
                title="TODO"
                column="todo"
                headingColor="text-yellow-400"
                cards={cards}
                setCards={setCards}
            />
            <Column
                title="In progress"
                column="doing"
                headingColor="text-blue-400"
                cards={cards}
                setCards={setCards}
            />
            <Column
                title="Complete"
                column="done"
                headingColor="text-emerald-400"
                cards={cards}
                setCards={setCards}
            />
            {/* Añadimos el contenedor para eliminar tareas */}
            <BurnBarrel setCards={setCards} />
        </div>
    );
};

export default Board;

const Column = ({title, headingColor, cards, column, setCards}) => {
    const [active, setActive] = useState(false);

    const handleDragStart = (e, card) => {
        e.dataTransfer.setData("cardId", card.id);
    };

    const handleDragEnd = (e) => {
        const cardId = e.dataTransfer.getData("cardId");

        setActive(false);
        clearHighlights();

        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        if (before !== cardId) {
            let copy = [...cards];

            let cardToTransfer = copy.find((c) => c.id === cardId);
            if (!cardToTransfer) return;
            cardToTransfer = { ...cardToTransfer, column };

            copy = copy.filter((c) => c.id !== cardId);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.id === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }

            setCards(copy);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        highlightIndicator(e);

        setActive(true);
    };

    const clearHighlights = (els) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => {
            i.style.opacity = "0";
        });
    };

    const highlightIndicator = (e) => {
        const indicators = getIndicators();

        clearHighlights(indicators);

        const el = getNearestIndicator(e, indicators);

        el.element.style.opacity = "1";
    };

    const getNearestIndicator = (e, indicators) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();

                const offset = e.clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );

        return el;
    };

    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    };

    const handleDragLeave = () => {
        clearHighlights();
        setActive(false);
    };

    const filteredCards = cards.filter((c) => c.column === column);

    return (
        <div className="w-56 shrink-0">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium ${headingColor}`}>{title}</h3>
                <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
            </div>
            <div
                onDrop={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`h-full w-full transition-colors ${
                    active ? "bg-neutral-800/50" : "bg-neutral-800/0"
                }`}
            >
                {filteredCards.map((c) => {
                    return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
                })}
                <DropIndicator beforeId={null} column={column} />
                <AddCard column={column} setCards={setCards} />
            </div>
        </div>
    );
};

const Card = ({ title, id, column, handleDragStart }) => {
    return (
        <>
            <DropIndicator beforeId={id} column={column} />
            <motion.div
                layout
                layoutId={id}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, { title, id, column })}
                className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
            >
                <p className="text-sm text-neutral-100">{title}</p>
            </motion.div>
        </>
    );
};

const DropIndicator = ({ beforeId, column }) => {
    return (
        <div
            data-before={beforeId || "-1"}
            data-column={column}
            className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
        />
    );
};

const BurnBarrel = ({ setCards }) => {
    const [active, setActive] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDragEnd = (e) => {
        const cardId = e.dataTransfer.getData("cardId");

        setCards((pv) => pv.filter((c) => c.id !== cardId));

        setActive(false);
    };

    return (
        <div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
                active
                    ? "border-red-800 bg-red-800/20 text-red-500"
                    : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
            }`}
        >
            {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
        </div>
    );
};

const AddCard = ({ projectId, column, setCards }) => {
    const [text, setText] = useState("");
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [adding, setAdding] = useState(false);

    const dispatch = useDispatch();
    const { milestones, loading } = useSelector(state => state.milestoneList);

    useEffect(() => {
        dispatch(listMilestonesByProject(projectId)); // Obtener milestones cuando se carga el componente
    }, [dispatch, projectId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim().length || !selectedMilestone) return;

        const newTask = { title: text.trim(), milestone: selectedMilestone };
        dispatch(createTask(selectedMilestone, newTask)); // Llamada a la acción de creación de task

        setAdding(false);
    };

    return (
        <>
            {adding ? (
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                        placeholder="Add new task..."
                    />
                    <select onChange={(e) => setSelectedMilestone(e.target.value)}>
                        <option value="">Select Milestone</option>
                        {milestones.map(m => (
                            <option key={m.id} value={m.id}>{m.title}</option>
                        ))}
                    </select>
                    <button type="submit">Add</button>
                </form>
            ) : (
                <button onClick={() => setAdding(true)}>Add Card</button>
            )}
        </>
    );
};

export default AddCard;
