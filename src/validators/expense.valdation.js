import Joi from "joi";
const { objectId } = require("./custom.validation");

export const createExpense = {
  body: Joi.object().keys({
    expensesName: Joi.string().required(),
    expensesCategoryID: Joi.custom(objectId).allow(null),
    eventExpensesID: Joi.custom(objectId).allow(null),
    eventCategoryID: Joi.custom(objectId).allow(null),
    expensesAccNumberFrom: Joi.string(),
    expensesAccNumberTo: Joi.string(),
    expensesAmount: Joi.number().required(),
    templeID: Joi.custom(objectId),
    expensesStatus: Joi.array().custom(objectId),
    expensesDate: Joi.date().iso(),
  }),
};

export const updateExpense = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    expensesName: Joi.string().required(),
    expensesCategoryID: Joi.custom(objectId).allow(null),
    eventExpensesID: Joi.custom(objectId).allow(null),
    eventCategoryID: Joi.custom(objectId).allow(null),
    expensesAccNumberFrom: Joi.string(),
    expensesAccNumberTo: Joi.string(),
    expensesAmount: Joi.number().required(),
    templeID: Joi.custom(objectId),
    expensesStatus: Joi.array().custom(objectId),
    expensesDate: Joi.date().iso(),
  }),
};

export const deleteExpense = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};

export const getExpenseById = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};
