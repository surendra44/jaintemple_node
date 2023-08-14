const mongoose = require('mongoose');

const expensesCategorySchema = new mongoose.Schema({
  ExpensesCategory: {
    type: String,
    required: true,
  },
  ExpensesCategoryDetail: {
    type: String,
  },
  EventExpensesID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EventExpenses', // You can replace 'EventExpenses' with the actual model name for event expenses
  },
  TempleID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TempleDetail', // You can replace 'TempleDetail' with the actual model name for temple details
  },
});

const ExpensesCategory = mongoose.model('ExpensesCategory', expensesCategorySchema);

module.exports = ExpensesCategory;
