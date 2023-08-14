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
  

