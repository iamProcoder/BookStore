const { getConnection, connectAllDb } = require("../helper/connectionManager");
const bookStoreService = require("../service/bookStore");

const addBookStore = async (req, res) => {
  try {
    connectAllDb();
    const dbConnection = getConnection();

    const book = await bookStoreService.createBookStore(dbConnection, req.body);
    res.status(200).json({ success: true, book });

  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

const fetchAll = async (req, res) => {
  try {
    const dbConnection = getConnection();

    const books = await bookStoreService.getAllBookStore(dbConnection);
    res.status(200).json({ success: true, books });

  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
};

module.exports = { addBookStore, fetchAll };