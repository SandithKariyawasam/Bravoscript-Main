import React, { useState, useEffect } from 'react';

const SectionSix = () => {
    const [snippets, setSnippets] = useState([]);

    // 1. Fetch Data from Backend
    useEffect(() => {
        const fetchLatest = async () => {
            try {
                // Note: Change this URL to your Vercel domain when deploying
                const res = await fetch('http://localhost:3000/api/code/latest');
                const data = await res.json();

                if (Array.isArray(data)) {
                    setSnippets(data);
                }
            } catch (error) {
                console.error("Error loading snippets:", error);
            }
        };

        fetchLatest();
    }, []);


    const getSrcDoc = (html, css, js) => {

        // --- 1. CLEANER ---
        const cleanHtml = html
            .replace(/<script[^>]*src=".*\/main\.j(s|sx)"[^>]*>[\s\S]*?<\/script>/gi, "")
            .replace(/<script\b[^>]*src=["'](?!http)[^"']*["'][^>]*>[\s\S]*?<\/script>/gi, "")
            .replace(/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["'](?!http)[^"']*["'][^>]*>/gi, "");

        return `
        <html>
          <head>
            <script>
              window.addEventListener('error', function(e) {
                console.error("Snippet Error:", e.error);
              });
            </script>

            <style>
                /* --- 2. SYSTEM RESETS --- */
                html, body {
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100%;
                    height: 100vh;
                    overflow: hidden;
                    background-color: transparent;
                }

                /* --- 3. CENTER THE PREVIEW --- */
                body {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                #preview-wrapper {
                    width: 100%;
                    height: 100%; 
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    transform: scale(1); /* Subtle zoom out to prevent scrollbars */
                    transform-origin: center center;
                }

                /* --- 4. USER CSS --- */
                ${css}
            </style>
          </head>
          <body>
            
            <div id="preview-wrapper">
                ${cleanHtml}
            </div>

            <script type="module">
                ${js}
            </script>
          </body>
        </html>
    `;
    };


    const SnippetCard = ({ item }) => (
        <div className="cardsix" key={item.id}>
            <iframe
                srcDoc={getSrcDoc(item.html, item.previewCss || item.css, item.javascript)}
                title={`project-${item.id}`}
                className="card-video"
                sandbox="allow-scripts"
                loading="lazy"
            />
            <span onClick={() => navigator.clipboard.writeText(item.css)}>
                <i className="fa-duotone fa-solid fa-code"></i>Get code
            </span>
        </div>
    );
    return (
        <>
            <div className="container-six">
                <h1>Latest New Posts</h1>
                <div className="container-cards">

                    {/* --- ROW 1 (Items 0 to 3) --- */}
                    <div className="cardsrow">
                        {snippets.slice(0, 3).map((item) => (
                            <SnippetCard item={item} key={item.id} />
                        ))}

                        {snippets.length === 0 && (
                            <p style={{ color: 'gray', fontStyle: 'italic' }}>Loading...</p>
                        )}
                    </div>

                    {/* --- ROW 2 (Items 3 to 6) --- */}
                    <div className="cardsrow">
                        {snippets.slice(3, 6).map((item) => (
                            <SnippetCard item={item} key={item.id} />
                        ))}
                    </div>

                </div>
                <button className='loadmore-btn'>
                    <i className="fa-solid fa-rocket"></i>Browse all components
                </button>
            </div>
        </>
    )
}

export default SectionSix;