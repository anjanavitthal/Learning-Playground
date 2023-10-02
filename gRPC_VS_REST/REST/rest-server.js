const express = require("express");
const app = express();
const port = 3000;

// Sample book details (you can replace these with your data)
const book = {
  title: "Lord of the Rings",
  description:
    "The Lord of the Rings is the saga of a group of sometimes reluctant heroes who set forth to save their world from consummate evil...",
  author: "J. R. R. Tolkien",
};

// Define a GET endpoint to retrieve book details
app.get("/api/book", (req, res) => {
  let searchQuery = req.params.search_query;
  console.log(searchQuery)
  res.json(book);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
