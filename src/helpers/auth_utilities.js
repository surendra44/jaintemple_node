import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import _ from "lodash";
import * as config from "../config/config";
import ApiError from "./error/ApiError";
import { userService  } from "../services";
import { ERROR_MESSAGE } from "./errorMessage";

export const decodeBearerToken = (req) => {
  if (!(req.headers && req.headers.authorization)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, ERROR_MESSAGE.AUTH.TOKEN_NOT_FOUND);
  }
  try {
    const bearerHeader = req.headers.authorization;
    const parts = bearerHeader.split(" ");
    const token = parts[1];
    const decodedToken = jwt.verify(token, config.jwt.secret);
    req.locals.decodedToken = decodedToken;
    return decodedToken;
  } catch (err) {
    
    throw new ApiError(httpStatus.UNAUTHORIZED, ERROR_MESSAGE.AUTH.INVALID_TOKEN);
  }
};

// export const createUserToken = (user) => {
//   return jwt.sign(
//     {
//       user: {
//         user_id: user.id,
//         createdAt: new Date(),
//       },
//     },
//     config.jwt.secret
//   );
// };

export const createUserToken = (user) => {
  console.log("inside genrate token")
  const payload = { userId: user._id, templeId: user.temple };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d' });
  console.log("inside genrate token" +accessToken)
  return accessToken;
};


export const getLoggedInUser = async (req) => {
  if (!req.locals.decodedToken) decodeBearerToken(req);
  const { decodedToken } = req.locals;
  if (!decodedToken.user || !decodedToken.user.user_id) {
    return;
  }
  try {
    return await userService.getUserById(decodedToken.user.user_id);
  } catch (err) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, ERROR_MESSAGE.AUTH.INVALID_TOKEN);
  }
};
