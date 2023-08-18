const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donarId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donar',
    required: true, // Reference to Doner model
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventDetail', // Reference to EventDetail model
  },
  eventCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventCategory', // Reference to EventDetail model

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
