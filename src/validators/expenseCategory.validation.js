import Joi from "joi";
const { objectId } = require("./custom.validation");

export const createExpenseCategory = {
  body: Joi.object().keys({
    expensesCategory: Joi.string().required(),
    expensesCategoryDetail:  Joi.string()
  }),
};


export const updateExpenseCategory = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    expensesCategory: Joi.string().required(),
    expensesCategoryDetail:  Joi.string(),
    templeId: Joi.custom(objectId).allow(null),
  }),
};

export const deleteExpenseCategory = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

export const getExpenseCategory = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};
