require('dotenv').config();
const express = require('express');
const cors = require('cors');

// 1. Import Routes
const emailRoutes = require('./email');
const snippetRoutes = require('./routes/componentsRoutes');

const app = express();
const port = 3000;

// ==================================================
// 2. CONFIGURE LIMITS (MUST BE BEFORE ROUTES)
// ==================================================
app.use(cors());

// Increase the limit to 50mb for JSON bodies
app.use(express.json({ limit: '50mb' }));

// Increase the limit for URL encoded bodies (standard forms)
app.use(express.urlencoded({ limit: '50mb', extended: true })); 

// ==================================================
// 3. USE ROUTES (MUST BE AFTER LIMITS)
// ==================================================
app.use('/api', emailRoutes);
app.use('/api/code', snippetRoutes);

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;