const mongoose = require('mongoose');

const expensesDetailSchema = new mongoose.Schema({
  expensesName:  {
    type: String
},
  expensesCategoryID:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExpensesCategory'
  },
  expensesAccNumberFrom:  {
    type: String
  },
  expensesAccNumberTo:  {
    type: String
  },
  expensesAmount:  {
    type: Number
  },
  expensesDetail:  {
    type: String
  },
  templeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TempleDetail'
  },
  expensesStatus: {
    type: String
  },
  expensesDate: {
    type: Date,
    default: Date.now
  }
});




const ExpensesDetail = mongoose.model('ExpensesDetail', expensesDetailSchema);

module.exports = ExpensesDetail;
