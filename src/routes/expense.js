import * as expenseController from "../controllers/expense.controller";
const validate = require('../middleware/validate');
const expenseValidation = require('../validators/expense.valdation');
const verifyToken = require('../middleware/commonAuth');


import express from "express";



const router = express.Router({ mergeParams: true });


router.post('/addexpenses',verifyToken.checkSuperAdmin,validate(expenseValidation.createExpense),expenseController.addexpenses);
router.put('/updateExpenses/:id', verifyToken.checkSuperAdmin,validate(expenseValidation.updateExpense),expenseController.updateExpenses);
router.delete('/deleteExpense/:id', verifyToken.checkSuperAdmin,validate(expenseValidation.deleteExpense),expenseController.deleteExpense);
router.get('/getExpense/:id',verifyToken.checkSuperAdmin,validate(expenseValidation.getExpenseById), expenseController.getExpenseById);
router.get('/getallExpense',verifyToken.checkSuperAdmin,expenseController.getallExpense);




export default router;
