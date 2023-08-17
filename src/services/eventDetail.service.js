import { Console } from "winston/lib/winston/transports";
import { ERROR_MESSAGE } from "../helpers/errorMessage";
const EventDetail = require('../models/eventDetail');
const EventCategory = require('../models/eventCategory');


export const addEventDetail= async (eventData)=> {
    try {
      const newEvent = await EventDetail.create(eventData);
      return newEvent;
    }  catch (e) {
        console.log(e);
        throw new Error(e);
    }
  }


  export const updateEventDetail= async(eventcategoryId, updatedData)=>{
    try {
      const updatedEvent = await EventDetail.findByIdAndUpdate(
        eventcategoryId,
        updatedData,
        { new: true }
      );
      return updatedEvent;
    }catch (e) {
        console.log(e);
        throw new Error(e);
    }
  }

  export const deleteEventDetail = async(eventId)=>{
    try {
      const DeleteEvent = await EventDetail.findByIdAndDelete(eventId);
      if(!DeleteEvent) throw new Error(ERROR_MESSAGE.NOT_FOUND);
      const message = "Deleted Successfully"
      return message;
    }catch (e) {
        console.log(e);
        throw new Error(e);
    }
  }
  

  export const getEventDetailById = async(eventId)=> {
    try {
      const event = await EventDetail.findById(eventId).populate('eventCategory');
        if(!event) throw new Error(ERROR_MESSAGE.NOT_FOUND);
      return event;
    }catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

export const getAllEvent = async(paginationOptions,filter,sortBy)=> {
   try {
    const { page, size } = paginationOptions;

    const totalDocuments = await EventDetail.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / size);
    const skip = (page - 1) * size;

    const result = await EventDetail.find(filter)
      .sort(sortBy)
      .skip(skip)
      .limit(size)
      .populate('eventCategory');

    return {
      page,
      size,
      data: result,
      previousPage: page > 1 ? page - 1 : null,
      nextPage: page < totalPages ? page + 1 : null,
      totalDocuments,
    };
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const addEventCategory = async (eventCategory)=> {
  try {
    const newEventCategory = await EventCategory.create(eventCategory);
    return newEventCategory;
  }  catch (e) {
      console.log(e);
      throw new Error(e);
  }
}


export const updateEventCategory= async(categoryId, updatedData)=>{
  try {
    const updatedCategory = await EventCategory.findByIdAndUpdate(
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
    const DeleteCategory = await EventCategory.findByIdAndDelete(categoryId);;
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
    const event = await EventCategory.findById(categoryId);
      if(!event) throw new Error(ERROR_MESSAGE.NOT_FOUND);
    return event;
  }catch (e) {
      console.log(e);
      throw new Error(e);
  }
}


export const getAllCategory = async()=> {
  try {
    const event = await EventCategory.find();
      if(!event) throw new Error(ERROR_MESSAGE.NOT_FOUND);
    return event;
  }catch (e) {
      console.log(e);
      throw new Error(e);
  }
}