const mongoose = require('mongoose');

const tithiSchema = new mongoose.Schema({
  tithi: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  CreationDate: { type: Date, default: Date.now },

});

const Tithi = mongoose.model('Tithi', tithiSchema);

module.exports = Tithi;
