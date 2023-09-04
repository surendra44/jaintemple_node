import Joi from "joi";
const { objectId } = require("./custom.validation");

const addressSchema = Joi.object({
  line_1: Joi.string().allow(""),
  line_2: Joi.string().allow(""),
  line_3: Joi.string().allow(""),
  city: Joi.string().allow(""),
  state: Joi.string().allow(""),
  pincode: Joi.number().allow(""),
  country: Joi.string().allow(""),
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
  dob: Joi.date().iso().allow(""),
  dateOfAnniversary: Joi.date().iso().allow(""),
  email: Joi.string().email().allow(""),
  occupation: Joi.string().allow(""),
  aadharNo: Joi.string().allow(""),
  aadharCardImage: Joi.string().allow(""),
  bloodGroup: Joi.string().allow(""),
  isActive: Joi.boolean().allow(),
});

export const createDonor = {
  body: Joi.object().keys({
    image: Joi.string().allow(""),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumbers: Joi.array().items(phoneNumberSchema).required(),
    dob: Joi.date().iso().allow(""),
    dateOfAnniversary: Joi.date().iso().allow(""),
    gotr: Joi.string().allow(""), 
    occupation: Joi.string().allow(""),
    email: Joi.string().email().allow(""),
    aadharNo: Joi.string().allow(""),
    aadharCardImage: Joi.string().allow(""),
    bloodGroup: Joi.string().allow(""),
    isHead:Joi.boolean().allow(""),
    isRegister:Joi.boolean().allow(""),
    address: addressSchema.allow(""),
    members: Joi.array().items(memberSchema),
    donation:Joi.any().allow("")
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
    dob: Joi.date().iso().allow(""),
    dateOfAnniversary: Joi.date().iso().allow(""),
    gotr: Joi.string().allow(""), 
    occupation: Joi.string().allow(""),
    email: Joi.string().email().allow(""),
    aadharNo: Joi.string().allow(""),
    aadharCardImage: Joi.string().allow(""),
    bloodGroup: Joi.string().allow(""),
    address: addressSchema.allow(""),
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
