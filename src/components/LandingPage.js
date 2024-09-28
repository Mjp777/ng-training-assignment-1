// src/components/LandingPage.js
import React from 'react';
import './LandingPage.css';

const LandingPage = ({ onAddTask }) => {
  return (
    <div className="landing-page">
      <h1>Welcome to To-Do List App</h1>
      <p>Manage your tasks efficiently and effectively.</p>
      <button onClick={onAddTask} className="add-task-btn">Add Task</button>
    </div>
  );
};

export default LandingPage;
