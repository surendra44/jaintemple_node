import * as roleController from "../controllers/role.controller";
const validate = require('../middleware/validate');
const roleValidation = require('../validators/role.validation');
const verifyToken = require('../middleware/commonAuth');


import express from "express";



const router = express.Router({ mergeParams: true });


router.post('/createrole', validate(roleValidation.createRole),verifyToken.checkSuperAdmin,roleController.createRole);
router.get('/roleById/:id', validate(roleValidation.getRoleById),verifyToken.checkSuperAdmin,roleController.getRoleById);
router.get('/allrole', roleController.getAllRoles);
router.delete('/delterole/:id',validate(roleValidation.getRoleById),verifyToken.checkSuperAdmin, roleController.deleteRole);



export default router;
