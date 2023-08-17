const mongoose = require('mongoose');
import httpStatus from "http-status";
import { successResponse, errorResponse } from "../helpers";
const { donationService } = require('../services');


export const addDonation = async (req, res) => {
  const donationDetail = req.body;
  donationDetail.templeId = req.templeId;
  donationDetail.eventId = mongoose.Types.ObjectId(donationDetail.eventId);
  donationDetail.eventCategoryId = mongoose.Types.ObjectId(donationDetail.eventCategoryId);
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
        const result = await donationService.getallDonation();
        return successResponse(req, res, result);
      } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
}


// sdfa





