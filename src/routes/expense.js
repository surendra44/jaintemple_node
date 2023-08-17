import * as expenseController from "../controllers/expense.controller";
const validate = require('../middleware/validate');
const eventValidation = require('../validators/event.validtion');
const verifyToken = require('../middleware/commonAuth');


import express from "express";



const router = express.Router({ mergeParams: true });


router.post('/addexpenses',verifyToken.checkSuperAdmin,expenseController.addexpenses);
router.put('/updateExpenses/:id', verifyToken.checkSuperAdmin,expenseController.updateExpenses);
router.delete('/deleteExpense/:id', verifyToken.checkSuperAdmin,expenseController.deleteExpense);
router.get('/getExpense/:id',verifyToken.checkSuperAdmin, expenseController.getExpenseById);
router.get('/getallExpense',verifyToken.checkSuperAdmin ,expenseController.getallExpense);




export default router;
