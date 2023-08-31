import * as dailyEventController from "../controllers/dailyEvent.controller";
const validate = require('../middleware/validate');
// const eventValidation = require('../validators/event.validtion');
const verifyToken = require('../middleware/commonAuth');


import express from "express";



const router = express.Router({ mergeParams: true });


router.post('/addDailyevent',verifyToken.checkSuperAdmin,dailyEventController.addDailyEventCategory);
router.put('/updateDailyCategory/:id', verifyToken.checkSuperAdmin,dailyEventController.updateEventCategory);
router.delete('/deleteDailyCategory/:id', verifyToken.checkSuperAdmin,dailyEventController.deleteCategory);
router.get('/getDailyCategory/:id',  verifyToken.checkSuperAdmin,dailyEventController.getCategoryByID);
router.get('/getAllDailyCategory',verifyToken.checkSuperAdmin,dailyEventController.getAllCategory);



export default router;
