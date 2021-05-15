
const getAllBookStore = async tenantDbConnection => {
    try {
      const Book = await tenantDbConnection.model("BookStore");
      const books = await Book.find({});
      return books;
  
    } catch (error) {
      throw error;
    }
  };
  
  const createBookStore = async (tenantDbConnection, body) => {
    try {
      const Book = await tenantDbConnection.model("BookStore");
      const addInformation = body;
      const newBook = await Book.create({...addInformation});
      return newBook;
      
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = { getAllBookStore, createBookStore };