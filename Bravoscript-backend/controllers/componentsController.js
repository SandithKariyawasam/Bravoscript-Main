
const SnippetModel = require('../models/component');

// 1. Controller to Save Code (THE FIXED VERSION)
const saveCode = async (req, res) => {
    try {
        const { id, html, css, javascript } = req.body;

        // Basic Validation
        if (!html && !css && !javascript) {
            return res.status(400).json({ message: "At least one code field is required." });
        }

        // PREPARE DATA: Create object without ID first to avoid "undefined" error
        const snippetData = {
            html: html || "",
            css: css || "",
            javascript: javascript || "",
            createdAt: new Date().toISOString()
        };

        // Only add ID if the user actually sent one (not null/undefined/empty)
        if (id) {
            snippetData.id = id;
        }

        // Call the Model
        const savedId = await SnippetModel.createSnippet(snippetData);

        res.status(201).json({ 
            message: "Code saved successfully", 
            id: savedId 
        });

    } catch (error) {
        console.error("Error saving code:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 2. Controller to Get Code (THIS WAS MISSING)
const getCode = async (req, res) => {
    try {
        const { id } = req.params;
        
        const snippet = await SnippetModel.getSnippetById(id);

        if (!snippet) {
            return res.status(404).json({ message: "Code not found" });
        }

        res.status(200).json(snippet);

    } catch (error) {
        console.error("Error fetching code:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getLatestCodes = async (req, res) => {
    try {
        const snippets = await SnippetModel.getLatestSnippets();
        res.status(200).json(snippets);
    } catch (error) {
        console.error("Error fetching latest:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Export BOTH functions
module.exports = { saveCode, getCode, getLatestCodes };