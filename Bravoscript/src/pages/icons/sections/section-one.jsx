import React, { useState, useEffect, useRef } from "react";

const SectionOne = () => {

    const [html, setHtml] = useState("<h1>Hello Bossa</h1>");
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

    return (
        <>
            <div className="iconone">
                <h1>Browse all components</h1>
                <p>Open-Source UI elements made with CSS or Tailwind and Javascript</p>

                <div className="parent">
                    <div class="child">
                        <div class="divone">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                        <div class="divone">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                        <div class="divone">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                        <div class="divone">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                        <div class="divone">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                    </div>
                    <div class="child">
                        <div class="divone">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                        <div class="divone">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                        <div class="divone">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                        <div class="divone">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                        <div class="divone">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                    </div>
                    <div class="child">
                        <div class="divone">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                        <div class="divone">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                        <div class="divone">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                        <div class="divone">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                        <div class="divone">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default SectionOne
