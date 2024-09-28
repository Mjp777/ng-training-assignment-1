// src/App.js
import React, { useState, useEffect } from 'react';
import TaskTable from './components/TaskTable';

function App() {
  // Tasks state
  const [tasks, setTasks] = useState([
    { id: 1, assignedTo: 'User 1', status: 'Completed', dueDate: '12/10/2024', priority: 'Low', comments: 'This task is good' },
    { id: 2, assignedTo: 'User 2', status: 'In Progress', dueDate: '14/09/2024', priority: 'High', comments: 'This task is important' },
    { id: 3, assignedTo: 'User 3', status: 'Not Started', dueDate: '18/08/2024', priority: 'Low', comments: 'This task is delayed' },
    { id: 4, assignedTo: 'User 4', status: 'In Progress', dueDate: '12/06/2024', priority: 'Normal', comments: 'This task needs attention' }
  ]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 2;

  // Modal state for new task
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({ assignedTo: '', status: '', dueDate: '', priority: '', comments: '' });

  // Welcome modal state
  const [isWelcomeOpen, setIsWelcomeOpen] = useState(true);

  // Get current tasks for pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Pagination handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle New Task click (opens modal)
  const handleNewTaskClick = () => {
    setNewTask({ assignedTo: '', status: '', dueDate: '', priority: '', comments: '' });
    setIsModalOpen(true);
  };

  // Handle modal save
  const handleSaveTask = () => {
    const updatedTasks = [...tasks, { id: tasks.length + 1, ...newTask }];
    setTasks(updatedTasks);
    setIsModalOpen(false);
  };

  // Handle task delete with confirmation
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
      setTasks(tasks.filter((task) => task.id !== id));
    }
  };

  // Handle edit task
  const handleEdit = (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setNewTask(taskToEdit);
    setIsModalOpen(true);
  };

  // Close welcome modal after user clicks "Get Started"
  const closeWelcomeModal = () => {
    setIsWelcomeOpen(false);
  };

  return (
    <div className="App">
      {/* Welcome Modal */}
      {isWelcomeOpen && (
        <div className="welcome-modal">
          <div className="welcome-content">
            <h2>Welcome to Task Manager</h2>
            <p>This is your personal task manager.</p>
            <p>You can add, edit, or delete tasks and keep track of your progress.</p>
            <button onClick={closeWelcomeModal}>Get Started</button>
          </div>
        </div>
      )}

      {/* Task Table and Pagination */}
      {!isWelcomeOpen && (
        <>
          <TaskTable
            tasks={currentTasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onNewTask={handleNewTaskClick}
          />
          <Pagination
            tasksPerPage={tasksPerPage}
            totalTasks={tasks.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}

      {/* Task Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{newTask.id ? 'Edit Task' : 'New Task'}</h3>
            <form>
              <label>Assigned To</label>
              <select value={newTask.assignedTo} onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}>
                <option>User 1</option>
                <option>User 2</option>
                <option>User 3</option>
                <option>User 4</option>
              </select>

              <label>Status</label>
              <select value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
                <option>Not Started</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>

              <label>Due Date</label>
              <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })} />

              <label>Priority</label>
              <select value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
                <option>Low</option>
                <option>Normal</option>
                <option>High</option>
              </select>

              <label>Description</label>
              <textarea value={newTask.comments} onChange={(e) => setNewTask({ ...newTask, comments: e.target.value })}></textarea>

              <div className="modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="button" onClick={handleSaveTask}>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Pagination Component
const Pagination = ({ tasksPerPage, totalTasks, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href="#!" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default App;
