import React from 'react'
import SectionOne from './sections/section-one'
import SectionTwo from './sections/section-two'
import SectionThree from './sections/section-three'
import SectionFour from './sections/section-four'
import SectionFive from './sections/section-five'
import SectionSix from './sections/section-six'
import SectionSeven from './sections/section-seven'
import SectionEight from './sections/section-eight'

import './about.css'

const about = () => {
  return (
    <>
      <div className="about-container">
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <SectionFive />
        <SectionSix />
        <SectionSeven />
        <SectionEight />
      </div>
    </>
  )
}

export default about
