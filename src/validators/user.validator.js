import Joi from "joi";
const { password ,objectId} = require('./custom.validation');


const phoneNumberSchema = Joi.object({
  Phonenumber1: Joi.string().pattern(new RegExp('^[0-9]{10}$')).allow(''),
  Phonenumber2: Joi.string().pattern(new RegExp('^[0-9]{10}$')).allow('')
});




const addressSchema = Joi.object({
  line_1: Joi.string().required(),
  line_2: Joi.string().allow(''),
  line_3: Joi.string().allow(''),
  city: Joi.string().required(),
  state: Joi.string().required(),
  pincode: Joi.number().required(),
  country: Joi.string().required()
});

const updateaddressSchema = Joi.object({
  line_1: Joi.string(),
  line_2: Joi.string().allow(''),
  line_3: Joi.string().allow(''),
  city: Joi.string(),
  state: Joi.string(),
  pincode: Joi.number(),
  country: Joi.string()
});


export const createUser = {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().custom(password),
      name: Joi.string().required(),
      role: Joi.required().custom(objectId),
      temple: Joi.string(),
      loginId: Joi.string().required(),
      address: updateaddressSchema,
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
        email: Joi.string().email(),
        name: Joi.string(),
        temple: Joi.string(),
        role: Joi.string(),
        loginId: Joi.string(),
        address: addressSchema,
        phonenumber: Joi.number(),
      })
  };




  