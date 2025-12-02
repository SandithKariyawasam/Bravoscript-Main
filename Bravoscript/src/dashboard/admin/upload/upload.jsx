import React, { useState, useEffect } from 'react';
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";


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

const Upload = () => {
  const [user, setUser] = useState(null);

  // Added 'category' to formData
  const [formData, setFormData] = useState({
    html: '',
    css: '',
    javascript: '',
    category: 'Buttons' // Default category
  });

  const [activeTab, setActiveTab] = useState('html');
  const [isOpen, setIsOpen] = useState(false);
  const [srcDoc, setSrcDoc] = useState('');
  const [status, setStatus] = useState(null);
  const [generatedId, setGeneratedId] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? currentUser : null);
    });
    return () => unsubscribe();
  }, []);

  // Debounce logic for live preview
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Saving...');
    setGeneratedId('');

    if (!user) {
      setStatus('error');
      setGeneratedId('You must be logged in to upload code.');
      return;
    }

    try {
      const payload = {
        ...formData,
        userId: user.uid,
      };

      const response = await fetch('https://bravoscript-main.vercel.app/api/code/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setGeneratedId(data.id);
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
    <div className="upload-con">
      <h2>Upload & Preview</h2>

      <div className="editor-lay">

        {/* LEFT SIDE: Code Editor */}
        <div className="code-in">
          <form onSubmit={handleSubmit} className="code-form">



            {/* Tab Buttons */}
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

            {/* Textareas */}
            <div className="form-grp expanded">
              {activeTab === 'html' && (
                <textarea
                  name="html"
                  placeholder="<h1>Hello World</h1>"
                  value={formData.html}
                  onChange={handleChange}
                  className='textarea full-height'
                  spellCheck="false"
                />
              )}
              {activeTab === 'css' && (
                <textarea
                  name="css"
                  placeholder="body { background: #000; }"
                  value={formData.css}
                  onChange={handleChange}
                  className='textarea full-height'
                  spellCheck="false"
                />
              )}
              {activeTab === 'javascript' && (
                <textarea
                  name="javascript"
                  placeholder="console.log('Hello');"
                  value={formData.javascript}
                  onChange={handleChange}
                  className='textarea full-height'
                  spellCheck="false"
                />
              )}
            </div>

            {/* --- NEW: Category Dropdown --- */}
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
                  {/* Column 1 */}
                  <ul>
                    <li onClick={() => handleSelect('All')}>All</li>
                    <li onClick={() => handleSelect('Checkbox')}>Checkbox</li>
                    <li onClick={() => handleSelect('Cards')}>Cards</li>
                    <li onClick={() => handleSelect('Inputs')}>Inputs</li>
                    <li onClick={() => handleSelect('Forms')}>Forms</li>
                    <li onClick={() => handleSelect('Tooltips')}>Tooltips</li>
                  </ul>
                  {/* Column 2 */}
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

            {/* Action Bar (Save Button + Status) */}
            <div className="action-bar">
              <button
                type="submit"
                className="save-btn"
                disabled={!user || status === 'Saving...'}
              >
                {status === 'Saving...' ? (
                  <div className="load"></div>
                ) : (
                  user ? "Save Code" : "Login to Save"
                )}
              </button>

              {/* Success Message */}
              {status === 'success' && (
                <span className="success-msg">Saved! ID: <strong>{generatedId}</strong></span>
              )}

              {/* Error Message */}
              {status === 'error' && (
                <span className="error-msg">{generatedId}</span>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT SIDE: Live Preview */}
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

export default Upload;