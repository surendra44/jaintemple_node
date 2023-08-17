const mongoose = require('mongoose');
import httpStatus from "http-status";
import { successResponse, errorResponse } from "../helpers";
const { expenseService } = require('../services');


export const addexpenses = async (req, res) => {
  const expenseDetail = req.body;
   expenseDetail.templeId = req.templeId;
  try {
    const result = await expenseService.addexpenses(expenseDetail);
    return successResponse(req, res, result);
  } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};


export const updateExpenses = async (req, res) => {
    try{
    const expenseId = req.params.id;
    const updatedData = req.body;
    const result = await expenseService.updateExpense(
        expenseId,
      updatedData,
      { new: true });
    return successResponse(req, res, result);
  } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
}



export const deleteExpense= async (req, res) => {
    try {
      const expenseId = req.params.id;
      const result = await expenseService.deleteExpense(expenseId);
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  }

  export const getExpenseById = async(req, res)=> {
    try {
      const expenseId = req.params.id;
      const result = await expenseService.getExpenseById(expenseId);
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }


  export const getallExpense = async(req, res)=> {
    try {
        const result = await expenseService.getallExpense();
        return successResponse(req, res, result);
      } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
}






