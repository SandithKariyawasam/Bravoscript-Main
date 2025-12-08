
const express = require('express');
const router = express.Router();
const snippetController = require('../controllers/componentsController');
const { generatePreviewCode } = require('../controllers/aiController');

// POST http://localhost:3000/api/code/save
router.post('/save', snippetController.saveCode);

router.get('/latest', snippetController.getLatestCodes);

// GET http://localhost:3000/api/code/:id  (e.g., /api/code/project1)
router.get('/:id', snippetController.getCode);

router.post('/upload', async (req, res) => {
    const { html, css, js, title } = req.body;

    try {
        // 1. Run the AI processing
        console.log("Generating AI preview...");
        const aiGeneratedCss = await generatePreviewCode(html, css);

        // 2. Save BOTH versions to your Database (Firestore)
        const newSnippet = {
            title,
            html,
            js,
            css: css,
            previewCss: aiGeneratedCss,
            userId,
            category,
            createdAt: new Date()
        };


        res.json({ success: true, message: "Snippet saved!" });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.delete('/delete/:id', snippetController.deleteCode);

router.put('/update/:id', snippetController.updateCode);

router.get('/user/:userId', snippetController.getUserSnippets);

module.exports = router;