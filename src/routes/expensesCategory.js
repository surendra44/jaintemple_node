import * as expCategoryController from "../controllers/expenseCategory.controller";
const validate = require('../middleware/validate');
const expenseCategoryValidation = require('../validators/expenseCategory.validation');
const verifyToken = require('../middleware/commonAuth');


import express from "express";



const router = express.Router({ mergeParams: true });


router.post('/addexpensessCategory',verifyToken.checkSuperAdmin,validate(expenseCategoryValidation.createExpenseCategory),expCategoryController.addExpenseCategory);
router.put('/updateExpCategory/:id', verifyToken.checkSuperAdmin,validate(expenseCategoryValidation.updateExpenseCategory),expCategoryController.updateExpCategory);
router.delete('/deleteExpCategory/:id', verifyToken.checkSuperAdmin,validate(expenseCategoryValidation.deleteExpenseCategory),expCategoryController.deleteexpCategory);
router.get('/getExpCategory/:id',verifyToken.checkSuperAdmin,validate(expenseCategoryValidation.getExpenseCategory),expCategoryController.getExpCategoryById);
router.get('/getallExpCategory',verifyToken.checkSuperAdmin ,expCategoryController.getallexpCategory);




export default router;
