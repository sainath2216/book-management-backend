const express = require('express');
const router = express.Router();  // Create a new router instance
const db = require('../db/database');  // Import the database connection

// GET all books
router.get('/books', (req, res) => {
  const { author, genre } = req.query;  // Optionally filter by author and genre
  let query = 'SELECT * FROM books';
  let params = [];

  if (author || genre) {
    query += ' WHERE';
    if (author) {
      query += ' AuthorID = ?';
      params.push(author);
    }
    if (genre) {
      if (author) query += ' AND';
      query += ' GenreID = ?';
      params.push(genre);
    }
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error("Database Error: ", err);  // Log the error for debugging
      res.status(500).json({ message: 'Error fetching books' });
    } else {
      res.json(rows);  // Send the rows as the response
    }
  });
});

// GET a book by ID

router.get('/books/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM books WHERE BookID = ?';
  
    db.get(query, [id], (err, row) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching book' });
      } else if (!row) {
        res.status(404).json({ message: 'Book not found' });
      } else {
        res.json(row);
      }
    });
  });

// POST a new book
router.post('/books', (req, res) => {
  const { title, authorID, genreID, pages, publishedDate } = req.body;

  // Validate that all fields are provided
  if (!title || !authorID || !genreID || !pages || !publishedDate) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  const query = 'INSERT INTO books (Title, AuthorID, GenreID, Pages, PublishedDate) VALUES (?, ?, ?, ?, ?)';
  const params = [title, authorID, genreID, pages, publishedDate];

  db.run(query, params, function (err) {
    if (err) {
      console.error("Database Error: ", err);  // Log the error for debugging
      res.status(500).json({ message: 'Error adding book' });
    } else {
      res.status(201).json({ message: 'Book added', bookID: this.lastID });
    }
  });
});

// PUT (Update) a book by ID
router.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, authorID, genreID, pages, publishedDate } = req.body;

  const query = 'UPDATE books SET Title = ?, AuthorID = ?, GenreID = ?, Pages = ?, PublishedDate = ? WHERE BookID = ?';
  const params = [title, authorID, genreID, pages, publishedDate, id];

  db.run(query, params, function (err) {
    if (err) {
      console.error("Database Error: ", err);  // Log the error for debugging
      res.status(500).json({ message: 'Error updating book' });
    } else {
      res.json({ message: 'Book updated' });
    }
  });
});

// DELETE a book by ID
router.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM books WHERE BookID = ?';
  
    db.run(query, [id], function (err) {
      if (err) {
        res.status(500).json({ message: 'Error deleting book' });
      } else if (this.changes === 0) {
        res.status(404).json({ message: 'Book not found' });
      } else {
        res.json({ message: 'Book deleted' });
      }
    });
  });
  
module.exports = router;  // Export the router
