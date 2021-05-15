const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    pressYear : {
        type: Date
    }    
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    },
    timestamps: true
  }
);

bookSchema.index({
  bookId: 1
});

module.exports = mongoose.model("Book", bookSchema);