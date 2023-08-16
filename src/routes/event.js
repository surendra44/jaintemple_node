import * as eventDetailController from "../controllers/eventDetail.controller";
const validate = require('../middleware/validate');
const eventValidation = require('../validators/event.validtion');
const verifyToken = require('../middleware/commonAuth');


import express from "express";



const router = express.Router({ mergeParams: true });


router.post('/addevent', validate(eventValidation.createEvent),verifyToken.checkSuperAdmin,eventDetailController.addEventDetail);
router.put('/updateevent/:id',validate(eventValidation.updateEvent), verifyToken.checkSuperAdmin,eventDetailController.updateEventDetail);
router.delete('/deleteevent/:id',validate(eventValidation.deleteEvent), verifyToken.checkSuperAdmin,eventDetailController.deleteEventDetail);
router.get('/getevent/:id',validate(eventValidation.getEventById),verifyToken.checkSuperAdmin, eventDetailController.getEventById);
router.get('/getallevent',verifyToken.checkSuperAdmin ,eventDetailController.getAllEvent);
// router.get('/roleById/:id', roleController.getRoleById);
// router.get('/allrole', roleController.getAllRoles);



export default router;
