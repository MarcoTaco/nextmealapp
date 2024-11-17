import React from 'react';
import SearchFoodBtn from './SearchFoodBtn.js';
import '../styles/navBar.scss';
import { useNavigate } from 'react-router-dom';

function NavBar(){
    const navigate = useNavigate();

    function handleHomeClick(){
        navigate('/');
    }
    
    return(
        <div className="header-section">
            <div className="nav-bar">
                <div className="nav-links">
                    <ul>
                        <li onClick={handleHomeClick} style={{cursor: 'pointer'}}>Home</li>
                        <li>Food Menu</li>
                        <li>About</li>
                        <li>Other</li>
                    </ul>
                </div>
                <div className="nav-brand">
                    <h1 onClick={handleHomeClick} style={{cursor: 'pointer'}}>Next Meal</h1>
                </div>
                <div className="nav-other-choices">
                    <ul>
                        <li>Login</li>
                        <li><SearchFoodBtn /></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar