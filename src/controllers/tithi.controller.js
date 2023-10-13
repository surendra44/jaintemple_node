import httpStatus from "http-status";
import { successResponse, errorResponse } from "../helpers";
const { tithiService } = require('../services');


export const createTithi = async (req, res) => {
    try {
        const { date, tithi } = req.body;
        const tithiData = { date, tithi };
        console.log('tithiData')
        const result = await tithiService.createTithi(tithiData);
        if(result)
        return successResponse(req, res, result);
      } catch (error) {
        return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
      }
}

export const getTithiByDate = async (req, res) => {
    try {
      const { date } = req.params;
      const result = await tithiService.getTithiByDate(date);
      if (result) {
        return successResponse(req, res, result);
      } else {
        return errorResponse(req, res, httpStatus.NOT_FOUND, 'Tithi not found for the given date.');
      }
    } catch (error) {
      return errorResponse(req, res, httpStatus.INTERNAL_SERVER_ERROR, error.message);
    }
  };