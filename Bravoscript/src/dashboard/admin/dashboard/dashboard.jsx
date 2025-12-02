import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./dashboard.css"

const Dashboard = () => {
    const [snippets, setSnippets] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("All");
    
    const navigate = useNavigate();

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

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this component?");

        if (confirmDelete) {
            try {
                const response = await fetch(`https://bravoscript-main.vercel.app/api/code/delete/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert("Component deleted successfully!");
                    window.location.reload(); 
                } else {
                    const errorData = await response.json();
                    alert(`Failed to delete: ${errorData.message}`);
                }
            } catch (error) {
                console.error("Error deleting:", error);
                alert("Error connecting to server.");
            }
        }
    };

    const handleUpdate = (item) => {
        navigate('/admin/dashboard//update', { state: { snippetData: item } });
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
            <div className="dashboard-btn">
              <button 
                style={{backgroundColor:"#007bff"}}
                onClick={() => handleUpdate(item)}
              >
                Update
              </button>

              <button 
                style={{backgroundColor:"#dc3545"}}
                onClick={() => handleDelete(item._id || item.id)}
              >
                Delete
              </button>
            </div>
        </div>
    );

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
                    <h1>All components</h1>
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
                            <div style={{color: 'white', textAlign: 'center', width: '100%', marginTop: '50px'}}>
                                <h3>No components found in "{selectedItem}"</h3>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;