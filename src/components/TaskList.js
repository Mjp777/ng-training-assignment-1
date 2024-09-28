// src/components/TaskList.js
import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div className="task-details">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
            </div>
            <div className="task-actions">
              <button className="edit-btn" onClick={() => onEdit(task.id)}>Edit</button>
              <button className="delete-btn" onClick={() => onDelete(task.id)}>Delete</button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-tasks">No tasks available</p>
      )}
    </div>
  );
};

export default TaskList;
