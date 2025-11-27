import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../assets/css/header.css'
import logo from '../assets/images/Logo.png'

const header = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => (location.pathname === path ? "isActive" : "");

    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 50 && currentScrollY > lastScrollY) {
                // scrolled more than 100px and moving down
                setVisible(false);
            } else if (currentScrollY < lastScrollY + 100) {
                // scrolling up again → show
                setVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const [showNavbar, setShowNavbar] = useState(false);

    // 2. Function to toggle the state
    const handleShowNavbar = () => {
        setShowNavbar(!showNavbar);
    };


    return (
        <div className={`header-container ${visible ? "show" : "hide"}`}>

            {/* Logo */}
            <img src={logo} alt="Logo" />

            {/* Navbar */}
            <nav className="navbar">
                <ul className="menu">

                    <Link to="/">
                        <li className="buttonpro" id={isActive("/")}>
                            <span>Home</span>
                        </li>
                    </Link>

                    <Link to="/templates">
                        <li className="buttonpro" id={isActive("/templates")}>
                            <span>Templates</span>
                        </li>
                    </Link>

                    <Link to="/components">
                        <li className="buttonpro" id={isActive("/components")}>
                            <span>Components</span>
                        </li>
                    </Link>

                    <Link to="/about">
                        <li className="buttonpro" id={isActive("/about")}>
                            <span>About</span>
                        </li>
                    </Link>

                    <Link to="/community">
                        <li className="buttonpro" id={isActive("/community")}>
                            <span>Community</span>
                        </li>
                    </Link>

                    <Link to="/contact">
                        <li className="buttonpro" id={isActive("/contact")}>
                            <span>Contact us</span>
                        </li>
                    </Link>
                </ul>
            </nav>

            {/* Buttons */}
            <button className='header-btn'> Get Started
            </button>

            {/* Mobile Menu Icon */}
            <div className="show-menu" onClick={handleShowNavbar}>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className={`nav-elements ${showNavbar ? 'active' : ''}`}>
                <i
                    className="fa-solid fa-xmark"
                    onClick={handleShowNavbar}
                ></i>
                <ul>
                    <Link to="/">
                        <li id={isActive("/")}>
                            <span>Home</span>
                        </li>
                    </Link>

                    <Link to="/templates">
                        <li id={isActive("/templates")}>
                            <span>Templates</span>
                        </li>
                    </Link>

                    <Link to="/components">
                        <li id={isActive("/components")}>
                            <span>Components</span>
                        </li>
                    </Link>

                    <Link to="/about">
                        <li id={isActive("/about")}>
                            <span>About</span>
                        </li>
                    </Link>

                    <Link to="/community">
                        <li id={isActive("/community")}>
                            <span>Community</span>
                        </li>
                    </Link>

                    <Link to="/contact">
                        <li id={isActive("/contact")}>
                            <span>Contact us</span>
                        </li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default header
