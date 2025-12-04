import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const generatePreview = (html, css, js) => {
    return `
        <html>
          <head>
            <style>
              ${css}
              ::-webkit-scrollbar { width: 10px; }
              ::-webkit-scrollbar-track { background: #00000000; }
              ::-webkit-scrollbar-thumb { background-color: #555; border-radius: 50px; }
              ::-webkit-scrollbar-button { display: none; }
              ::-webkit-scrollbar-thumb:hover { background: #888; }
              html { scrollbar-width: thin; scrollbar-color: #555 #1e1e1e; }
              body { margin: 0; padding: 0; }
            </style>
          </head>
          <body>
            ${html}
            <script>
              try {
                ${js}
              } catch (err) {
                console.error(err);
              }
            </script>
          </body>
        </html>
    `;
};

const Details = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const existingData = location.state?.snippetData;

    const [html, setHtml] = useState(existingData?.html || "");
    const [css, setCss] = useState(existingData?.css || "");
    const [js, setJs] = useState(existingData?.javascript || "");

    const [srcDoc, setSrcDoc] = useState(generatePreview(
        existingData?.html || "", 
        existingData?.css || "", 
        existingData?.javascript || ""
    ));

    const [activeTab, setActiveTab] = useState("html");

    useEffect(() => {
        if (!existingData) {
        }
    }, [existingData, navigate]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            const source = generatePreview(html, css, js);
            setSrcDoc(source);
        }, 300);

        return () => clearTimeout(timeout);
    }, [html, css, js]);

    return (
        <div className="container-tab">
            {/* PREVIEW SECTION */}
            <div className="display">
                <iframe
                    srcDoc={srcDoc}
                    title="output"
                    sandbox="allow-scripts"
                    style={{width: "100%", height: "100%", border: "none"}}
                />
            </div>

            {/* CODE EDITOR SECTION */}
            <div className="codes">
                <div className="tabss">
                    <button
                        className={activeTab === "html" ? "active" : ""}
                        onClick={() => setActiveTab("html")}
                    >
                        HTML
                    </button>
                    <button
                        className={activeTab === "css" ? "active" : ""}
                        onClick={() => setActiveTab("css")}
                    >
                        CSS
                    </button>
                    <button
                        className={activeTab === "js" ? "active" : ""}
                        onClick={() => setActiveTab("js")}
                    >
                        JavaScript
                    </button>
                    
                    <button 
                        onClick={() => navigate(-1)} 
                        style={{marginLeft: 'auto', background: '#dc3545', color: 'white', border: 'none', padding: '5px 15px', cursor: 'pointer', borderRadius: '10px'}}
                    >
                        Back
                    </button>
                </div>

                <div className="editor">
                    {activeTab === "html" && (
                        <textarea
                            value={html}
                            onChange={(e) => setHtml(e.target.value)}
                            placeholder="HTML code..."
                            className='codeinputer'
                            spellCheck="false"
                        />
                    )}
                    {activeTab === "css" && (
                        <textarea
                            value={css}
                            onChange={(e) => setCss(e.target.value)}
                            placeholder="CSS code..."
                            className='codeinputer'
                            spellCheck="false"
                        />
                    )}
                    {activeTab === "js" && (
                        <textarea
                            value={js}
                            onChange={(e) => setJs(e.target.value)}
                            placeholder="JavaScript code..."
                            className='codeinputer'
                            spellCheck="false"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Details;
