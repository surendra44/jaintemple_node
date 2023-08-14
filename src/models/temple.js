const mongoose = require('mongoose');

const templeDetailSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    Phonenumber1: String,
    Phonenumber2: String,
  },
  Address: {
    line_1: String,
    line_2: String,
    line_3: String,
    city: String,
    state: String,
    pincode: Number,
    country: String,
  },
});

const TempleDetail = mongoose.model('TempleDetail', templeDetailSchema);

module.exports = TempleDetail;

