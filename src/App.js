import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Schools from './components/Schools/Schools';
import SchoolDetails from './components/Schools/SchoolDetails';

import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/schools/:id" element={<SchoolDetails />} />
        </Routes>
    
      </div>
    </div>
  </Router>
  );
}

export default App;
