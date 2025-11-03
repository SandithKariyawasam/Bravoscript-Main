import React from 'react'
import '../home.css'

import img from "../../../assets/images/1762095727817.jpg"

const SectionFive = () => {
  return (
    <>
      <div className="container-five">
        <div className="git-container">
          <i class="fa-brands fa-github"></i>
          <h3>Bravo <span>Studio</span></h3>
          <p>The largest Open-Source UI Library, available on GitHub!</p>
          <button><i class="fa-solid fa-star"></i>Star on GitHub</button>
        </div>
        <div className="blog-container">
          <h3>Latest from Blog</h3>
          <div className="blog-cards">

            <div class="container">
              <div class="card_box">
                <img src={img} alt='blog' />
                <h1>Setting Up Tailwind CSS in React and Next.js......</h1>
                <p>I remember the first time I opened a codebase using Tailwind CSS. My immediate reaction was something......</p>
              </div>
            </div>
            <div class="container">
              <div class="card_box">
                <span></span>
                <img src={img} alt='blog' />
                <h1>Setting Up Tailwind CSS in React and Next.js......</h1>
                <p>I remember the first time I opened a codebase using Tailwind CSS. My immediate reaction was something......</p>
              </div>
            </div>
            <div class="container">
              <div class="card_box">
                <img src={img} alt='blog' />
                <h1>Setting Up Tailwind CSS in React and Next.js......</h1>
                <p>I remember the first time I opened a codebase using Tailwind CSS. My immediate reaction was something......</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default SectionFive
