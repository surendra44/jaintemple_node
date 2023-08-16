import httpStatus from "http-status";
import { successResponse, errorResponse } from "../helpers";
const { roleService } = require('../services');

export const createRole = async (req, res) => {
  try {
    const { name, permission } = req.body;
    const roleData = { name, permission };
    const result = await roleService.createRole(roleData);
    if(result)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await roleService.getRoleById(id);
    if(result)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export const getAllRoles = async (req, res) => {
  try {
    const result = await roleService.getAllRoles();
    if(result)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};



export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await roleService.deleteRole(id);
    if(result)
    return successResponse(req, res, result);
  } catch (error) {
    return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};
