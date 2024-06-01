import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Sales Dashboard</h2>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName="active-link">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/schools" activeClassName="active-link">Schools</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
