import httpStatus from "http-status";
import logger from "../config/logger";
import { getLoggedInUser, getLoggedInAdminUser } from "../helpers/auth_utilities";
import { USER_TYPE, ADMIN_ROLE } from "../helpers/constants";
import { errorResponse } from "../helpers";
const jwt = require('jsonwebtoken');
const User = require('../models/user');

export const isUserAuth = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      logger.info(`Authorizing via auth token`);
      const user = await getLoggedInUser(req);
      if (!user) {
          return errorResponse(req, res, httpStatus.UNAUTHORIZED, "User is not found in system" );
      }
      req.user = user;
      return next();
    }
     return errorResponse(req, res, httpStatus.UNAUTHORIZED, "Incorrect token is provided, try re-login" );

  } catch (error) {
    return next(error);
  }
};

export const isAdminAuth = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      logger.info(`Authorizing via auth token`);
      const user = await getLoggedInUser(req);
      if (!user) {
           return errorResponse(req, res, httpStatus.UNAUTHORIZED, "User is not found in system" );
      }
      if (user.user_type != USER_TYPE.Admin) {
          return errorResponse(req, res, httpStatus.NOT_FOUND, "No admin permission" );
      }
      req.user = user;
      return next();
    }
    return errorResponse(req, res, httpStatus.UNAUTHORIZED, "Incorrect token is provided, try re-login" );
  } catch (error) {
     console.log("error in middleware", error)
    return next(error);
  }
};



export const checkSuperAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', ''); // Assuming the token is in the Authorization header
    if (!token) {
      return res.status(401).json({ error: 'Access denied' });
    }

const decoded = jwt.verify(token, process.env.JWT_SECRET);
const user = await User.findById(decoded.userId).populate('role');

if (!user || user.role.name !== 'superadmin') {
  return res.status(403).json({ error: 'Permission denied' });
}
req.userId = decoded.userId;
req.templeId = decoded.templeId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred due To token Expired' });
  }
};



/*
export const isSuperAdminAuth = async (req, res, next) => {
  try {
    if (req.headers && req.headers.authorization) {
      const user = await getLoggedInAdminUser(req);
      if (!user) return errorResponse(req, res, httpStatus.UNAUTHORIZED, "Admin is not found in system" );
      if (user.role != ADMIN_ROLE.SUPER_ADMIN) return errorResponse(req, res, httpStatus.NOT_FOUND, "No admin permission" );
      req.user = user;
      return next();
    }
    return errorResponse(req, res, httpStatus.UNAUTHORIZED, "Incorrect token is provided, try re-login" );
  } catch (error) {
     console.log("error in middleware", error)
    return next(error);
  }
};*/
