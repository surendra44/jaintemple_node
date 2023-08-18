const mongoose = require('mongoose');

const eventDetailSchema = new mongoose.Schema({
  eventName: {
    type: String,
  },
  eventDetail: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  templeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TempleDetail',
  },
  eventCategory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventCategory',
  }],
});

// ddddda
const EventDetail = mongoose.model('EventDetail', eventDetailSchema);

module.exports = EventDetail;
