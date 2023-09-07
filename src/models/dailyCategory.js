const mongoose = require('mongoose');

const dailyCategoryEventSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  }
});

const DailyCategoryEvent = mongoose.model('DailyCategoryEvent', dailyCategoryEventSchema);

module.exports = DailyCategoryEvent;
