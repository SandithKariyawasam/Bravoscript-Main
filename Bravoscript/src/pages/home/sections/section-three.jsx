import React, { useState, useEffect } from "react";

const SectionThree = () => {
    const [snippets, setSnippets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    const row = Array.from({ length: 8 });

    const getSrcDoc = (html, css, js) => {
        const cleanHtml = html
            ? html
                .replace(/<script[^>]*src=".*\/main\.j(s|sx)"[^>]*>[\s\S]*?<\/script>/gi, "")
                .replace(/<script\b[^>]*src=["'](?!http)[^"']*["'][^>]*>[\s\S]*?<\/script>/gi, "")
                .replace(/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["'](?!http)[^"']*["'][^>]*>/gi, "")
            : "";

        return `
            <html>
              <head>
                <script>
                  window.addEventListener('error', function(e) { console.error("Snippet Error:", e.error); });
                </script>
                <style>
                    html, body { margin: 0 !important; padding: 0 !important; width: 100%; height: 100vh; overflow: hidden; background: transparent; }
                    body { display: flex; justify-content: center; align-items: center; }
                    
                    #preview-wrapper {
                        width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;
                        transform: scale(1);
                        transform-origin: center center;
                    }
                    ${css}
                </style>
              </head>
              <body>
                <div id="preview-wrapper">${cleanHtml}</div>
                <script type="module">${js}</script>
              </body>
            </html>
        `;
    };

    useEffect(() => {
        const fetchLatest = async () => {
            setLoading(true);
            try {
                const res = await fetch('https://bravoscript-main.vercel.app/api/code/latest');
                const data = await res.json();

                if (Array.isArray(data)) {
                    setSnippets(data);
                }
            } catch (error) {
                console.error("Error loading snippets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatest();
    }, []);

    // Filter Logic
    const filteredSnippets = snippets.filter((item) => {
        if (!searchTerm) return true;
        return item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // --- 3. SUB-COMPONENT: The Card ---
    const SnippetCard = ({ item }) => {
        // If loading, show placeholder
        if (loading && !item) {
            return (
                <div className="sectionthree-card">
                    <div className="card__content">
                        <iframe
                            srcDoc="<html><body style='display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#000;'><h1 style='color:red;font-family:sans-serif;'>Loading...</h1></body></html>"
                            className="card-video"
                            title="placeholder"
                        />
                    </div>
                </div>
            )
        }

        // If not loading and no item, show nothing (empty slot)
        if (!item) {
            return <div className="sectionthree-card" style={{ visibility: 'hidden', pointerEvents: 'none' }}></div>;
        }

        return (
            <div className="sectionthree-card" key={item._id || item.id}>
                <div className="card__content">
                    <iframe
                        srcDoc={getSrcDoc(item.html, item.css, item.js)}
                        title={`project-${item._id}`}
                        className="card-video"
                        sandbox="allow-scripts"
                        loading="lazy"
                    />
                    <span onClick={() => navigator.clipboard.writeText(item.css)}>
                        <i className="fa-duotone fa-solid fa-code"></i>Get code
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="sectionthree">
            <p className='three-elementsone'><i className="fa-solid fa-rocket"></i>Fresh Elements</p>
            <h2>The Largest Library of Open-Source Components</h2>
            <p className='three-elementstwo'>
                Community-built library of UI components. Copy as HTML/CSS, Tailwind, React and Figma.
            </p>

            <label className="label">
                <div className="shortcut"><i className="fa-solid fa-magnifying-glass"></i></div>
                <input 
                    type="text" 
                    className="search_bar" 
                    placeholder="Search Components... (e.g., Buttons, Loaders)" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </label>

            <div className="rows-container">

                {/* --- ROW 1 (Items 0 to 8) --- */}
                <div className="row" style={{ marginLeft: "10em" }}>
                    {row.map((_, i) => (
                        <SnippetCard item={filteredSnippets[i]} key={`r1-${i}`} />
                    ))}
                </div>

                {/* --- ROW 2 (Items 8 to 16) --- */}
                <div className="row" style={{ marginRight: "10em" }}>
                    {row.map((_, i) => (
                        <SnippetCard item={filteredSnippets[i + 8]} key={`r2-${i}`} />
                    ))}
                </div>

                {/* --- ROW 3 (Items 16 to 24) --- */}
                <div className="row rowthree" style={{ marginLeft: "10em" }}>
                    {row.map((_, i) => (
                        <SnippetCard item={filteredSnippets[i + 16]} key={`r3-${i}`} />
                    ))}
                    <div className="blur-overlay"></div>
                </div>

            </div>

            <button className='loadmore-btn'>
                <i className="fa-solid fa-rocket"></i>Browse all components
            </button>
        </div>
    );
};

export default SectionThree;


