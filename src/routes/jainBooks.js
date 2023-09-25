import * as jainBookController from "../controllers/jainBooks.controller";
const validate = require('../middleware/validate');
const verifyToken = require('../middleware/commonAuth');
const {upload }= require('../middleware/uploadFile')


import express from "express";



const router = express.Router({ mergeParams: true });



router.post('/saveJainBook',upload.single("books"),jainBookController.saveJainBook);



export default router;
