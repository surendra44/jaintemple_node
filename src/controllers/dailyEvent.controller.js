import httpStatus from "http-status";
const mongoose = require('mongoose')
import { successResponse, errorResponse } from "../helpers";
const { dailyEventService } = require('../services');




  export const addDailyEventCategory = async(req, res)=>  {
    try {
      const dailyCategory = req.body; 
      const result = await dailyEventService.addDailyCategory(dailyCategory);
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  }

  export const updateEventCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;
      const updatedData = req.body;
      const result = await dailyEventService.updateEventCategory(categoryId,updatedData,{ new: true });
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  }


  export const  deleteCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;
      const result = await dailyEventService.deleteCategory(categoryId);
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  }


  export const getCategoryByID = async(req, res)=> {
    try {
      const categoryId = req.params.id;
      const result = await dailyEventService.getCategoryByID(categoryId);
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  
  export const getAllCategory = async(req, res)=>  {
    try {
      const result = await dailyEventService.getAllCategory();
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }


