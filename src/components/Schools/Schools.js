import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaSchool } from 'react-icons/fa';
import './Schools.css';

function SchoolList() {
  const [schools, setSchools] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://json-dashboard.vercel.app/schools')
      .then(response => setSchools(response.data));
  }, []);

  //filter schoollist base onsearch term
  const filteredSchools = schools.filter(school =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div className="schools-container">
      <h2 className="schools-title">Schools</h2>
      <input 
        type="text" 
        className="search-bar" 
        placeholder="Search schools..." 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <ul className="school-list">
      {filteredSchools.map(school => (
          <li key={school.id} className="school-item">
            <FaSchool className="school-icon" />
            <Link to={`/schools/${school.id}`} className="school-link">
              {school.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SchoolList;
