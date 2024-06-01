import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Schools from './components/Schools/Schools';

import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Dashboard />
        <Schools />
      </div>
    </div>
  </Router>
  );
}

export default App;
