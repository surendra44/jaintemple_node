import express from "express";
const validate = require('../middleware/validate');
const userValidation = require('../validators/user.validator');
import * as userController from "../controllers/user.controller";
const verifyToken = require('../middleware/commonAuth');



const router = express.Router({ mergeParams: true });



router.post("/addUser",validate(userValidation.createUser),verifyToken.checkSuperAdmin, userController.registerUser);
router.post('/login', validate(userValidation.login),userController.login);
router.put('/updateUser/:userId',validate(userValidation.updateUser),verifyToken.checkSuperAdmin,userController.updateUser);





export default router;
