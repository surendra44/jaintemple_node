import Joi from "joi";
const { objectId} = require('./custom.validation');






export const createDonation = {
    params: Joi.object().keys({
        id:Joi.required().custom(objectId),
      }),
    body: Joi.object().keys({
        eventId: Joi.custom(objectId).allow(null),
        eventCategoryId :Joi.custom(objectId).allow(null),
        donationMode: Joi.string().required(),
        donationAmount: Joi.number().required(),
        donationStatus: Joi.string().required(),
        donationDetail: Joi.string(),
        donationAccNumber: Joi.string(),
        donateToAccNumber: Joi.string(),
        donationDate: Joi.date(),
    }),
  };


  export const updateDonation = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        templeId: Joi.required().custom(objectId),
        donarId: Joi.required().custom(objectId),
        eventId: Joi.custom(objectId).allow(null),
        eventCategoryId: Joi.custom(objectId).allow(null),
        donationMode: Joi.string().required(),
        donationAmount: Joi.number().required(),
        donationStatus: Joi.string().required(),
        donationDetail: Joi.string(),
        donationAccNumber: Joi.string(),
        donateToAccNumber: Joi.string(),
        donationDate: Joi.date(),
      })
  };


  export const getDonationById = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
  };

  export const delteDonationById = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
  };