// src/components/TaskTable.js
import React, { useState } from 'react';
import './TaskTable.css';

const TaskTable = ({ tasks, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewTaskClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="task-table-container">
      <div className="task-table-header">
        <h2>Tasks</h2>
        <div className="task-table-actions">
          <button className="new-task-btn" onClick={handleNewTaskClick}>New Task</button>
          <button className="refresh-btn">Refresh</button>
        </div>
      </div>

      <div className="task-search">
        <input type="text" placeholder="Search" className="task-search-input" />
        <button className="search-btn">&#128269;</button>
      </div>

      <table className="task-table">
        <thead>
          <tr>
            <th><input type="checkbox" /></th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td><input type="checkbox" /></td>
              <td><a href="#">{task.assignedTo}</a></td>
              <td>{task.status}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.comments}</td>
              <td>
                <div className="dropdown">
                  <button>...</button>
                  <div className="dropdown-content">
                    <button onClick={() => onEdit(task.id)}>Edit</button>
                    <button onClick={() => onDelete(task.id)}>Delete</button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button>&lt;&lt;</button>
        <button>&lt;</button>
        <span>1</span>
        <button>&gt;</button>
        <button>&gt;&gt;</button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>New Task</h3>
            <form>
              <label>Assigned To</label>
              <select>
                <option>User 1</option>
                <option>User 2</option>
                <option>User 3</option>
              </select>

              <label>Status</label>
              <select>
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <label>Due Date</label>
              <input type="date" />

              <label>Priority</label>
              <select>
                <option>Low</option>
                <option>Normal</option>
                <option>High</option>
              </select>

              <label>Description</label>
              <textarea></textarea>

              <div className="modal-actions">
                <button type="button" onClick={handleCloseModal}>Cancel</button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTable;
