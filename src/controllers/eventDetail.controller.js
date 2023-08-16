import httpStatus from "http-status";
import { successResponse, errorResponse } from "../helpers";
const { eventDetailService } = require('../services');



  export const addEventDetail= async (req, res) =>{
    try {
      const eventData = req.body; // Event data sent in the request body
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
      const eventId = req.params.id;
      const updatedData = req.body;
  
      const result = await eventDetailService.updateEventDetail(
        eventId,
        updatedData,
        { new: true }
      );
      if (!result) {
        return errorResponse(req, res, httpStatus.NOT_FOUND, error.message);
      }
  
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  }


  export const  deleteEventDetail= async (req, res) => {
    try {
      const eventId = req.params.id;
      const result = await eventDetailService.deleteEventDetail(eventId);
      if (!result) {
        return errorResponse(req, res, httpStatus.NOT_FOUND, error.message);
      }
  
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  }

  export const getEventById = async(req, res)=> {
    try {
      const eventId = req.params.id;
      const result = await eventDetailService.getEventDetailById(eventId);
      if (!result) {
        return errorResponse(req, res, httpStatus.NOT_FOUND, error.message);
      }
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }


  export const getAllEvent = async(req, res)=>  {
    try {
      const result = await eventDetailService.getAllEvent();
      if (!result) {
        return errorResponse(req, res, httpStatus.NOT_FOUND, error.message);
      }
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }