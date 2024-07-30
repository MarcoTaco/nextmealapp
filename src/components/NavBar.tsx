import React from 'react';
import '../styles/navBar.scss';

function NavBar(){
    return(
        <div className="header-section">
            <div className="nav-bar">
                <div className="nav-links">
                    <ul>
                        <li>Home</li>
                        <li>Food Menu</li>
                        <li>About</li>
                        <li>Other</li>
                    </ul>
                </div>
                <div className="nav-brand">
                    <h1>Next Meal</h1>
                </div>
                <div className="nav-other-choices">
                    <ul>
                        <li>Login</li>
                        <li>Search</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default NavBar