
const SnippetModel = require('../models/component');
const { generatePreviewCode } = require('./aiController');

// 1. Controller to Save Code (THE FIXED VERSION)
const saveCode = async (req, res) => {
    try {
        // 1. Get userId AND category from the request body
        // --- UPDATED: Added 'category' here
        const { id, html, css, javascript, userId, category } = req.body;

        if (!html && !css && !javascript) {
            return res.status(400).json({ message: "Required fields missing" });
        }

        // 2. ASK GEMINI TO OPTIMIZE CSS
        let previewCss = css; // Default to normal CSS
        try {
            console.log("Asking Gemini AI...");
            previewCss = await generatePreviewCode(html, css);
        } catch (err) {
            console.log("AI skipped due to error, using normal CSS");
        }

        // 3. SAVE TO DATABASE
        const snippetData = {
            html: html || "",
            css: css || "",
            javascript: javascript || "",
            previewCss: previewCss, 
            userId: userId || "anonymous",
            category: category || "Others",
            createdAt: new Date().toISOString()
        };

        if (id) snippetData.id = id;

        const savedId = await SnippetModel.createSnippet(snippetData);

        res.status(201).json({
            message: "Code saved with AI optimization!",
            id: savedId
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 2. Controller to Get Code
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

const deleteCode = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Snippet ID is required" });
        }

        const result = await SnippetModel.deleteSnippet(id);

        if (!result) {
            return res.status(404).json({ message: "Snippet not found or could not be deleted" });
        }

        res.status(200).json({ message: "Snippet deleted successfully" });

    } catch (error) {
        console.error("Error deleting snippet:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


const updateCode = async (req, res) => {
    try {
        const { id } = req.params;
        const { html, css, javascript, category, userId } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Snippet ID is required" });
        }

        const updateData = {
            html: html || "",
            css: css || "",
            javascript: javascript || "",
            category: category || "Others",
            updatedAt: new Date().toISOString()
        };

        const result = await SnippetModel.updateSnippet(id, updateData);

        if (!result) {
            return res.status(404).json({ message: "Snippet not found" });
        }

        res.status(200).json({ message: "Snippet updated successfully" });

    } catch (error) {
        console.error("Error updating snippet:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getUserSnippets = async (req, res) => {
    try {
        const { userId } = req.params;

        const snippets = await SnippetModel.getSnippetsByUser(userId);

        res.status(200).json(snippets);
    } catch (error) {
        console.error("Error fetching user snippets:", error);
        res.status(500).json({ message: "Server Error" });
    }
};


module.exports = { saveCode, getCode, getLatestCodes, deleteCode, updateCode, getUserSnippets };