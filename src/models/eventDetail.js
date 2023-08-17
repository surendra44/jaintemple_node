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
  templeID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TempleDetail',
  },
  eventCategory: {
    type: Array,
    // You can specify any additional validation or options here
  },
});

const EventDetail = mongoose.model('EventDetail', eventDetailSchema);

module.exports = EventDetail;
