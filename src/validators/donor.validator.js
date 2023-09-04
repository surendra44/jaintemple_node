import Joi from "joi";
const { objectId } = require("./custom.validation");

const addressSchema = Joi.object({
  line_1: Joi.string(),
  line_2: Joi.string().allow(""),
  line_3: Joi.string().allow(""),
  city: Joi.string(),
  state: Joi.string(),
  pincode: Joi.number(),
  country: Joi.string(),
});

const phoneNumberSchema = Joi.object({
  Phonenumber1: Joi.string()
        .length(10)
        .regex(/^[0-9]{10}$/)
        .required()
        .messages({
          "any.required": `Whatsapp number  is a required field`,
          "string.length": `Whatsapp number length should be 10 digits`,
        }),
  Phonenumber2: Joi.string().length(10).regex(/^[0-9]{10}$/).allow("").messages({
    "string.length": `Phone length should be 10 digits`,
  }),
});

const memberSchema = Joi.object({
  _id: Joi.string().custom(objectId).allow(null),
  image: Joi.string().allow(""),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.string().length(10).regex(/^[0-9]{10}$/).allow("").messages({
    "string.length": `Member Phone  length should be 10 digits` }),
  relation: Joi.string().required(),
  dob: Joi.date().iso(),
  dateOfAnniversary: Joi.date().iso(),
  email: Joi.string().email(),
  occupation: Joi.string(),
  aadharNo: Joi.string().allow(""),
  aadharCardImage: Joi.string().allow(""),
  bloodGroup: Joi.string(),
  isActive: Joi.boolean().allow(),
});

export const createDonor = {
  body: Joi.object().keys({
    image: Joi.string().allow(""),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumbers: Joi.array().items(phoneNumberSchema).required(),
    dob: Joi.date().iso(),
    dateOfAnniversary: Joi.date().iso(),
    gotr: Joi.string(), 
    occupation: Joi.string(),
    email: Joi.string().email(),
    aadharNo: Joi.string().allow(""),
    aadharCardImage: Joi.string().allow(""),
    bloodGroup: Joi.string(),
    isHead:Joi.boolean(),
    isRegister:Joi.boolean(),
    address: addressSchema,
    members: Joi.array().items(memberSchema),
  }),
};

export const updateDonor = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    image: Joi.string().allow(""),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumbers: Joi.array().items(phoneNumberSchema).required(),
    dob: Joi.date().iso().required(),
    dateOfAnniversary: Joi.date().iso(),
    gotr: Joi.string(), 
    occupation: Joi.string().required(),
    email: Joi.string().email().required(),
    aadharNo: Joi.string().required(),
    aadharCardImage: Joi.string().allow(""),
    bloodGroup: Joi.string().required(),
    address: addressSchema,
    members: Joi.array().items(memberSchema),
    isActive: Joi.boolean(),
  }),
};

export const getDonorById = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};


export const softdelteDonorById = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
    status: Joi.string().required(),
  }),
  body: Joi.object().keys({
    isParent: Joi.boolean(),
  }),
};
