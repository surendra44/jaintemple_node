const mongoose = require('mongoose');
import httpStatus from "http-status";
import { successResponse, errorResponse } from "../helpers";
const { donationService } = require('../services');


export const addDonation = async (req, res) => {
  const donationDetail = req.body;
  donationDetail.templeId = req.templeId;
  donationDetail.donarId = req.params.id;
  try {
    const result = await donationService.addDonation(donationDetail);
    return successResponse(req, res, result);
  } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};


export const updateDonation = async (req, res) => {
    try{
    const donationId = req.params.id;
    const updatedData = req.body;
    updatedData.eventId = mongoose.Types.ObjectId(updatedData.eventId);
    updatedData.eventCategoryId = mongoose.Types.ObjectId(updatedData.eventCategoryId);
    const result = await donationService.updateDonation(
        donationId,
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
      const { page, size, search,sort } = req.query;
    
      const paginationOptions = {
        page: parseInt(page) || 1,
        size: parseInt(size) || 10,
      };
    
      const filter = {
        $or: [
          { firstName: { $regex: search || "", $options: "i" } },
          { "phoneNumbers.Phonenumber1": { $regex: search || "", $options: "i" } },
          { "phoneNumbers.Phonenumber2": { $regex: search || "", $options: "i" } },
        ],
      };
    
      const sortingOptions = sort ? sort.split(",") : ["_id", "asc"];
      const sortBy = { [sortingOptions[0]]: sortingOptions[1] };
      const result = await donationService.getallDonation(paginationOptions,filter,sortBy);
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
}


// sdfa





