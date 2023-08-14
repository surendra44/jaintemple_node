import logger from "../config/logger";

export const successResponse = (req, res, data, code = 200) =>
  res.status(code).send({
    code,
    data,
    success: true,
  });

export const errorResponse = (req, res, code = 500, errorMessage = "Something went wrong", error = {},errorfields = {}) => {
  logger.error(errorMessage);
  logger.error(JSON.stringify(error));

  res.status(code).json({
    code,
    errorMessage,
    error,
    errorfields,
    success: false,
  });
};