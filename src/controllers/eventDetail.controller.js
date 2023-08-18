import httpStatus from "http-status";
const mongoose = require('mongoose')
import { successResponse, errorResponse } from "../helpers";
const { eventDetailService } = require('../services');



  export const addEventDetail= async (req, res) =>{
    try {
      const eventData = req.body; 
      eventData.templeID = req.templeId;
      console.log(eventData);
      const result = await eventDetailService.addEventDetail(eventData);
      if (!result) {
        return errorResponse(req, res, httpStatus.NOT_FOUND, error.message);
      }
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  }


  export const  updateEventDetail= async (req, res) => {
    try {
      const eventcategoryId = req.params.id;
      const updatedData = req.body;
      updatedData.eventCategory = updatedData.eventCategory.map(categoryId => mongoose.Types.ObjectId(categoryId))
      const result = await eventDetailService.updateEventDetail(
        eventcategoryId,
        updatedData,
        { new: true }
      );
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  }


  export const  deleteEventDetail= async (req, res) => {
    try {
      const eventId = req.params.id;
      const result = await eventDetailService.deleteEventDetail(eventId);
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  }

  export const getEventById = async(req, res)=> {
    try {
      const eventId = req.params.id;
      const result = await eventDetailService.getEventDetailById(eventId);
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }


  export const getAllEvent = async(req, res)=>  {
    try {
      const { page, size, search,sort } = req.query;
    
      const paginationOptions = {
        page: parseInt(page) || 1,
        size: parseInt(size) || 10,
      };
    
      const filter = {
        $or: [
          { eventName: { $regex: search || "", $options: "i" } },
          { eventDetail: { $regex: search || "", $options: "i" } },
        ],
      };
    
      const sortingOptions = sort ? sort.split(",") : ["_id", "asc"];
      const sortBy = { [sortingOptions[0]]: sortingOptions[1] };
      const result = await eventDetailService.getAllEvent(paginationOptions,filter,sortBy);
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }


  export const addEventCategory = async(req, res)=>  {
    try {
      const eventCategory = req.body; // Event data sent in the request body
      const result = await eventDetailService.addEventCategory(eventCategory);
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  }

  export const updateEventCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;
      const updatedData = req.body;
      const result = await eventDetailService.updateEventCategory(categoryId,updatedData,{ new: true });
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  }


  export const  deleteCategory = async (req, res) => {
    try {
      const categoryId = req.params.id;
      const result = await eventDetailService.deleteCategory(categoryId);
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  }


  export const getCategoryByID = async(req, res)=> {
    try {
      const categoryId = req.params.id;
      const result = await eventDetailService.getCategoryByID(categoryId);
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  
  export const getAllCategory = async(req, res)=>  {
    try {
      const result = await eventDetailService.getAllCategory();
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }


  export const changeEventStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.body.status;
    try {
      const result = await eventDetailService.changeEventStatus(id,status);
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };