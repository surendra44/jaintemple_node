import Joi from "joi";
const { objectId} = require('./custom.validation');



const addressSchema = Joi.object({
    line_1: Joi.string().required(),
    line_2: Joi.string().allow(''),
    line_3: Joi.string().allow(''),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().required(),
    country: Joi.string().required()
  });


const phoneNumberSchema = Joi.object({
    Phonenumber1: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
    Phonenumber2: Joi.string().pattern(new RegExp('^[0-9]{10}$')).allow('')
  });


  const memberSchema = Joi.object({
    image: Joi.string().allow(''),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string().pattern(new RegExp('^[0-9]{10}$')).required(),
    relation: Joi.string().required(),
    dob: Joi.date().iso().required(),
    email: Joi.string().email().required(),
    occupation: Joi.string().required(),
    aadharCardNo: Joi.string().allow(''),
    aadharCardImage: Joi.string().allow(''),
    bloodGroup: Joi.string().required(),
    address: addressSchema
  });



export const createDonor = {
    body: Joi.object().keys({
        image: Joi.string().allow(''),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumbers: Joi.array().items(phoneNumberSchema).required(),
        dob: Joi.date().iso().required(),
        occupation: Joi.string().required(),
        email: Joi.string().email().required(),
        aadharcardnumber: Joi.string().required(),
        aadharCardImage: Joi.string().allow(''),
        bloodGroup: Joi.string().required(),
        address: addressSchema,
        members: Joi.array().items(memberSchema)
    }),
  };

  export const updateDonor = {
    params: Joi.object().keys({
      userId: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        image: Joi.string().allow(''),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        phoneNumbers: Joi.array().items(phoneNumberSchema).required(),
        dob: Joi.date().iso().required(),
        occupation: Joi.string().required(),
        email: Joi.string().email().required(),
        aadharcardnumber: Joi.string().required(),
        aadharCardImage: Joi.string().allow(''),
        bloodGroup: Joi.string().required(),
        address: addressSchema,
        members: Joi.array().items(memberSchema)
      })
  };