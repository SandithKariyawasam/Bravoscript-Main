import React from 'react'
import bg from '../../../assets/videos/bgone.mp4'
import '../home.css'

const SectionOne = () => {
  return (
    <div className="hero">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="background-video"
      >
        <source src={bg} type="video/mp4" />
      </video>

      <div className="homecontainer">
        <div className="sectionone">
          <h1>Explore the Next Evolution of Web Design</h1>
          <button> Get Started </button>

          <div className="arrow-group">
            <div className="arrow"><i class="fa-solid fa-chevron-down"></i></div>
              <div className="arrow"><i class="fa-solid fa-chevron-down"></i></div>
              <div className="arrow"><i class="fa-solid fa-chevron-down"></i></div>
          </div>
        </div>
      </div>




    </div>
  )
}

export default SectionOne