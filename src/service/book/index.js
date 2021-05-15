
const getAllBooks = async tenantDbConnection => {
  try {
    const Book = await tenantDbConnection.model("Book");
    const books = await Book.find({});
    return books;

  } catch (error) {
    throw error;
  }
};

const createBook = async (tenantDbConnection, body) => {
  try {
    const Book = await tenantDbConnection.model("Book");
    const addInformation = body;
    const newBook = await Book.create({...addInformation});
    return newBook;
    
  } catch (error) {
    throw error;
  }
};

module.exports = { getAllBooks, createBook };