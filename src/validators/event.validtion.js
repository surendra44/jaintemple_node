import Joi from "joi";
const { objectId} = require('./custom.validation');


export const createEvent = {
    body: Joi.object().keys({
        EventName: Joi.string().required(),
        EventDetail: Joi.string().required(),
        StartDate: Joi.date().iso().required(),
        EndDate: Joi.date().iso().required(),
        TempleID: Joi.string().required(),
        EventCategory: Joi.string().required(),
    }),
  };

  

  export const updateEvent = {
    params: Joi.object().keys({
      userId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        EventName: Joi.string().required(),
        EventDetail: Joi.string().required(),
        StartDate: Joi.date().iso().required(),
        EndDate: Joi.date().iso().required(),
        TempleID: Joi.string().required(),
        EventCategory: Joi.string().required(),
      })
  };




  export const deleteEvent = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
  };

  
  export const getEventById = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
  };