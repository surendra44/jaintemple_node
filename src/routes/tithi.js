import * as tithiController from "../controllers/tithi.controller";
const validate = require('../middleware/validate');
const roleValidation = require('../validators/role.validation');
const verifyToken = require('../middleware/commonAuth');
import express from "express";

const router = express.Router({ mergeParams: true });


router.post('/createtithi',tithiController.createTithi);


export default router;
