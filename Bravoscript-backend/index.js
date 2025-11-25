// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import Routes
const emailRoutes = require('./email'); 
const snippetRoutes = require('./routes/componentsRoutes'); 

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Use Routes
app.use('/api', emailRoutes);          
app.use('/api/code', snippetRoutes);   

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;