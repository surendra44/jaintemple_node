const mongoose = require('mongoose');

const dailyCategoryEventSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  }
});

const DaiailyCategoryEvent = mongoose.model('DaiailyCategoryEvent', dailyCategoryEventSchema);

module.exports = DaiailyCategoryEvent;
