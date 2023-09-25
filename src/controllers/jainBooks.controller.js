import httpStatus from "http-status";
const upload = require('../middleware/uploadFile')
import { successResponse, errorResponse } from "../helpers";
const { jainBooksService } = require('../services');
const fs = require('fs');
const path = require('path');


export const saveJainBook = async (req, res) => {
    try {
      const jaiBookData = req.body;
      console.log(jaiBookData);
      const file = req.file
      console.log(file)
      jaiBookData.books = file.filename
      const result = await jainBooksService.saveBooks(jaiBookData);
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  





