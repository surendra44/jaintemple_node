import Joi from "joi";
const { objectId} = require('./custom.validation');




export const createRole = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        permission: Joi.array().required(),
    }),
  };


  export const getRoleById = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
  };