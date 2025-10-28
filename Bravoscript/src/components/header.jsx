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
                    <li className="isActive">
                        Home
                    </li>
                    <li className="">
                        Templates
                    </li>
                    <li className="">
                        Components
                    </li>
                    <li className="">
                        About
                    </li>
                    <li className="">
                        Community
                    </li>
                    <li className="">
                        Contact us
                    </li>
                </ul>
            </nav>

            {/* Buttons */}
            <button> Get Started
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
