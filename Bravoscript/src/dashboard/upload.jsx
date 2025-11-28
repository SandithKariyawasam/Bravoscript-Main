import React, { useState } from 'react';

const Upload = () => {
  // 1. Remove 'id' from the initial state
  const [formData, setFormData] = useState({
    html: '',
    css: '',
    javascript: ''
  });

  const [status, setStatus] = useState(null); // Changed to null to handle objects better
  const [generatedId, setGeneratedId] = useState(''); // To store the new ID

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Saving...');
    setGeneratedId('');

    try {
      // Local: http://localhost:3000/api/code/save
      // Vercel: https://your-project.vercel.app/api/code/save
      const response = await fetch('http://localhost:3000/api/code/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // We simply don't send an ID here
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setGeneratedId(data.id); // The backend returns the auto-generated ID
        // Optional: Clear form
        setFormData({ html: '', css: '', javascript: '' }); 
      } else {
        setStatus('error');
        setGeneratedId(data.message);
      }

    } catch (error) {
      console.error("Error:", error);
      setStatus('error');
      setGeneratedId('Failed to connect to server.');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Your Code</h2>
      
      <form onSubmit={handleSubmit} className="code-form">
        
        {/* --- REMOVED THE ID INPUT FIELD HERE --- */}

        {/* HTML Input */}
        <div className="form-group">
          <label className="label-html">HTML</label>
          <textarea 
            name="html" 
            placeholder="<h1>Hello World</h1>" 
            value={formData.html}
            onChange={handleChange}
            rows="6"
            className='textarea'
          />
        </div>

        {/* CSS Input */}
        <div className="form-group">
          <label className="label-css">CSS</label>
          <textarea 
            name="css" 
            placeholder="body { background: #f0f0f0; }" 
            value={formData.css}
            onChange={handleChange}
            rows="6"
            className='textarea'
          />
        </div>

        {/* JavaScript Input */}
        <div className="form-group">
          <label className="label-js">JavaScript</label>
          <textarea 
            name="javascript" 
            placeholder="console.log('Hello');" 
            value={formData.javascript}
            onChange={handleChange}
            rows="6"
            className='textarea'
          />
        </div>

        <button type="submit" className="save-btn">Save Code</button>
      </form>

      {/* Success Message with Copy ID feature */}
      {status === 'success' && (
        <div className="success-box">
          <p>Code Saved Successfully!</p>
          <p>Your ID is: <strong className="highlight-id">{generatedId}</strong></p>
        </div>
      )}

      {status === 'error' && (
        <p className="error-msg">{generatedId}</p>
      )}
    </div>
  );
};

export default Upload;