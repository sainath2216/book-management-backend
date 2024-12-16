// app.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const booksRoutes = require("./routes/books");

app.get("/", (req, res) => {
  res.send("Welcome to the Book Management Database!");
});

app.use("/api", booksRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
