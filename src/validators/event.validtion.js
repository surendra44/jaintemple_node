import Joi from "joi";
const { objectId} = require('./custom.validation');


export const createEvent = {
    body: Joi.object().keys({
        eventName: Joi.string().required(),
        eventDetail: Joi.string().required(),
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().required(),
        templeID: Joi.custom(objectId),
        eventCategory: Joi.array().custom(objectId),
    }),
  };

  

  export const updateEvent = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        eventName: Joi.string().required(),
        eventDetail: Joi.string().required(),
        startDate: Joi.date().iso().required(),
        endDate: Joi.date().iso().required(),
        templeID:  Joi.custom(objectId),
        eventCategory: Joi.array(),
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

  export const createCategory = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required()
    }),
  };

  export const updateCategory = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        name: Joi.string().required(),
        description: Joi.string().required()
      })
  };

  export const deleteCategory = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
  };

  export const getCategoryById = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
  };