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

// updateTemple

// export const updateDonarInfo = async (req, res) => {
//   const userCreateadBy = req.userId;
//   console.log(userCreateadBy)
//   const id = req.params.userId
//   const { members, ...rest } = req.body;
//   const donorInfo = rest;
//   const membersInfo = members;
  
//   try {
//       const result = await donorService.updateDonor(id,userCreateadBy,donorInfo, membersInfo);
//       return successResponse(req, res, result);
//     } catch (error) {
//         return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
//       }
//   };




