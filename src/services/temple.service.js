import { Console } from "winston/lib/winston/transports";
import { ERROR_MESSAGE } from "../helpers/errorMessage";
const TempleDetail = require('../models/temple');



export const addtemple = async (templeData) =>{
    try {
      console.log(templeData);
      const newTemple = await TempleDetail.create(templeData);
      return newTemple;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
  }


  export const updateTemple= async (templeId, updatedData) =>{
      try {
        const updatedTemp = await TempleDetail.findByIdAndUpdate(templeId,updatedData,
          { new: true }
        );
        return updatedTemp;
    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
  }


  
  export const deleteTemple = async(templeId)=> {
    try {
      const deletedTemple = await TempleDetail.findByIdAndDelete(templeId);
      const message = "temple unregister Successfully"
      return message;
    } catch (e) {
      console.log(e);
      throw new Error(e);
  }
  }
  
  export const getTempleById = async(templeId)=> {
    try {
      const result = await TempleDetail.findById(templeId);
      return result;
    } catch (e) {
      console.log(e);
      throw new Error(e);
  }
  }

  export const getAllTemples =  async()=> {
    try {
      const result = await TempleDetail.find();
      return result;
    } catch (e) {
      console.log(e);
      throw new Error(e);
  }
  }