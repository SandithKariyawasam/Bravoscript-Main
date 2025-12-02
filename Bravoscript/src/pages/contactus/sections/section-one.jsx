import { useState } from 'react';

const SectionOne = () => {
  // 1. State to store input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState(''); // To show success/error messages

  // 2. Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {

      // const response = await fetch('http://localhost:3000/api/send-email', {
      
      const response = await fetch('https://bravoscript-main.vercel.app/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setStatus('Failed to send message.');
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus('Something went wrong.');
    }
  };
  return (
    <>
      <div className="contactone-container">
        <h1>Contact Us</h1>

        <form className="contactone-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>

        {/* Show status message */}
        {status && <p>{status}</p>}
      </div>
    </>
  )
}

export default SectionOne
