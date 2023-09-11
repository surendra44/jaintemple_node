import express from "express";
const validate = require('../middleware/validate');
const {upload }= require('../middleware/uploadFile')
const templeValidate = require('../validators/temple.validation');
import * as templeController from "../controllers/temple.controller";
const verifyToken = require('../middleware/commonAuth');



const router = express.Router({ mergeParams: true });



router.post('/templeRegister',upload.any(),verifyToken.checkSuperAdmin,validate(templeValidate.templeRegister),templeController.registerTemple);
router.get("/getTempleById/:id",verifyToken.checkSuperAdmin,validate(templeValidate.getTempleById),templeController.getTempleById);    
router.get("/getTempleall",verifyToken.checkSuperAdmin, templeController.getAllTemples);    
router.put('/updateTemple/:id',upload.any(),templeController.updateTemple);
router.delete('/deleteTemple/:id',verifyToken.checkSuperAdmin,validate(templeValidate.deleteTemple),templeController.deleteTemple);



export default router;
