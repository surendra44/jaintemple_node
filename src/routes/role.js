import * as roleController from "../controllers/role.controller";
const validate = require('../middleware/validate');
const roleValidation = require('../validators/role.validation');
const verifyToken = require('../middleware/commonAuth');


import express from "express";



const router = express.Router({ mergeParams: true });


router.post('/createrole',validate(roleValidation.createRole),roleController.createRole);
router.get('/roleById/:id',verifyToken.checkSuperAdmin, validate(roleValidation.getRoleById),roleController.getRoleById);
router.get('/allrole', verifyToken.checkSuperAdmin,roleController.getAllRoles);
router.delete('/delterole/:id',verifyToken.checkSuperAdmin,validate(roleValidation.getRoleById),roleController.deleteRole);



export default router;
