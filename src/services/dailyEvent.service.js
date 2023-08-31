import { Console } from "winston/lib/winston/transports";
import { ERROR_MESSAGE } from "../helpers/errorMessage";
const DaiailyCategoryEvent = require('../models/dailyCategory');


export const addDailyCategory = async (dailyCategory)=> {
  try {
    const newDailyCategory = await DaiailyCategoryEvent.create(dailyCategory);
    return newDailyCategory;
  }  catch (e) {
      console.log(e);
      throw new Error(e);
  }
}


export const updateEventCategory= async(categoryId, updatedData)=>{
  try {
    const updatedCategory = await DaiailyCategoryEvent.findByIdAndUpdate(
      categoryId,
      updatedData,
      { new: true }
    );
    return updatedCategory;
  }catch (e) {
      console.log(e);
      throw new Error(e);
  }
}


export const deleteCategory = async(categoryId)=>{
  try {
    const DeleteCategory = await DaiailyCategoryEvent.findByIdAndDelete(categoryId);;
    if(!DeleteCategory) throw new Error(ERROR_MESSAGE.NOT_FOUND);
    const message = "Deleted Successfully"
    return message;
  }catch (e) {
      console.log(e);
      throw new Error(e);
  }
}

export const getCategoryByID  = async(categoryId)=> {
  try {
    const event = await DaiailyCategoryEvent.findById(categoryId);
      if(!event) throw new Error(ERROR_MESSAGE.NOT_FOUND);
    return event;
  }catch (e) {
      console.log(e);
      throw new Error(e);
  }
}


export const getAllCategory = async()=> {
  try {
    const event = await DaiailyCategoryEvent.find();
      if(!event) throw new Error(ERROR_MESSAGE.NOT_FOUND);
    return event;
  }catch (e) {
      console.log(e);
      throw new Error(e);
  }
}


