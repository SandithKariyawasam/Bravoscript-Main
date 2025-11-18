import React from 'react'
import SectionOne from './sections/section-one'
import SectionTwo from './sections/section-two'

import './about.css'

const about = () => {
  return (
    <>
      <div className="about-container">
        <SectionOne />
        <SectionTwo />
      </div>
    </>
  )
}

export default about
