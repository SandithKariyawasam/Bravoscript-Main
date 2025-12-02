import React, { useState, useEffect, useRef } from "react";

const SectionOne = () => {
    const [html, setHtml] = useState("<h1>Hello World</h1>");
    const [css, setCss] = useState("h1 { color: red; text-align: center;}");
    const [js, setJs] = useState("console.log('JS Running')");
    const [srcDoc, setSrcDoc] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            const source = `
        <html>
          <head>
            <style>

              /* Your user's CSS */
              ${css}

              /* Custom Scrollbar Styles */
              ::-webkit-scrollbar {
                width: 10px;
              }

              ::-webkit-scrollbar-track {
                background: #00000000;
              }

              ::-webkit-scrollbar-thumb {
                 background-color: #555;
                 border-radius: 50px;
              }

              ::-webkit-scrollbar-button {
                 display: none;
                 /* hide top/bottom arrows */
              }

              ::-webkit-scrollbar-thumb:hover {
                background: #888;
              }

              /* Firefox */
              html {
                scrollbar-width: thin;
                scrollbar-color: #555 #1e1e1e;
              }

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
            setSrcDoc(source);
        }, 300);

        return () => clearTimeout(timeout);
    }, [html, css, js]);


    const [activeTab, setActiveTab] = useState("html");

    const htmlRef = useRef(null);
    const cssRef = useRef(null);
    const jsRef = useRef(null);



    return (
        <div className="container-tab">

            <div className="display">
                <iframe
                    srcDoc={srcDoc}
                    title="output"
                    sandbox="allow-scripts"
                />
            </div>

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
                </div>

                <div className="editor">
                    {activeTab === "html" && (
                        <textarea
                            ref={htmlRef}
                            value={html}
                            onChange={(e) => setHtml(e.target.value)}
                            placeholder="Write HTML code here..."
                            className='codeinputer'
                        />
                    )}
                    {activeTab === "css" && (
                        <textarea
                            ref={cssRef}
                            value={css}
                            onChange={(e) => setCss(e.target.value)}
                            placeholder="Write CSS code here..."
                            className='codeinputer'
                        />
                    )}
                    {activeTab === "js" && (
                        <textarea
                            ref={jsRef}
                            value={js}
                            onChange={(e) => setJs(e.target.value)}
                            placeholder="Write JavaScript code here..."
                            className='codeinputer'
                        />
                    )}
                </div>
            </div>

        </div>
    );
};

export default SectionOne;

