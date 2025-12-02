import React, { useState, useEffect } from 'react';
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./upload.css"

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
  const [formData, setFormData] = useState({
    html: '',
    css: '',
    javascript: ''
  });

  // --- NEW: State for the Active Tab (html, css, or javascript) ---
  const [activeTab, setActiveTab] = useState('html');

  const [srcDoc, setSrcDoc] = useState('');
  const [status, setStatus] = useState(null);
  const [generatedId, setGeneratedId] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? currentUser : null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(`
      <html>
        <head>
          <style>
            /* ==== Your Custom CSS ==== */
            ${formData.css}

            /* ==== Scrollbar Styling ==== */
            /* Chrome / Brave / Edge */
            ::-webkit-scrollbar {
                width: 10px;
                /* vertical scrollbar width */
            }

            ::-webkit-scrollbar-thumb {
                background-color: #555;
                /* draggable thumb */
                border-radius: 0px;
            }

            ::-webkit-scrollbar-track {
                background: #00000000;
            }

            ::-webkit-scrollbar-button {
                display: none;
                /* hide top/bottom arrows */
            }

            ::-webkit-scrollbar-thumb:hover {
                background-color: #888;
            }

            /* Prevent unwanted margin */
            body {
              margin: 0;
              padding: 0;
            }
          </style>
        </head>

        <body>
          ${formData.html}

          <script>
            try {
              ${formData.javascript}
            } catch(e) {
              console.error(e);
            }
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

      const response = await fetch('http://localhost:3000/api/code/save', {
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

            {/* --- NEW: Tab Buttons --- */}
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

            {/* --- Conditional Rendering of Textareas --- */}
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

            {/* Action Bar (Save Button + Status) */}
            <div className="action-bar">
              <button type="submit" className="save-btn" disabled={!user}>
                {user ? "Save Code" : "Login to Save"}
              </button>

              {status === 'success' && (
                <span className="success-msg">Saved! ID: <strong>{generatedId}</strong></span>
              )}
              {status === 'error' && <span className="error-msg">{generatedId}</span>}
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