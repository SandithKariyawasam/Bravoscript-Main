import React from 'react'
import '../assets/css/header.css'
import logo from '../assets/images/Logo.png'

const header = () => {
    return (
        <div className="header-container">

            {/* Logo */}
            <img src={logo} alt="Logo" />

            {/* Navbar */}
            <nav className="navbar">
                <ul className="menu">
                    <li className="buttonpro" id="isActive">
                        <span>Home</span>
                    </li>
                    <li className="buttonpro">
                        <span>Templates</span>
                    </li>
                    <li className="buttonpro">
                        <span>Components</span>
                    </li>
                    <li className="buttonpro">
                        <span>About</span>
                    </li>
                    <li className="buttonpro">
                        <span>Community</span>
                    </li>
                    <li className="buttonpro">
                        <span>Contact us</span>
                    </li>
                </ul>
            </nav>

            {/* Buttons */}
            <button className='header-btn'> Get Started
            </button>

            {/* Mobile Menu Icon */}
            <div className="show-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

export default header
