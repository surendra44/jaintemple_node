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
router.post('/sendRecipt/:id',donationController.sendRecipt);
router.get('/getallPendingDonation',verifyToken.checkSuperAdmin,donationController.getallPendingDonation);
router.get('/todayDayDonation',verifyToken.checkSuperAdmin,donationController.getDayDonation);
router.get('/todayCashDonation',verifyToken.checkSuperAdmin,donationController.getDayCashDonation);
router.get('/todayOnlineDonation',verifyToken.checkSuperAdmin,donationController.getbyDayOnlineDonation);
router.get('/todaychequeDonation',verifyToken.checkSuperAdmin,donationController.getbyDaychequeDonation);
router.get('/todayPendingDonation',verifyToken.checkSuperAdmin,donationController.getbyDayPendingDonation);
router.get('/totaldayBalance',verifyToken.checkSuperAdmin,donationController.totaldayBalance);
router.get('/todayCashBalance',verifyToken.checkSuperAdmin,donationController.todayCashBalance);
router.get('/todayOnlineBalance',verifyToken.checkSuperAdmin,donationController.todayOnlineBalance);
router.get('/totalDonation',verifyToken.checkSuperAdmin,donationController.getTotalDonation);
router.get('/totalOnlineDonation',verifyToken.checkSuperAdmin,donationController.totalOnlineDonation);
router.get('/totalCashDonation',verifyToken.checkSuperAdmin,donationController.totalCashDonation);
router.get('/totalbyEventDonation/:id',verifyToken.checkSuperAdmin,donationController.totalbyEventDonation);
router.get('/totalbyDailyEventCategory/:id',verifyToken.checkSuperAdmin,donationController.totalbyDailyEventCategory);
router.get('/totalbyEventCategory/:id',verifyToken.checkSuperAdmin,donationController.totalbyEventCategory);
router.get('/totalByAllDailyEventCategories',verifyToken.checkSuperAdmin,donationController.totalByAllDailyEventCategories);
router.get('/totalEventCategories',verifyToken.checkSuperAdmin,donationController.totalByEventCategories);
router.get('/totalPendingDonation',verifyToken.checkSuperAdmin,donationController.totalPendingBalance);
router.get('/totalBalance',verifyToken.checkSuperAdmin,donationController.totalBalance);
router.get('/totalCashBalance',verifyToken.checkSuperAdmin,donationController.totalCashBalance);
router.get('/totalOnlineBalance',verifyToken.checkSuperAdmin,donationController.totalOnlineBalance);
router.post('/expense-and-donaion',verifyToken.checkSuperAdmin,donationController.totalMothBalance);
router.get('/top15MaxDonar',verifyToken.checkSuperAdmin,donationController.top15MaxDonar);
router.get('/secondhigestDonation',verifyToken.checkSuperAdmin,donationController.secondhighestDonation);
router.get('/downloadPdf',donationController.downloadPdf);





export default router;

