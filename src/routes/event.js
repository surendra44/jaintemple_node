import * as eventDetailController from "../controllers/eventDetail.controller";
const validate = require('../middleware/validate');
const eventValidation = require('../validators/event.validtion');
const verifyToken = require('../middleware/commonAuth');


import express from "express";



const router = express.Router({ mergeParams: true });


router.post('/addevent',verifyToken.checkSuperAdmin,validate(eventValidation.createEvent),eventDetailController.addEventDetail);
router.put('/updateevent/:id', verifyToken.checkSuperAdmin,validate(eventValidation.updateEvent),eventDetailController.updateEventDetail);
router.delete('/deleteevent/:id', verifyToken.checkSuperAdmin,validate(eventValidation.deleteEvent),eventDetailController.deleteEventDetail);
router.get('/getevent/:id', verifyToken.checkSuperAdmin,validate(eventValidation.getEventById),eventDetailController.getEventById);
router.get('/getallevent',verifyToken.checkSuperAdmin ,eventDetailController.getAllEvent);


router.post('/addeventCategory', verifyToken.checkSuperAdmin,validate(eventValidation.createCategory),eventDetailController.addEventCategory);
router.put('/updateEventCategory/:id', verifyToken.checkSuperAdmin,validate(eventValidation.updateCategory),eventDetailController.updateEventCategory);
router.delete('/deleteCategory/:id', verifyToken.checkSuperAdmin,validate(eventValidation.deleteCategory),eventDetailController.deleteCategory);
router.get('/getCategory/:id',  verifyToken.checkSuperAdmin,validate(eventValidation.getCategoryById),eventDetailController.getCategoryByID);
router.patch('/manage-status/:id',verifyToken.checkSuperAdmin,validate(eventValidation.softdelteEventById),eventDetailController.changeEventStatus);
router.get('/getAllCategory',verifyToken.checkSuperAdmin,eventDetailController.getAllCategory);



export default router;
