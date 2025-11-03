import React, { useEffect, useState } from 'react';
import '../assets/css/header.css'
import logo from '../assets/images/Logo.png'

const header = () => {

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


    return (
        <div className={`header-container ${visible ? "show" : "hide"}`}>

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
