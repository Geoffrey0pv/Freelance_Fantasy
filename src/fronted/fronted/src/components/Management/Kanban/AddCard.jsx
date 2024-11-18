import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../../../redux/actions/taskActions';

const AddCard = ({ column, setCards, milestones = [] }) => {
    const [text, setText] = useState("");
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [adding, setAdding] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim().length || !selectedMilestone) return;

        const newTask = { title: text.trim(), milestone: selectedMilestone, column };
        dispatch(createTask(selectedMilestone, newTask));

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
                    <select onChange={(e) => setSelectedMilestone(e.target.value)} defaultValue="">
                        <option value="" disabled>Select Milestone</option>
                        {/* Asegurarse de que milestones es un array antes de mapear */}
                        {Array.isArray(milestones) && milestones.map(m => (
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