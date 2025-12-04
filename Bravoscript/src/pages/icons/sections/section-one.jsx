import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

const SectionOne = () => {
    const [snippets, setSnippets] = useState([]);
    const navigate = useNavigate(); // 2. Initialize hook

    const getSrcDoc = (html, css, js) => {
        const cleanHtml = html
            .replace(/<script[^>]*src=".*\/main\.j(s|sx)"[^>]*>[\s\S]*?<\/script>/gi, "")
            .replace(/<script\b[^>]*src=["'](?!http)[^"']*["'][^>]*>[\s\S]*?<\/script>/gi, "")
            .replace(/<link\b[^>]*rel=["']stylesheet["'][^>]*href=["'](?!http)[^"']*["'][^>]*>/gi, "");

        return `
        <html>
          <head>
            <style>
                html, body { margin: 0 !important; padding: 0 !important; width: 100%; height: 100vh; overflow: hidden; background-color: transparent; }
                body { display: flex; justify-content: center; align-items: center; cursor: pointer; }
                #preview-wrapper { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; transform: scale(1); transform-origin: center center; }
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

    // --- NEW: Handle Navigation ---
    const handleGetCode = (item) => {
        // Navigate to '/details' and pass the item data in state
        navigate('/details', { state: { snippetData: item } });
    };

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
            {/* 3. Update onClick to trigger navigation */}
            <span onClick={() => handleGetCode(item)} style={{cursor: 'pointer'}}>
                <i className="fa-duotone fa-solid fa-code"></i> Get code
            </span>
        </div>
    );

    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("All");

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleSelect = (item) => {
        setSelectedItem(item);
        setIsOpen(false);
    };

    const filteredSnippets = snippets.filter((item) => {
        if (selectedItem === "All") return true;
        return item.category === selectedItem;
    });

    return (
        <div className="iconone">
            <div className="iconone-main">
                <div className="iconone-one">
                    <h1>Browse all components</h1>
                    <p>Open-Source UI elements made with CSS or Tailwind and Javascript</p>
                </div>
                <div className="iconone-two dropdown-container">
                    <div className="dropdown-trigger" onClick={toggleDropdown}>
                        <h2>{selectedItem} <span className={`arrows ${isOpen ? 'up' : 'down'}`}>▼</span></h2>
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
                    {filteredSnippets.length > 0 ? (
                        filteredSnippets.map((item) => (
                            <ComponentCard item={item} key={item._id || item.id} />
                        ))
                    ) : (
                        snippets.length === 0 ? (
                            <div className="loader-wrap">
                                <div className="loader">
                                    <div className="justify-content-center jimu-primary-loading"></div>
                                </div>
                            </div>
                        ) : (
                            <div style={{ color: 'white', textAlign: 'center', width: '100%', marginTop: '50px' }}>
                                <h3>No components found in "{selectedItem}"</h3>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default SectionOne;