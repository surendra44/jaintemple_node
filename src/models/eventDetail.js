const mongoose = require('mongoose');

const eventDetailSchema = new mongoose.Schema({
  EventName: {
    type: String,
  },
  EventDetail: {
    type: String,
  },
  StartDate: {
    type: Date,
  },
  EndDate: {
    type: Date,
  },
  TempleID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TempleDetail',
  },
  EventCategory: {
    type: String,
    // You can specify any additional validation or options here
  },
});

const EventDetail = mongoose.model('EventDetail', eventDetailSchema);

module.exports = EventDetail;
