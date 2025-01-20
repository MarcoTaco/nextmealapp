import React from 'react';
import SearchFoodBtn from './SearchFoodBtn.js';
import '../styles/navBar.scss';
import { Link } from 'react-router-dom';

function NavBar(){
    return(
        <div className="header-section">
            <div className="nav-bar">
                <div className="nav-brand">
                    <h1><Link to="/">Next Meal</Link></h1>
                </div>
                <div className="nav-other-choices">
                    <SearchFoodBtn />
                </div>
                <div className="nav-links">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li>Food Menu</li>
                        <li>About</li>
                        <li>Other</li>
                        <li>Login</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar