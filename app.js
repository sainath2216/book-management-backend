// app.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const booksRoutes = require('./routes/books');

// Use Routes
app.use('/api', booksRoutes); // Ensure the routes are applied here

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
