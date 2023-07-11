import React from "react";
import { NavLink } from "react-router-dom";
import'./navbar.css'

export default function NavBar() {
    return (
        <div className='nav'>
            <ul className="list" >
                <li><NavLink className='home' exact to="/Home" >Home</NavLink></li>
                <li><NavLink className='form' exact to="/Form" >Form</NavLink></li>
            </ul>
        </div>
    )
}