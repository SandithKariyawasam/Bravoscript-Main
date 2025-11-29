import React, { useState, useEffect } from "react";

const SectionOne = () => {
    const [snippets, setSnippets] = useState([]);

    const getSrcDoc = (html, css, js) => {

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
                    cursor: pointer;
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

    useEffect(() => {
        const fetchComponents = async () => {
            try {
                const res = await fetch('https://bravoscript-main.vercel.app/api/code/latest');
                const data = await res.json();

                if (Array.isArray(data)) {
                    const validItems = data.filter(item => item.size !== 'Large');

                    setSnippets(validItems);
                }
            } catch (error) {
                console.error("Error loading SectionOne:", error);
            }
        };

        fetchComponents();
    }, []);


    const ComponentCard = ({ item }) => (
        <div className="divone" key={item._id || item.id} style={{ width: '100%', height: '350px' }}>
            <iframe
                srcDoc={getSrcDoc(item.html, item.css, item.javascript)}
                title={`project-${item._id}`}
                className="card-video"
                sandbox="allow-scripts"
                loading="lazy"
                style={{ width: '100%', height: '100%', border: 'none', borderRadius: '10px' }}
            />
            <span onClick={() => navigator.clipboard.writeText(item.css)}>
                <i className="fa-duotone fa-solid fa-code"></i>Get code
            </span>
        </div>
    );

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("All");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
        console.log(`Selected: ${item}`);
    };

    return (
        <div className="iconone">
            <div className="iconone-main">
                <div className="iconone-one">
                    <h1>Browse all components</h1>
                    <p>Open-Source UI elements made with CSS or Tailwind and Javascript</p>
                </div>
                <div className="iconone-two dropdown-container">
                    <div className="dropdown-trigger" onClick={toggleDropdown}>
                        <h2>{selectedItem} <span className={`arrow ${isOpen ? 'up' : 'down'}`}>▼</span></h2>
                    </div>
                    {isOpen && (
                        <div className="iconone-list dropdown-menu">
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
            </div>

            <div className="parent">
                <div className="child">

                    {snippets.length > 0 ? (
                        snippets.map((item) => (
                            <ComponentCard item={item} key={item._id || item.id} />
                        ))
                    ) : (
                        <div className="loader-wrap">
                            <div class="loader">
                                <div class="justify-content-center jimu-primary-loading"></div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default SectionOne;