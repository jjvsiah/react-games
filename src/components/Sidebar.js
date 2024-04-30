import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';
import Logo from './Logo.png'; // Ensure this path is correct and matches the file name's case

function Sidebar() {
    return (
        <div className="sidebar">
        <img src={Logo} alt="Logo" className="logo" /> 
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/operations">Operations</NavLink>
            <NavLink to="/memory">Memory</NavLink>
            <NavLink to="/space">Space</NavLink>
        </div>
    );
}

export default Sidebar;
