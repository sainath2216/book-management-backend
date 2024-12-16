// db/database.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db'); // Create the database connection

// Create tables for books, genres, and authors (if they don't exist)
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS genres (GenreID INTEGER PRIMARY KEY, Name TEXT, Description TEXT)");
  db.run("CREATE TABLE IF NOT EXISTS authors (AuthorID INTEGER PRIMARY KEY, Name TEXT)");
  db.run(`CREATE TABLE IF NOT EXISTS books (
    BookID INTEGER PRIMARY KEY AUTOINCREMENT,
    Title TEXT,
    AuthorID INTEGER,
    GenreID INTEGER,
    Pages INTEGER,
    PublishedDate TEXT,
    FOREIGN KEY (AuthorID) REFERENCES authors(AuthorID),
    FOREIGN KEY (GenreID) REFERENCES genres(GenreID)
  )`);
});

module.exports = db;  // Export the database connection
