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
        $and: [
          { donationMode: { $regex: search || "", $options: "i" } },
          { donationStatus: "Complete" },
        ],
      };
    
      const sortingOptions = sort ? sort.split(",") : ["donationDate", "asc"];
      const sortBy = { [sortingOptions[0]]: sortingOptions[1] };
      const result = await donationService.getallDonation(paginationOptions,filter,sortBy);
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
}

export const getallPendingDonation = async(req, res)=> {
  try {
    const { page, size, search,sort } = req.query;
    const paginationOptions = {
      page: parseInt(page) || 1,
      size: parseInt(size) || 10,
    };
  
    const filter = {
      $and: [
        { donationMode: { $regex: search || "", $options: "i" } },
        { donationStatus: "Pending" },
      ],
    };
  
    const sortingOptions = sort ? sort.split(",") : ["donationDate", "asc"];
    const sortBy = { [sortingOptions[0]]: sortingOptions[1] };
    const result = await donationService.getallPendingDonation(paginationOptions,filter,sortBy);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
}

export const getDayDonation = async (req, res) => {
  try {
    const result = await donationService.getDayDonation();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const getDayCashDonation = async (req, res) => {
  try {
    const result = await donationService.getDayCashDonation();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const getbyDayOnlineDonation = async (req, res) => {
  try {
    const result = await donationService.getbyDayOnlineDonation();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const getbyDaychequeDonation = async (req, res) => {
  try {
    const result = await donationService.getbyDaychequeDonation();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


export const  getbyDayPendingDonation = async (req, res) => {
  try {
    const result = await donationService.getbyDayPendingDonation();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


export const totaldayBalance = async (req, res) => {
  try {
    const result = await donationService.totaldayBalance();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const todayCashBalance = async (req, res) => {
  try {
    const result = await donationService.todayCashBalance();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const todayOnlineBalance = async (req, res) => {
  try {
    const result = await donationService.todayOnlineBalance();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const getTotalDonation = async (req, res) => {
  try {
    const result = await donationService.getTotalDonation();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


export const totalBalance = async (req, res) => {
  try {
    const result = await donationService.totalBalance();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


export const totalCashBalance = async (req, res) => {
  try {
    const result = await donationService.totalCashBalance();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const totalPendingBalance = async (req, res) => {
  try {
    const result = await donationService.totalPendingBalance();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const totalMothBalance = async (req, res) => {
  try {
    const year = req.body.year
    const result = await donationService.totalMothBalance(year);
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};





export const top15MaxDonar = async (req, res) => {
  try {
    const result = await donationService.top15MaxDonar();
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};


