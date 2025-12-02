import React, { useState, useEffect } from 'react';
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";


const firebaseConfig = {
  apiKey: "AIzaSyCNyKCyDS-SAY3pgWCTe3ZV56h6PbIXfkQ",
  authDomain: "rising-pen-456515-h8.firebaseapp.com",
  projectId: "rising-pen-456515-h8",
  storageBucket: "rising-pen-456515-h8.firebasestorage.app",
  messagingSenderId: "1002087414265",
  appId: "1:1002087414265:web:9acbce5d7fa5d3ad6da528",
  measurementId: "G-G6LLZ59Y3B"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

const Update = () => {
  const [user, setUser] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const existingData = location.state?.snippetData;

  const [formData, setFormData] = useState({
    html: existingData?.html || '',
    css: existingData?.css || '',
    javascript: existingData?.javascript || '',
    category: existingData?.category || 'Buttons'
  });

  const [activeTab, setActiveTab] = useState('html');
  const [isOpen, setIsOpen] = useState(false);
  const [srcDoc, setSrcDoc] = useState('');
  const [status, setStatus] = useState(null);


  const snippetId = existingData?._id || existingData?.id;

  useEffect(() => {
    if (!existingData) {
      // alert("No component selected to update");
      // navigate('/dashboard'); 
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? currentUser : null);
    });
    return () => unsubscribe();
  }, [existingData, navigate]);


  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(`
        <html>
          <head>
            <style>
              ${formData.css}
              ::-webkit-scrollbar { width: 10px; }
              ::-webkit-scrollbar-thumb { background-color: #555; border-radius: 0px; }
              ::-webkit-scrollbar-track { background: #00000000; }
              body { margin: 0; padding: 0; }
            </style>
          </head>
          <body>
            ${formData.html}
            <script>
              try { ${formData.javascript} } catch(e) { console.error(e); }
            </script>
          </body>
        </html>
      `);
    }, 250);
    return () => clearTimeout(timeOut);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (category) => {
    setFormData({ ...formData, category: category });
    setIsOpen(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus('Saving...');

    if (!user) {
      setStatus('error');
      alert('You must be logged in to update code.');
      return;
    }

    try {
      const payload = {
        ...formData,
        userId: user.uid,
      };


      const response = await fetch(`https://bravoscript-main.vercel.app/api/code/update/${snippetId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        alert("Updated Successfully!");
        navigate('/admin/dashboard');
      } else {
        setStatus('error');
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus('error');
      alert('Failed to connect to server.');
    }
  };

  return (
    <div className="upload-con">
      <h2>Update Component</h2>

      <div className="editor-lay">

        <div className="code-in">
          <form onSubmit={handleUpdate} className="code-form">

            <div className="tabs">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'html' ? 'active' : ''}`}
                onClick={() => setActiveTab('html')}
              >
                HTML
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'css' ? 'active' : ''}`}
                onClick={() => setActiveTab('css')}
              >
                CSS
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'javascript' ? 'active' : ''}`}
                onClick={() => setActiveTab('javascript')}
              >
                JavaScript
              </button>
            </div>

            <div className="form-grp expanded">
              {activeTab === 'html' && (
                <textarea
                  name="html"
                  value={formData.html}
                  onChange={handleChange}
                  className='textarea full-height'
                  spellCheck="false"
                />
              )}
              {activeTab === 'css' && (
                <textarea
                  name="css"
                  value={formData.css}
                  onChange={handleChange}
                  className='textarea full-height'
                  spellCheck="false"
                />
              )}
              {activeTab === 'javascript' && (
                <textarea
                  name="javascript"
                  value={formData.javascript}
                  onChange={handleChange}
                  className='textarea full-height'
                  spellCheck="false"
                />
              )}
            </div>

            <div className="iconone-two dropdown-con">
              <label className="input-lab">Select Category</label>
              <div className="dropdown-tri" onClick={toggleDropdown}>
                <h2>
                  {formData.category}
                  <span className={`arr ${isOpen ? 'up' : 'down'}`}>▼</span>
                </h2>
              </div>

              {isOpen && (
                <div className="iconone-list dropdown-me">
                  <ul>
                    <li onClick={() => handleSelect('All')}>All</li>
                    <li onClick={() => handleSelect('Checkbox')}>Checkbox</li>
                    <li onClick={() => handleSelect('Cards')}>Cards</li>
                    <li onClick={() => handleSelect('Inputs')}>Inputs</li>
                    <li onClick={() => handleSelect('Forms')}>Forms</li>
                    <li onClick={() => handleSelect('Tooltips')}>Tooltips</li>
                  </ul>
                  <ul>
                    <li onClick={() => handleSelect('Buttons')}>Buttons</li>
                    <li onClick={() => handleSelect('Toggle Switches')}>Toggle Switches</li>
                    <li onClick={() => handleSelect('Loaders')}>Loaders</li>
                    <li onClick={() => handleSelect('Radio Buttons')}>Radio Buttons</li>
                    <li onClick={() => handleSelect('3D')}>3D</li>
                    <li onClick={() => handleSelect('Others')}>Others</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="action-bar">
              <button
                type="submit"
                className="save-btn"
                disabled={!user || status === 'Saving...'}
              >
                {status === 'Saving...' ? (
                  <div className="load"></div>
                ) : (
                  user ? "Update Code" : "Login to Update"
                )}
              </button>

              <button
                type="button"
                className="save-btn"
                style={{ backgroundColor: '#555', marginLeft: '10px' }}
                onClick={() => navigate('/admin/dashboard')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="preview-pane">
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        </div>

      </div>
    </div>
  );
};

export default Update;