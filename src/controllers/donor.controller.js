const mongoose = require('mongoose');
import httpStatus from "http-status";
const Donar = require('../models/donar');
const Family = require('../models/family');
import { successResponse, errorResponse } from "../helpers";
const { donorService } = require('../services');


export const registerDonor = async (req, res) => {
  const userCreateadBy = req.userId;
  const{ members,...rest } = req.body;
  try {
    const mainDonarInfo = { ...rest, createdBy: new mongoose.Types.ObjectId(userCreateadBy), updatedBy: new mongoose.Types.ObjectId(userCreateadBy) };
    const result = await donorService.registerDonor(userCreateadBy,members,mainDonarInfo);
    return successResponse(req, res, result);
  } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};

export const registerGuest = async (req, res) => {
  const userCreateadBy = req.userId;
  const templeId = req.templeId;
  const{ donation,...rest } = req.body;
  try {
    const mainDonarInfo = { ...rest, createdBy: new mongoose.Types.ObjectId(userCreateadBy), updatedBy: new mongoose.Types.ObjectId(userCreateadBy) };
    const result = await donorService.registerGuest({...donation,templeId},mainDonarInfo);
    return successResponse(req, res, result);
  } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
};



export const updateDonarInfo = async (req, res) => {
  const userCreateadBy = req.userId;
  const id = req.params.id
  const { members, ...rest } = req.body;
  const donorInfo = rest;
  const membersInfo = members;
  try {
      const result = await donorService.updateDonor(id,userCreateadBy,donorInfo, membersInfo);
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  };


export const getAllDonors = async (req, res) => { 
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
  const result = await donorService.getAllDonorsWithMembers(paginationOptions,filter,sortBy);
  return successResponse(req, res, result);
} catch (error) {
  return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
}
};

export const getDonorById = async (req, res) => {
  const donorId = req.params.id;
  try {
    const donor = await donorService.getDonorByIdWithMembers(donorId);
    return successResponse(req, res, donor);
  }catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


export const changeUserStatus = async (req, res) => {
  const id = req.params.id;
  const status = req.params.status;
  const parentornot = req.body.isParent;
  try {
    const result = await donorService.changeUserStatus(id,status,parentornot);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};






export const getDayDonor = async (req, res) => {
  try {
    const result = await donorService.getDayDonor();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


export const getTotalDonarCount = async (req, res) => {
  try {
    const result = await donorService.getTotalDonarCount();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
