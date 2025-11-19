import React from 'react'

const SectionOne = () => {
  return (
    <>
      <div className="contactone-container">
        <h1>Contact Us</h1>

        <form className="contactone-form">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="5" required></textarea>

            <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}

export default SectionOne
