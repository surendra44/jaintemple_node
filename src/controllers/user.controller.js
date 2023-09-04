import httpStatus from "http-status";
import { successResponse, errorResponse } from "../helpers";
const { userService } = require('../services');

export const registerUser = async (req, res) => {
    try {
    const result = await userService.addUser(req.body);
    if(result)
        return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
};


export const login = async (req, res) => {
    try {
      const { loginId, password } = req.body;
      const result = await userService.loginUser(loginId, password);
      return successResponse(req, res, result);
    } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
  };

  export const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    try {
      const result = await userService.updateUser(userId, updatedUserData);
      return successResponse(req, res, result);
    } 
    catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };

  export const allUser = async (req, res) => {
    try {
      const { page, size, search,sort } = req.query;
    
      const paginationOptions = {
        page: parseInt(page) || 1,
        size: parseInt(size) || 10,
      };
    
      const filter = {
        $and: [
          { name: { $regex: search || "", $options: "i" } },
          { isDeleted: false },
        ],
      };
    
      const sortingOptions = sort ? sort.split(",") : ["donationDate", "asc"];
      const sortBy = { [sortingOptions[0]]: sortingOptions[1] };
      const result = await userService.allUser(paginationOptions,filter,sortBy);
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };
  
  export const changeUserStatus = async (req, res) => {
    const id = req.params.id;
    const status = req.params.status;
    try {
      const result = await userService.changeUserStatus(id,status);
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };


  export const getUserById = async (req, res) => {
    const userId = req.params.id;
    try {
      const result = await userService.UserById(userId);
      return successResponse(req, res, result);
    }catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };