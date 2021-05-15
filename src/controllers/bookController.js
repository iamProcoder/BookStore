const { getConnection, connectAllDb } = require("../helper/connectionManager");
const bookService = require("../service/book");

const addBook = async (req, res) => {
  try {
    connectAllDb();
    const dbConnection = getConnection();

    const book = await bookService.createBook(dbConnection, req.body);
    res.status(200).json({ success: true, book });

  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const fetchAll = async (req, res) => {
  try {
    const dbConnection = getConnection();
    const books = await bookService.getAllBooks(dbConnection);
    res.status(200).json({ success: true, books });

  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

module.exports = { addBook, fetchAll };