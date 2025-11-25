
const express = require('express');
const router = express.Router();
const snippetController = require('../controllers/componentsController');

// POST http://localhost:3000/api/code/save
router.post('/save', snippetController.saveCode);

// GET http://localhost:3000/api/code/:id  (e.g., /api/code/project1)
router.get('/:id', snippetController.getCode);

module.exports = router;