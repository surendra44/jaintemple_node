import express from "express";
import * as donorController from "../controllers/donor.Controller";
const verifyToken = require('../middleware/commonAuth');
const validate = require('../middleware/validate');
const donorValidation = require('../validators/donor.validator');

const router = express.Router({ mergeParams: true });

router.post('/donarRegister',verifyToken.checkSuperAdmin,donorController.registerDonor);
router.get('/getdonor/:id',verifyToken.checkSuperAdmin,validate(donorValidation.getDonorById),donorController.getDonorById);
router.get('/getalldonor',verifyToken.checkSuperAdmin,donorController.getAllDonors);
router.put('/donarupdate/:id',verifyToken.checkSuperAdmin ,donorController.updateDonarInfo);
router.patch('/manage-status/:status/:id',donorController.changeUserStatus);

// 
// validate(donorValidation.createDonor)
export default router;

