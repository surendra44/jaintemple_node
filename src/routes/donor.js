import express from "express";
import * as donorController from "../controllers/donor.controller";
const verifyToken = require('../middleware/commonAuth');
const validate = require('../middleware/validate');
const donorValidation = require('../validators/donor.validator');

const router = express.Router({ mergeParams: true });

router.post('/donarRegister',verifyToken.checkSuperAdmin,validate(donorValidation.createDonor),donorController.registerDonor);
router.get('/getdonor/:id',verifyToken.checkSuperAdmin,validate(donorValidation.getDonorById),donorController.getDonorById);


router.put('/donarupdate/:id',verifyToken.checkSuperAdmin,validate(donorValidation.updateDonor),donorController.updateDonarInfo);
router.patch('/manage-status/:status/:id',verifyToken.checkSuperAdmin,validate(donorValidation.softdelteDonorById),donorController.changeUserStatus);
router.get('/getalldonor',verifyToken.checkSuperAdmin,donorController.getAllDonors);
router.get('/getDayDonor',verifyToken.checkSuperAdmin,donorController.getDayDonor);
router.get('/getDonorCount',verifyToken.checkSuperAdmin,donorController.getTotalDonarCount);
// 
// validate(donorValidation.createDonor)
export default router;

