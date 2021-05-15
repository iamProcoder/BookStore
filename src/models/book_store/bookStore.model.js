const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookStoreSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    addresses: {
      type: String
    },
    books: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Book"
        }
    ]
  });

bookStoreSchema.index({
    bookStoreId: 1
});

module.exports = mongoose.model("BookStore", bookStoreSchema);