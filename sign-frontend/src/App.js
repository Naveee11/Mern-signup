import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom'; 
import './App.css'
import Dashboard from './dashboard';
import LoginSign from './loginSign';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSign />} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
