import { Console } from "winston/lib/winston/transports";
import { ERROR_MESSAGE } from "../helpers/errorMessage";
const TempleDetail = require('../models/temple');



export const addtemple = async (templeData) =>{
    try {
      const newTemple = await TempleDetail.create(templeData);
      return newTemple;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
  }
  
