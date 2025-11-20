// index.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies (optional but useful)
app.use(express.json());

// Define a basic route
app.get('/', (req, res) => {
  res.send('Hello World! This is my Express server.');
});

// Define a sample API route
app.get('/api/user', (req, res) => {
  res.json({ name: 'John Doe', role: 'Developer' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;