import express from "express";
import * as donationController from "../controllers/donation.controller";
const verifyToken = require('../middleware/commonAuth');
const validate = require('../middleware/validate');
const donorValidation = require('../validators/donor.validator');

const router = express.Router({ mergeParams: true });

router.post('/addDonation/:id',verifyToken.checkSuperAdmin ,donationController.addDonation);
router.put('/updateDonation/:id',donationController.updateDonation);
router.delete('/deleteDonation/:id',donationController.deleteDonation);
router.get('/getDonation/:id',donationController.getDoationById);
router.get('/getallDonation',donationController.getallDonation);





export default router;

