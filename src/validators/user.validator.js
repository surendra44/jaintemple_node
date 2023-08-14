import Joi from "joi";
const { password ,objectId} = require('./custom.validation');



const addressSchema = Joi.object({
  line_1: Joi.string().required(),
  line_2: Joi.string().allow(''),
  line_3: Joi.string().allow(''),
  city: Joi.string().required(),
  state: Joi.string().required(),
  pincode: Joi.number().required(),
  country: Joi.string().required()
});


export const createUser = {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().custom(password),
      name: Joi.string().required(),
      role: Joi.string().required(),
      loginId: Joi.string().required(),
      address: addressSchema,
      phonenumber: Joi.number(),
    }),
  };


  export const login = {
    body: Joi.object().keys({
      loginId: Joi.string().required(),
      password: Joi.string().required(),
    }),
  };

  export const updateUser = {
    params: Joi.object().keys({
      userId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        name: Joi.string().required(),
        role: Joi.string().required(),
        loginId: Joi.string().required(),
        address: addressSchema,
        phonenumber: Joi.number(),
      })
  };