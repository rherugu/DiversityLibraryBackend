const mongoose = require("mongoose");

const BooksSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: false,
  },
  cover: {
    type: String,
    required: false,
  },
  checkedOut: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Book", BooksSchema);
