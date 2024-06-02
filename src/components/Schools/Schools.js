import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Schools.css';

function SchoolList() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/schools')
      .then(response => setSchools(response.data));
  }, []);

  return (
    <div className="school-list-container">
      <h2>List of Schools</h2>
      <ul className="school-list">
        {schools.map(school => (
          <li key={school.id}>
            <Link to={`/schools/${school.id}`}>{school.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SchoolList;
