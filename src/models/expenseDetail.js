const mongoose = require("mongoose");

const expensesDetailSchema = new mongoose.Schema({
  expensesName: {
    type: String,
  },
  expensesCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ExpensesCategory",
  },
  eventExpensesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventDetail",
  },
  eventCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventCategory",
  },
  expensesAccNumberFrom: {
    type: String,
  },
  expensesPayemntType: {
    type: String,
  },
  expensesAccNumberTo: {
    type: String,
  },
  payeeName: {
    type: String,
  },
  expensesAmount: {
    type: Number,
  },
  expensesDetail: {
    type: String,
  },
  templeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TempleDetail",
  },
  expensesStatus: {
    type: String,
  },
  expensesDate: {
    type: Date,
    default: Date.now,
  },
});

const ExpensesDetail = mongoose.model("ExpensesDetail", expensesDetailSchema);

module.exports = ExpensesDetail;
