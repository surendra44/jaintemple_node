import * as expCategoryController from "../controllers/expenseCategory.controller";
const validate = require('../middleware/validate');
const eventValidation = require('../validators/event.validtion');
const verifyToken = require('../middleware/commonAuth');


import express from "express";



const router = express.Router({ mergeParams: true });


router.post('/addexpensessCategory',verifyToken.checkSuperAdmin,expCategoryController.addExpenseCategory);
router.put('/updateevent/:id', verifyToken.checkSuperAdmin,expCategoryController.updateExpCategory);
// router.delete('/deleteevent/:id',validate(eventValidation.deleteEvent), verifyToken.checkSuperAdmin,eventDetailController.deleteEventDetail);
// router.get('/getevent/:id',validate(eventValidation.getEventById),verifyToken.checkSuperAdmin, eventDetailController.getEventById);
// router.get('/getallevent',verifyToken.checkSuperAdmin ,eventDetailController.getAllEvent);




export default router;
