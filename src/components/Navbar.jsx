import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/6.webp'; // Updated path to the logo

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear local storage to delete all stored data
        localStorage.clear();
        // Redirect to the logout or goodbye page
        navigate('/logout'); // Change this to a dedicated logout page if you have one
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img src={logo} alt="Logo" className="logo" /> {/* Logo added here */}
                <span>Task Manager</span> {/* Optional: Add your brand name */}
            </div>
            <ul>
                <li><Link to="/dashboard">Home</Link></li>
                <li><Link to="/stories">Tasks</Link></li>
                <li><Link to="/community">Notepad</Link></li>
                <li><Link to="/wallets">Calendar</Link></li>
                
                <li>
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
