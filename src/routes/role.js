import * as roleController from "../controllers/role.controller";

import express from "express";



const router = express.Router({ mergeParams: true });


router.post('/createrole', roleController.createRole);
router.get('/roleById/:id', roleController.getRoleById);
router.get('/allrole', roleController.getAllRoles);



export default router;
