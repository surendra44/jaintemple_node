const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donar', // Reference to Doner model
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventDetail', // Reference to EventDetail model
    required: true,
  },
  eventCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventCategory', // Reference to EventDetail model
    required: true,
  },
  templeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TempleDetail', // Reference to TempleDetail model
    required: true,
  },
  donationMode: {
    type: String,
    required: true,
  },
  donationAmount: {
    type: Number,
    required: true,
  },
  donationStatus: {
    type: String,
    required: true,
  },
  donationDetail: {
    type: String,
  },
  donationAccNumber: {
    type: String,
  },
  donateToAccNumber: {
    type: String,
  },
  donationDate: {
    type: Date,
    default: Date.now,
  },
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
