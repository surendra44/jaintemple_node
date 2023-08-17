const mongoose = require('mongoose');

const eventCategorySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  }
});

const EventCategory = mongoose.model('EventCategory', eventCategorySchema);

module.exports = EventCategory;
