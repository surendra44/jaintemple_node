import express from "express";
import * as donationController from "../controllers/donation.controller";
const verifyToken = require('../middleware/commonAuth');
const validate = require('../middleware/validate');
const donationValidation = require('../validators/donation.validation');

const router = express.Router({ mergeParams: true });

router.post('/addDonation/:id',verifyToken.checkSuperAdmin,validate(donationValidation.createDonation),donationController.addDonation);
router.put('/updateDonation/:id',verifyToken.checkSuperAdmin,validate(donationValidation.updateDonation),donationController.updateDonation);
router.delete('/deleteDonation/:id',verifyToken.checkSuperAdmin,validate(donationValidation.delteDonationById),donationController.deleteDonation);
router.get('/getDonation/:id',verifyToken.checkSuperAdmin,validate(donationValidation.getDonationById),donationController.getDoationById);
router.get('/getallDonation',verifyToken.checkSuperAdmin,donationController.getallDonation);
router.get('/getbyDayDonation',verifyToken.checkSuperAdmin,donationController.getDayDonation);
router.get('/totaldayBalance',verifyToken.checkSuperAdmin,donationController.totaldayBalance);
router.get('/totalDonation',verifyToken.checkSuperAdmin,donationController.getTotalDonation);
router.get('/totalBalance',verifyToken.checkSuperAdmin,donationController.totalBalance);
router.get('/totalCashBalance',verifyToken.checkSuperAdmin,donationController.totalCashBalance);
router.get('/expense-and-donaion',verifyToken.checkSuperAdmin,donationController.totalMothBalance);





export default router;

