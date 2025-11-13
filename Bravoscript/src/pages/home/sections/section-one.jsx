import React from 'react'
import '../home.css'
import Icon from '../../../Background/icon'

const SectionOne = () => {
  return (
    <>
      <div className="homecontainer">
        <div className="sectionone">

          <h1>Explore the Next Evolution of Web Design</h1>
          <button className='header-btn'> Get Started </button>

          <div className="arrow-group">
            <div className="arrow"><i className="fa-solid fa-chevron-down"></i></div>
            <div className="arrow"><i className="fa-solid fa-chevron-down"></i></div>
            <div className="arrow"><i className="fa-solid fa-chevron-down"></i></div>
          </div>
        </div>
      </div>
      <Icon />
    </>
  )
}

export default SectionOne
