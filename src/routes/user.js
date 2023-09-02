import express from "express";
const validate = require('../middleware/validate');
const userValidation = require('../validators/user.validator');
import * as userController from "../controllers/user.controller";
import * as templeController from "../controllers/temple.controller";
const verifyToken = require('../middleware/commonAuth');



const router = express.Router({ mergeParams: true });



router.post("/addUser",verifyToken.checkSuperAdmin,validate(userValidation.createUser), userController.registerUser);
router.post('/login', validate(userValidation.login),userController.login);
router.put('/updateUser/:userId',verifyToken.checkSuperAdmin,validate(userValidation.updateUser),userController.updateUser);
router.get('/allUser',verifyToken.checkSuperAdmin,userController.allUser);
router.patch('/manage-status/:status/:id',verifyToken.checkSuperAdmin,validate(userValidation.softdelteUserById),userController.changeUserStatus);
router.get('/getUser/:id',verifyToken.checkSuperAdmin,validate(userValidation.getUserById),userController.getUserById);



router.post('/templeRegister',verifyToken.checkSuperAdmin,validate(userValidation.registerTemple),templeController.registerTemple);
router.get("/getTempleById/:id",verifyToken.checkSuperAdmin,validate(userValidation.getTempleById),templeController.getTempleById);    
router.get("/getTempleall",verifyToken.checkSuperAdmin, templeController.getAllTemples);    
router.put('/updateTemple/:id',verifyToken.checkSuperAdmin,validate(userValidation.updateTemple),templeController.updateTemple);
router.delete('/deleteTemple/:id',verifyToken.checkSuperAdmin,validate(userValidation.deleteTemple),templeController.deleteTemple);






export default router;
