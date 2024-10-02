import React, { useState } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import './App.css';  // Thêm các style cần thiết

function App() {
    const [tasks, setTasks] = useState([
        { task: 'Học lập trình web với React', date: 'Tomorrow' },
        { task: 'Gửi email nộp bài tập về nhà', date: 'Saturday' },
        { task: 'Học từ vựng tiếng anh mỗi ngày', date: 'Monday' },
        { task: 'Viết tiểu luận môn Triết học', date: 'Today' },
    ]);

    const addNewTask = (task, date) => {
        setTasks([...tasks, { task, date }]);
    };

    return (
        <div className="app">
            <h1>Hoanf okk 🎯</h1>
            <div className="task-list">
                {tasks.map((t, index) => (
                    <Task key={index} task={t.task} date={t.date} />
                ))}
            </div>
            <AddTask addNewTask={addNewTask} />
        </div>
    );
}

export default App;