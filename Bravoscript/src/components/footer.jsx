import React from 'react'
import img from "../assets/images/Logo.png"
import "../assets/css/footer.css"

const footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer-container">
          <div className="details">
            <img src={img} alt='logo' />
            <p>The universe of UI components</p>
            <h3><i class="fa-sharp fa-solid fa-id-card"></i>MIT License</h3>
            <p>All content (UI components) on this site are published under the MIT License.</p>
            <div className="footer-button">
              <button><i class="fa-brands fa-telegram"></i></button>
              <button><i class="fa-brands fa-whatsapp"></i></button>
              <button><i class="fa-brands fa-linkedin"></i></button>
            </div>
          </div>
          <div className="details">
            <h3>Resources</h3>
            <ul>
              <li>Pixelrepo.com</li>
              <li>Cssbuttons.io</li>
              <li>Neumorphism.io</li>
              <li>Browsergames.gg</li>
            </ul>
          </div>
          <div className="details">
            <h3>Information</h3>
            <ul>
              <li>Blog</li>
              <li>Post Guidelines</li>
              <li>Give feedback</li>
              <li>Report bug</li>
            </ul>
          </div>
          <div className="details">
            <h3>Legal</h3>
            <ul>
              <li>Terms and Conditions</li>
              <li>Privacy policy</li>
              <li>Cookie policy</li>
              <li>Disclaimer</li>
            </ul>
          </div>
        </div>
        <div className="footer-owner">
          <p>2025 BravoScript. All rights reserved. - BravoStudio</p>
        </div>
      </div>
    </>
  )
}

export default footer
