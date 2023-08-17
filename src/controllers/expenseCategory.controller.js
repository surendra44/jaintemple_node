const mongoose = require('mongoose');
import httpStatus from "http-status";
import { successResponse, errorResponse } from "../helpers";
const { expenseCategoryService } = require('../services');


export const addExpenseCategory = async (req, res) => {
  const expenseCategoryDetail = req.body;
   expenseCategoryDetail.templeId = req.templeId;
  try {
    const result = await expenseCategoryService.addExpenseCategory(expenseCategoryDetail);
    return successResponse(req, res, result);
  } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};


export const updateExpCategory = async (req, res) => {
    try{
    const expCategoryId = req.params.id;
    const updatedData = req.body;
    const result = await expenseCategoryService.updateExpCategory(
        expCategoryId,
      updatedData,
      { new: true });
    return successResponse(req, res, result);
  } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
}



export const  deleteexpCategory= async (req, res) => {
    try {
      const expCategoryId = req.params.id;
      const result = await expenseCategoryService.deleteexpCategory(expCategoryId);
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  }

  export const getExpCategoryById = async(req, res)=> {
    try {
      const expCategoryId = req.params.id;
      const result = await expenseCategoryService.getExpCategoryById(expCategoryId);
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }


  export const getallexpCategory = async(req, res)=> {
    try {
        const result = await expenseCategoryService.getallexpCategory();
        return successResponse(req, res, result);
      } catch (error) {
        return e
  }
}






