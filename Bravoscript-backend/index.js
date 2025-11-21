require('dotenv').config();
const express = require('express');
const cors = require('cors');

// 1. Import your new email file
const emailRoutes = require('./email');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// 2. Use the email routes
// This tells Express: "If a request starts with /api, look inside email.js"
app.use('/api', emailRoutes);

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;