
require('dotenv').config();
const express = require('express');
const cors = require('cors');


const emailRoutes = require('./email');
const snippetRoutes = require('./routes/componentsRoutes');

const authRoutes = require('./routes/authRoutes'); 

const app = express();
const port = process.env.PORT || 3000; 

// ==================================================
// 2. CONFIGURE LIMITS (MUST BE BEFORE ROUTES)
// ==================================================
app.use(cors());


app.use(express.json({ limit: '50mb' }));


app.use(express.urlencoded({ limit: '50mb', extended: true })); 

// ==================================================
// 3. USE ROUTES (MUST BE AFTER LIMITS)
// ==================================================

app.use('/api/auth', authRoutes);

app.use('/api', emailRoutes);
app.use('/api/code', snippetRoutes);

app.get('/', (req, res) => {
    res.send('Backend is running');
});

// ==================================================
// 4. ERROR HANDLING (Good Practice)
// ==================================================
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that route!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;