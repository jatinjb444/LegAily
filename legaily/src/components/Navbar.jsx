import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Legaily</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/docai">DocAI</Link></li>
        <li><Link to="/available-docs">Available Documents</Link></li>
        <li><Link to="/query-page">Query Page</Link></li>
        <li><Link to="/judge-view">Judge View</Link></li>
        <li><Link to="/lawyer-view">Lawyer View</Link></li>
        <li><Link to="/drafts">Drafts</Link></li>
        <li><Link to="/adv-diary">Adv Diary</Link></li>
      </ul>
      <button className="logout-btn">Logout</button>
    </nav>
  );
}

export default Navbar;