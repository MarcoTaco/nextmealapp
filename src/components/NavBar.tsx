import React, { useState, useRef, useEffect } from 'react';
import SearchFoodBtn from './SearchFoodBtn.js';
import '../styles/navBar.scss';
import { Link } from 'react-router-dom';

function NavBar(){
    const [menuOpen, setMenuOpen] = useState(false);
    const hamburgerMenuRef = useRef<HTMLDivElement>(null);

    function toggleHamburger() {
        setMenuOpen(!menuOpen);
    }  

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(hamburgerMenuRef.current && !hamburgerMenuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }

        if(menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [menuOpen]);

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
                        <div className="hamburger-menu" ref={hamburgerMenuRef}>
                            <ul className="mobile-nav-links">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/">Food Menu</Link></li>
                                <li><Link to="/">About</Link></li>
                                <li><Link to="/">Other</Link></li>
                                <li><Link to="/">Login</Link></li>
                            </ul>
                            <div className="hamburger-close">
                                <button className="hamburger-close-icon" onClick={() => setMenuOpen(false)}>
                                    <span className="x">x</span>
                                </button>
                            </div>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default NavBar