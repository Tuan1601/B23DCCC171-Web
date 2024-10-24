import React from 'react';

function Task({ task, date }) {
    return (
        <div className="task">
            <input type="checkbox" />
            <span>{task}</span>
            <span className={`date ${date}`}>{date}</span>
        </div>
    );
}

export default Task;