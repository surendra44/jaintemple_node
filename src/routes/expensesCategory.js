import * as expCategoryController from "../controllers/expenseCategory.controller";
const validate = require('../middleware/validate');
const eventValidation = require('../validators/event.validtion');
const verifyToken = require('../middleware/commonAuth');


import express from "express";



const router = express.Router({ mergeParams: true });


router.post('/addexpensessCategory',verifyToken.checkSuperAdmin,expCategoryController.addExpenseCategory);
router.put('/updateExpCategory/:id', verifyToken.checkSuperAdmin,expCategoryController.updateExpCategory);
router.delete('/deleteExpCategory/:id', verifyToken.checkSuperAdmin,expCategoryController.deleteexpCategory);
router.get('/getExpCategory/:id',verifyToken.checkSuperAdmin, expCategoryController.getExpCategoryById);
router.get('/getallExpCategory',verifyToken.checkSuperAdmin ,expCategoryController.getallexpCategory);




export default router;
