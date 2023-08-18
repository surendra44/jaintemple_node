import express from "express";
import * as donationController from "../controllers/donation.controller";
const verifyToken = require('../middleware/commonAuth');
const validate = require('../middleware/validate');
const donationValidation = require('../validators/donation.validation');

const router = express.Router({ mergeParams: true });

router.post('/addDonation/:id',verifyToken.checkSuperAdmin,validate(donationValidation.createDonation),donationController.addDonation);
router.put('/updateDonation/:id',validate(donationValidation.updateDonation),donationController.updateDonation);
router.delete('/deleteDonation/:id',validate(donationValidation.delteDonationById),donationController.deleteDonation);
router.get('/getDonation/:id',validate(donationValidation.getDonationById),donationController.getDoationById);
router.get('/getallDonation',donationController.getallDonation);





export default router;

