import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import TopCardMetrics from './components/Dashboard/TopCardMetric';
//import Dashboard from './components/Dashboard/Dashboard';

import './App.css';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <div className="main-content">
        <TopCardMetrics />
        
      </div>
    </div>
  </Router>
  );
}

export default App;
