import React, { useState, useEffect, useRef } from "react";

const SectionOne = () => {
    const [html, setHtml] = useState("<h1>Hello World</h1>");
    const [css, setCss] = useState("h1 { color: red; text-align: center; }");
    const [js, setJs] = useState("console.log('JS Running')");
    const [srcDoc, setSrcDoc] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            const source = `
        <html>
          <head>
            <style>${css}</style>
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
        }, 300); // delay for auto-update

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
                <div className="tabs">
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
                        />
                    )}
                    {activeTab === "css" && (
                        <textarea
                            ref={cssRef}
                            value={css}
                            onChange={(e) => setCss(e.target.value)}
                            placeholder="Write CSS code here..."
                        />
                    )}
                    {activeTab === "js" && (
                        <textarea
                            ref={jsRef}
                            value={js}
                            onChange={(e) => setJs(e.target.value)}
                            placeholder="Write JavaScript code here..."
                        />
                    )}
                </div>
            </div>

        </div>
    );
};

export default SectionOne;

