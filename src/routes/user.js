import express from "express";
const validate = require('../middleware/validate');
const userValidation = require('../validators/user.validator');
import * as userController from "../controllers/user.controller";
import * as templeController from "../controllers/temple.controller";
const verifyToken = require('../middleware/commonAuth');



const router = express.Router({ mergeParams: true });


router.get("/getTempleById/:id",validate(userValidation.getTempleById),verifyToken.checkSuperAdmin, templeController.getTempleById);    
router.get("/getTempleall",verifyToken.checkSuperAdmin, templeController.getAllTemples);    

router.post("/addUser",validate(userValidation.createUser), userController.registerUser);
router.post('/login', validate(userValidation.login),userController.login);
router.post('/templeRegister',validate(userValidation.registerTemple),verifyToken.checkSuperAdmin,templeController.registerTemple);

router.put('/updateUser/:userId',validate(userValidation.updateUser),verifyToken.checkSuperAdmin,userController.updateUser);
router.put('/updateTemple/:id',validate(userValidation.updateTemple),verifyToken.checkSuperAdmin,templeController.updateTemple);


router.delete('/deleteTemple/:id',validate(userValidation.deleteTemple),verifyToken.checkSuperAdmin,templeController.deleteTemple);

// validate(userValidation.createUser)verifyToken.checkSuperAdmin,






export default router;
