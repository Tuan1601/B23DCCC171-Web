import React, { useState } from 'react';

function AddTask({ addNewTask }) {
    const [newTask, setNewTask] = useState('');
    const [date, setDate] = useState('Today');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTask) {
            addNewTask(newTask, date);
            setNewTask('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-task">
            <input 
                type="text" 
                value={newTask} 
                onChange={(e) => setNewTask(e.target.value)} 
                placeholder="Add task"
            />
            <select onChange={(e) => setDate(e.target.value)}>
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Saturday">Saturday</option>
                <option value="Monday">Monday</option>
            </select>
            <button type="submit">Add task</button>
        </form>
    );
}

export default AddTask;