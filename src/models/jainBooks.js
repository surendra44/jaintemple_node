const mongoose = require('mongoose');

const jainBooksSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  books: {
    type: String,
  }
});


const JainBooks = mongoose.model('JainBooks', jainBooksSchema);

module.exports = JainBooks;
