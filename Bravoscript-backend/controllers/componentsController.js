
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
            previewCss: previewCss, // Save the AI version
            userId: userId || "anonymous",
            // --- UPDATED: Save the category (Default to 'Others' if missing)
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

        // 1. Check if ID is provided
        if (!id) {
            return res.status(400).json({ message: "Snippet ID is required" });
        }

        // 2. Perform the delete operation
        // We call the deleteSnippet function from your Model wrapper
        const result = await SnippetModel.deleteSnippet(id);

        // 3. Handle result
        if (!result) {
            return res.status(404).json({ message: "Snippet not found or could not be deleted" });
        }

        // 4. Success response
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

        // 1. Validate ID
        if (!id) {
            return res.status(400).json({ message: "Snippet ID is required" });
        }

        // 2. Prepare Update Data
        // We typically don't update the 'userId' to prevent ownership theft, 
        // but we update the code and the category.
        const updateData = {
            html: html || "",
            css: css || "",
            javascript: javascript || "",
            category: category || "Others",
            updatedAt: new Date().toISOString()
        };

        // 3. Call Model
        const result = await SnippetModel.updateSnippet(id, updateData);

        // 4. Handle Response
        if (!result) {
            return res.status(404).json({ message: "Snippet not found" });
        }

        res.status(200).json({ message: "Snippet updated successfully" });

    } catch (error) {
        console.error("Error updating snippet:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


module.exports = { saveCode, getCode, getLatestCodes, deleteCode, updateCode };