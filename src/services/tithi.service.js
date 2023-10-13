import { User } from "../models/index";
import { ERROR_MESSAGE } from "../helpers/errorMessage";
const Tithi = require('../models/tithi');

export const createTithi = async (tithiData) => {
    try {
      // Check if a tithi with the same date already exists
      const existingTithi = await Tithi.findOne({ date: tithiData.date });
  
      if (existingTithi) {
        // If it exists, update the tithi field
        existingTithi.tithi = tithiData.tithi;
        return existingTithi.save(); // Save and return the updated tithi
      } else {
        // If it doesn't exist, create a new tithi
        const newTithi = new Tithi(tithiData);
        return newTithi.save(); // Save and return the new tithi
      }
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };

export const getTithiByDate = async (date) => {
    try {
      const result = await Tithi.findOne({ date });
      return result;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  };