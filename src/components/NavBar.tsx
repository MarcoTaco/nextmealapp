import React, { useState } from 'react';
import SearchFoodBtn from './SearchFoodBtn.js';
import '../styles/navBar.scss';
import { Link } from 'react-router-dom';

function NavBar(){
    const [menuOpen, setMenuOpen] = useState(false);

    function toggleHamburger(){
        setMenuOpen((prev) => !prev);
    }

    return(
        <header>
            <div className="header-section">
                <nav className="nav-bar desktop">
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
                </nav>
            </div>

            <div className="header-section">
                <nav className="nav-bar mobile">
                    <button className="hamburger-icon" onClick={toggleHamburger}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>
                    <div className="nav-brand">
                        <h1><Link to="/">Next Meal</Link></h1>
                    </div>
                    <div className="nav-other-choices">
                        <SearchFoodBtn />
                    </div>
                    {menuOpen && (
                        <ul className="mobile-nav-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/">Food Menu</Link></li>
                            <li><Link to="/">About</Link></li>
                            <li><Link to="/">Other</Link></li>
                            <li><Link to="/">Login</Link></li>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default NavBar