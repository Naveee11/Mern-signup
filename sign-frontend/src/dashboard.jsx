// Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); 

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    navigate('/');
  };

  if (!isAuthenticated) {
    navigate('/'); 
  }

  return (
    <div>
      <h1>Dashboard</h1>
      
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
