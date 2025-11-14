import React, { useState, useEffect, useRef } from "react";
import '../home.css'

import video from "../../../assets/videos/white.mp4"

const SectionSix = () => {

    const [html, setHtml] = useState("<h1>Hello Sandith</h1>");
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
            <div className="container-six">
                <h1>Latest New Posts</h1>
                <div className="container-cards">
                    <div className="cardsrow">

                        <div className="cardsix">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin" // allow-same-origin if you need cookies/localStorage
                            />
                            <span><i class="fa-duotone fa-solid fa-code"></i>Get code</span>
                        </div>
                        <div className="cardsix">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin" // allow-same-origin if you need cookies/localStorage
                            />
                            <span><i class="fa-duotone fa-solid fa-code"></i>Get code</span>
                        </div>
                        <div className="cardsix">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin" // allow-same-origin if you need cookies/localStorage
                            />
                            <span><i class="fa-duotone fa-solid fa-code"></i>Get code</span>
                        </div>

                    </div>
                    <div className="cardsrow">

                        <div className="cardsix">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin" // allow-same-origin if you need cookies/localStorage
                            />
                            <span><i class="fa-duotone fa-solid fa-code"></i>Get code</span>
                        </div>
                        <div className="cardsix">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin" // allow-same-origin if you need cookies/localStorage
                            />
                            <span><i class="fa-duotone fa-solid fa-code"></i>Get code</span>
                        </div>
                        <div className="cardsix">
                            <iframe
                                srcDoc={srcDoc}
                                title="{`project-${i}`}"
                                className="card-video"
                                sandbox="allow-scripts allow-same-origin" // allow-same-origin if you need cookies/localStorage
                            />
                            <span><i class="fa-duotone fa-solid fa-code"></i>Get code</span>
                        </div>

                    </div>
                </div>
                <button className='loadmore-btn'><i class="fa-solid fa-rocket"></i>Browse all components</button>
            </div>
        </>
    )
}

export default SectionSix
