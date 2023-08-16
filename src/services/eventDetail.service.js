import { Console } from "winston/lib/winston/transports";
import { ERROR_MESSAGE } from "../helpers/errorMessage";
const EventDetail = require('../models/eventDetail');


export const addEventDetail= async (eventData)=> {
    try {
      const newEvent = await EventDetail.create(eventData);
      return newEvent;
    }  catch (e) {
        console.log(e);
        throw new Error(e);
    }
  }


  export const updateEventDetail= async(eventId, updatedData)=>{
    try {
      const updatedEvent = await EventDetail.findByIdAndUpdate(
        eventId,
        updatedData,
        { new: true }
      );
      return updatedEvent;
    }catch (e) {
        console.log(e);
        throw new Error(e);
    }
  }

  export const deleteEventDetail= async(eventId)=>{
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
      const event = await EventDetail.findById(eventId);
        if(!event) throw new Error(ERROR_MESSAGE.NOT_FOUND);
      return event;
    }catch (e) {
        console.log(e);
        throw new Error(e);
    }
}

export const getAllEvent = async(eventId)=> {
    try {
      const event = await EventDetail.find();
        if(!event) throw new Error(ERROR_MESSAGE.NOT_FOUND);
      return event;
    }catch (e) {
        console.log(e);
        throw new Error(e);
    }
}