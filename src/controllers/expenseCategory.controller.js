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



export const  deleteDonation= async (req, res) => {
    try {
      const donationId = req.params.id;
      const result = await donationService.deleteDonation(donationId);
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  }

  export const getDoationById = async(req, res)=> {
    try {
      const donationId = req.params.id;
      const result = await donationService.getDoationById(donationId);
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }


  export const getallDonation = async(req, res)=> {
    try {
        const result = await donationService.getallDonation();
        return successResponse(req, res, result);
      } catch (error) {
        return e
  }
}






