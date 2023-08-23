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
      const { page, size, search,sort } = req.query;
    
      const paginationOptions = {
        page: parseInt(page) || 1,
        size: parseInt(size) || 10,
      };
    
      const filter = {
        $or: [
          { expensesName: { $regex: search || "", $options: "i" } },
          { expensesStatus: { $regex: search || "", $options: "i" } },
          { expensesPayemntType: { $regex: search || "", $options: "i" } },
        ],
      };
    
      const sortingOptions = sort ? sort.split(",") : ["_id", "asc"];
      const sortBy = { [sortingOptions[0]]: sortingOptions[1] };
      const result = await expenseService.getallExpense(paginationOptions,filter,sortBy);
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
}



export const getDayExpense = async (req, res) => {
  try {
    const result = await expenseService.getDayExpense();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


export const getTotalExpense = async (req, res) => {
  try {
    const result = await expenseService.getTotalExpense();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};



