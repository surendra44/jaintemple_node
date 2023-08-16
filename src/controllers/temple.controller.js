import httpStatus from "http-status";
import { successResponse, errorResponse } from "../helpers";
const { templeService } = require('../services');

// Controller to handle temple registration
export const registerTemple = async (req, res) => {
  try {
    const templeData = req.body; // Temple data sent in the request body
    const result = await templeService.addtemple(templeData);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
}



export const updateTemple = async (req, res) => {
  const templeId = req.params.id;
  const updatedData = req.body;
  try {
      const result = await templeService.updateTemple(templeId, updatedData);
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }

  };


  export const deleteTemple = async (req, res) => {
    try {
      const templeId = req.params.id;
      const result = await templeService.deleteTemple(templeId);
      if (!result) {
        return errorResponse(req, res, httpStatus.NOT_FOUND, error.message);
      }
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }

  export const getTempleById = async(req, res)=> {
    try {
      const templeId = req.params.id;
      const result = await templeService.getTempleById(templeId);
      if (!result) {
        return errorResponse(req, res, httpStatus.NOT_FOUND, error.message);
      }
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }


  export const getAllTemples = async(req, res)=>  {
    try {
      const result = await templeService.getAllTemples();
      if (!result) {
        return errorResponse(req, res, httpStatus.NOT_FOUND, error.message);
      }
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  }
  

  

